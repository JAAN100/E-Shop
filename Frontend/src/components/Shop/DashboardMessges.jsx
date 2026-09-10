import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { useRef } from "react";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
const socketId = socketIO({
    path: "/socket.io/",
    transports: ["polling", "websocket"],
    withCredentials: true,
});
export default function DashboardMessges() {
    const { shop } = useSelector((state) => state.seller);
    const [conversations, setConversations] = React.useState([]);
    const [arrivalMessage, setArrivalMessage] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [currentChat, setCurrentChat] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [activeStatus, setActiveStatus] = React.useState(false);
    const [newMessage, setNewMessage] = React.useState("");
    React.useEffect(() => {
        const handleMessage = (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        };
        socketId.on("getMessage", handleMessage);
        return () => socketId.off("getMessage", handleMessage);
    }, []);
    React.useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.senderId) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "/api/conversation/get-all-conversation",
                {
                    method: "GET",
                },
                {
                    withCredentials: true,
                },
            );
            const data = await response.json();
            setConversations(data.conversations);
        };
        fetchData();
    }, [shop]);

    React.useEffect(() => {
        if (shop) {
            socketId.emit("addUser", shop._id);
            socketId.on("getUsers", (users) => {
                setOnlineUsers(users);
            });
            return () => socketId.off("getUsers");
        }
    }, [shop]);

    const onlineCheck = (chat) => {
        const otherMember = chat?.members.find((member) => member !== shop?._id);
        const online = onlineUsers.find((user) => user?.userId === otherMember);
        return online ? true : false;
    };

    // Get Messages
    React.useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch(
                `/api/message/get-all-messages/${currentChat?._id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const data = await res.json();
            if (data.success === true) {
                setMessages(data.messages);
            }
        };
        fetchMessages();
    }, [currentChat]);

    // SEND MESSAGE
    const updateLastMessage = async () => {
        socketId.emit("updateLastMessage", {
            lastMessage: newMessage,
            lastMessageId: shop._id,
        });
        const res = await fetch(
            `/api/conversation/update-last-message/${currentChat?._id}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lastMessage: newMessage,
                    lastMessageId: shop._id,
                }),
            },
        );
        const data = await res.json();
        if (data.success) {
            setCurrentChat(data.conversation);
            setNewMessage("");
        }
    };
    const sendMessageHandler = async (e) => {
        e.preventDefault();
        const message = {
            sender: shop._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find(
            (member) => member !== shop._id,
        );
        socketId.emit("sendMessage", {
            senderId: shop._id,
            receiverId,
            text: newMessage,
        });

        try {
            if (newMessage !== "") {
                const res = await fetch("/api/message/create-new-message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(message),
                });
                const data = await res.json();
                if (data.success === true) {
                    setMessages((prev) => [...prev, data.message]);
                    updateLastMessage();
                }
            }
        } catch (error) {
            toast.error(error);
        }
    };
    return (
        <div className="w-[90%] bg-white m-3 h-[85vh] overflow-y-auto rounded">
            {!open && (
                <>
                    <h1 className="text-[30px] font-semibold py-3 text-center font-Poppins">
                        All messages
                    </h1>

                    {/* All Messages List */}
                    {conversations &&
                        conversations?.map((conversation, index) => (
                            <MeassageList
                                data={conversation}
                                key={index}
                                index={index}
                                setOpen={setOpen}
                                setCurrentChat={setCurrentChat}
                                me={shop._id}
                                setUser={setUser}
                                user={user}
                                online={onlineCheck(conversation)}
                                setActiveStatus={setActiveStatus}
                            />
                        ))}
                </>
            )}
            {open && (
                <Inbox
                    setOpen={setOpen}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    sendMessageHandler={sendMessageHandler}
                    messages={messages}
                    shopId={shop._id}
                    user={user}
                    activeStatus={activeStatus}
                />
            )}
        </div>
    );
}

const MeassageList = ({
    data,
    index,
    setOpen,
    setCurrentChat,
    me,
    setUser,
    user,
    online,
    setActiveStatus,
}) => {
    const [active, setActive] = React.useState(0);
    const navigate = useNavigate();
    const handleChat = () => {
        navigate(`?${data?._id}`);
        setOpen(true);
    };
    React.useEffect(() => {
        const userId = data?.members.find((id) => id !== me);
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/get-user-info/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const response = await res.json();
                if (response.success === true) {
                    setUser(response.user)
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error("Error while fetching user data");
            }
        };
        getUser();
    }, [data, me]);
    return (
        <div
            className={`w-full flex items-center border-b border-gray-300 p-1 px-3 ${active === index ? "bg-[#ebe5e595]" : "bg-transparent"}  cursor-pointer`}
            onClick={() => setActive(index) || handleChat() || setActiveStatus(online) ||
                setCurrentChat(data)}
        >
            <div className="relative">
                <img
                    src={user?.avatar}
                    className="w-16 h-16 rounded-full"
                    alt={user?.fullName}
                />
                {online && (
                    <div className="absolute w-[12px] h-[12px] bg-green-400 rounded-full top-12 right-0" />
                )}
            </div>
            <div className="pl-3">
                <h1 className="text-[18px] font-[400]">{user?.fullName}</h1>
                <p className="text-[16px] font-[300] text-gray-500">
                    {data?.lastMessageId === me ? "You" : user?.fullName?.split(" ")[0]}:{" "}
                    {data?.lastMessage}
                </p>
            </div>
        </div>
    );
};

const Inbox = ({
    setOpen,
    newMessage,
    setNewMessage,
    sendMessageHandler,
    messages,
    shopId,
    user,
    activeStatus,
}) => {
    const scrollRef = useRef(null);
    React.useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);
    return (
        <div className="w-full min-h-[83vh] flex flex-col justify-between">
            {/* Message Header */}
            <div className="w-full flex p-4 items-center justify-between bg-gray-200">
                <div className="flex items-center">
                    <img
                        src={user?.avatar}
                        alt={user?.fullName}
                        className="w-[60px] h-[60px] rounded-full"
                    />
                    <div className="pl-3">
                        <h1 className="text-[18px] font-[500]">{user?.fullName}</h1>
                        <h1 className="text-gray-400 text-[16px]">
                            {activeStatus ? "Active now" : "Offline"}
                        </h1>
                    </div>
                </div>
                <AiOutlineArrowRight
                    size={20}
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setOpen(false)}
                />
            </div>

            {/*  Message List */}
            <div className="px-3 py-3 h-[65vh] overflow-auto">
                {messages &&
                    messages.map((message, index) => (
                        <div key={index}>
                            <div
                                className={`w-full flex my-3 ${message.senderId === shopId ? "justify-end" : "justify-start"}`}
                            >

                                <div
                                    className={`flex flex-col ${message.senderId === shopId ? "items-end" : "items-start"}`}
                                >
                                    <div
                                        className="w-max p-2 bg-slate-300 h-min rounded-xl"
                                        ref={scrollRef}
                                    >
                                        <p>{message.text}</p>
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">
                                        <p>{format(message.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* send message */}
            <form
                aria-required="true"
                className="px-3 relative w-full flex items-center justify-between"
                onSubmit={sendMessageHandler}
            >
                <div className="w-[5%] lg:w-[3%]">
                    <TfiGallery size={20} className="cursor-pointer" />
                </div>
                <div className="w-[88%] sm:w-[95%] lg:w-[97%]">
                    <input
                        type="text"
                        required
                        placeholder="Type a message..."
                        className={`${styles.input} border-gray-300 focus:border-blue-500`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <input type="submit" value="Send" className="hidden" id="send" />
                    <label htmlFor="send">
                        <AiOutlineSend
                            size={18}
                            className="absolute top-2 right-6 cursor-pointer text-gray-600"
                        />
                    </label>
                </div>
            </form>
        </div>
    );
};
