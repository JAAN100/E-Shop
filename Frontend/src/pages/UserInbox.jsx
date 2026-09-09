import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { format } from "timeago.js";
import styles from "../styles/styles";
import { useRef } from "react";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
const socketId = socketIO({
  path: "/socket.io/",
  transports: ["polling", "websocket"],
  withCredentials: true,
});
export default function UserInbox() {
    const { user } = useSelector((state) => state.user);
    const [conversations, setConversations] = React.useState([]);
    const [arrivalMessage, setArrivalMessage] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [currentChat, setCurrentChat] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [shop, setShop] = React.useState(null);
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
                "/api/conversation/get-all-conversation-user",
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
    }, [user]);

    React.useEffect(() => {
        if (user) {
            socketId.emit("addUser", user._id);
            socketId.on("getUsers", (users) => {
                setOnlineUsers(users);
            });
            return () => socketId.off("getUsers");
        }
    }, [user]);

    const onlineCheck = (chat) => {
        const otherMember = chat?.members.find((member) => member !== user?._id);
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
                }
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
            lastMessageId: user._id,
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
                    lastMessageId: user._id,
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
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find(
            (member) => member !== user._id,
        );
        socketId.emit("sendMessage", {
            senderId: user._id,
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
        <div className="w-full">
            <Header />
            {!open && (
                <>
                    <h1 className="text-[30px] font-semibold py-3 text-center font-Poppins">
                        All messages
                    </h1>

                    {/* All Messages List */}
                    {conversations &&
                        conversations?.map((conversation, index) => (
                            <MessageList
                                data={conversation}
                                key={index}
                                index={index}
                                setOpen={setOpen}
                                setCurrentChat={setCurrentChat}
                                me={user._id}
                                setShop={setShop}
                                shop={shop}
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
                    userId={user._id}
                    shop={shop}
                    activeStatus={activeStatus}
                />
            )}
        </div>
    );
}

const MessageList = ({
    data,
    index,
    setOpen,
    setCurrentChat,
    me,
    setShop,
    shop,
    online,
    setActiveStatus,
}) => {
    const [active, setActive] = React.useState(0);
    const navigate = useNavigate();
    const handleChat = () => {
        navigate(`?${data?._id}`);
        setOpen(true);
        setCurrentChat(data);
    };
    React.useEffect(() => {
        setActiveStatus(online);
        const shopId = data?.members?.find((id) => id !== me);
        const getUser = async () => {
            try {
                const res = await fetch(`/api/shop/get-shopByID/${shopId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const response = await res.json();
                if (response.success === true) {
                    setShop(response.shop);
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
                    src={shop?.avatar}
                    className="w-16 h-16 rounded-full"
                    alt={shop?.shopName}
                />
                {online && (
                    <div className="absolute w-[12px] h-[12px] bg-green-400 rounded-full top-12 right-0" />
                )}
            </div>
            <div className="pl-3">
                <h1 className="text-[18px] font-[400]">{shop?.shopName}</h1>
                <p className="text-[16px] font-[300] text-gray-500">
                    {data?.lastMessageId === me ? "You" : shop?.shopName?.split(" ")[0]}:{" "}
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
    userId,
    shop,
    activeStatus,
}) => {
    const scrollRef = useRef(null);
    React.useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);
    return (
        <div className="w-full h-screen h-[100dvh] fixed inset-0 z-50 bg-white flex flex-col">
            {/* Message Header */}
            <div className="w-full flex p-4 items-center justify-between bg-gray-200 shrink-0">
                <div className="flex items-center">
                    <img
                        src={shop?.avatar}
                        alt={shop?.shopName}
                        className="w-[60px] h-[60px] rounded-full"
                    />
                    <div className="pl-3">
                        <h1 className="text-[18px] font-[500]">{shop?.shopName}</h1>
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
            <div className="px-3 py-3 flex-1 overflow-y-auto flex flex-col">
                {messages &&
                    messages.map((message, index) => (
                        <div key={index}>
                            <div
                                className={`w-full flex my-3 ${message.senderId === userId ? "justify-end" : "justify-start"}`}
                            >
                                {message.senderId !== userId && (
                                    <img
                                        src={shop?.avatar}
                                        alt={shop?.shopName}
                                        className="w-[40px] h-[40px] rounded-full mr-2"
                                    />
                                )}
                                <div
                                    className={`flex flex-col ${message.senderId === userId ? "items-end" : "items-start"}`}
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
                className="px-3 py-3 relative w-full flex items-center justify-between shrink-0 bg-white border-t border-gray-200"
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
                            className="absolute top-5 right-5 cursor-pointer text-gray-600"
                        />
                    </label>
                </div>
            </form>
        </div>
    );
};