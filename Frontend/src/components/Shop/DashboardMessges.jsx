import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
export default function DashboardMessges() {
    const { shop } = useSelector((state) => state.seller);
    const [conversations, setConversations] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/conversation/get-all-conversation", {
                withCredentials: true,
            });
            const data = await response.json();
            setConversations(data.conversations);
        };
        fetchData();
    }, [shop]);

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
                            />
                        ))}
                </>
            )}
            {open && <Inbox setOpen={setOpen} />}
        </div>
    );
}

const MeassageList = ({ data, index, setOpen }) => {
    const [active, setActive] = React.useState(0);
    const navigate = useNavigate();
    const handleChat = () => {
        navigate(`?${data?._id}`);
        setOpen(true);
    };
    return (
        <div
            className={`w-full flex items-center border-b border-gray-300 p-1 px-3 ${active === index ? "bg-[#ebe5e595]" : "bg-transparent"}  cursor-pointer`}
            onClick={() => setActive(index) || handleChat()}
        >
            <div className="relative">
                <img
                    src="https://res.cloudinary.com/ueamvju9/image/upload/v1787143779/obzk4lqxjjay7qwod7cd.jpg"
                    className="w-16 h-16 rounded-full"
                    alt=""
                />
                <div className="absolute w-[12px] h-[12px] bg-green-400 rounded-full top-12 right-0" />
            </div>
            <div className="pl-3">
                <h1 className="text-[18px] font-[400]">Hassan jan</h1>
                <p className="text-[16px] font-[300] text-gray-500">
                    You: This is a sample message.
                </p>
            </div>
        </div>
    );
};

const Inbox = ({ setOpen }) => {
    return (
        <div className="w-full min-h-[83vh] flex flex-col justify-between">
            {/* Message Header */}
            <div className="w-full flex p-4 items-center justify-between bg-gray-200">
                <div className="flex items-center">
                    <img
                        src="https://res.cloudinary.com/ueamvju9/image/upload/v1787143779/obzk4lqxjjay7qwod7cd.jpg"
                        alt=""
                        className="w-[60px] h-[60px] rounded-full"
                    />
                    <div className="pl-3">
                        <h1 className="text-[18px] font-[500]">Hassan jaan</h1>
                        <h1 className="text-gray-400 text-[16px]">Active now</h1>
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
                <div className="w-full flex my-2">
                    <img
                        src="https://res.cloudinary.com/ueamvju9/image/upload/v1787143779/obzk4lqxjjay7qwod7cd.jpg"
                        alt=""
                        className="w-[40px] h-[40px] rounded-full mr-2"
                    />
                    <div className="w-max p-2 bg-slate-300 h-min rounded-xl">
                        <p>Hello, this is a sample message.</p>
                    </div>
                </div>
                <div className="w-full flex justify-end my-2">
                    <div className="w-max p-2 bg-slate-300 h-min rounded-xl">
                        <p>Hello, this is a sample message.</p>
                    </div>
                </div>
            </div>

            {/* send message */}
            <form
                aria-required="true"
                className="px-3 relative w-full flex items-center justify-between"
            >
                <div className="w-[3%]">
                    <TfiGallery size={20} className="cursor-pointer" />
                </div>
                <div className="w-[97%]">
                    <input
                        type="text"
                        required
                        placeholder="Type a message..."
                        className={`${styles.input} border-gray-300 focus:border-blue-500`}
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
