import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categoriesData } from "../../static/data.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createEvent } from "../../redux/actions/event.js";
import { toast } from "react-toastify";
export default function CreateEvent() {
    const { success, error } = useSelector((state) => state.events);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = React.useState([]);
    const [productName, setProductName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [tags, setTags] = React.useState("");
    const [originalPrice, setOriginalPrice] = React.useState("");
    const [discountPrice, setDiscountPrice] = React.useState("");
    const [stock, setStock] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [startDate, setStartDate] = React.useState("");
    const [finishDate, setFinishDate] = React.useState("");
    const today = new Date().toISOString().slice(0, 10);
    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : today;
    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minEnd = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setFinishDate("");
        document.getElementById("finishDate").min = minEnd.toISOString().slice(0, 10);
    }

    const handleFinishDateChange = (e) => {
        const finishDate = new Date(e.target.value);
        setFinishDate(finishDate);
    }
    React.useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            setLoading(false);
            toast.success("Event created successfully");
            dispatch({ type: "EventCreateReset" });
            navigate("/dashboard");
        }
    }, [dispatch, error, success]);

    const handleImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error("Please upload at least one product image");
            return;
        }

        const formData = new FormData();
        images.forEach((file) => formData.append("images", file));
        formData.append("productName", productName);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("originalPrice", originalPrice);
        formData.append("discountPrice", discountPrice);
        formData.append("stock", stock);
        formData.append("start_Date", startDate.toISOString());
        formData.append("finish_Date", finishDate.toISOString());
        setLoading(true);
        await dispatch(createEvent(formData));
    };
    return (
        <div className="w-[95%] sm:w-[90%] md:w-[70%] bg-[#fff] shadow h-[85vh] md:h-[80vh] rounded-[4px] p-3 mx-auto overflow-y-scroll">
            <h5 className="text-[20px] md:text-[25px] lg:text-[30px] font-bold font-Poppins text-center">
                Create Event
            </h5>
            {/* Create Product Form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label htmlFor="productName" className="pb-2">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter your event product name"
                        type="text"
                        name="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="description" className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter your event product description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        required
                    />
                </div>
                <br />
                <div className="relative">
                    <label htmlFor="category" className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <button
                            type="button"
                            className="relative w-full mt-2 border border-gray-300 focus:border-blue-600 h-[35px] rounded-[5px] px-2 text-left bg-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {category || "Select category"}
                        </button>
                        {isOpen ? (
                            <IoIosArrowUp className="absolute right-2 top-10" />
                        ) : (
                            <IoIosArrowDown className="absolute right-2 top-10" />
                        )}
                    </div>

                    {isOpen && (
                        <div
                            className="absolute top-full left-0 z-50 w-full mt-1 bg-white border rounded-[5px] shadow-md max-h-40 overflow-y-auto"
                            required
                        >
                            {categoriesData?.map((i, index) => (
                                <div
                                    key={index}
                                    className="px-2 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setCategory(i.title);
                                        setIsOpen(false);
                                    }}
                                >
                                    {i.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <br />
                <div>
                    <label htmlFor="tags" className="pb-2">
                        Tags
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter event product tags"
                        type="text"
                        name="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="originalPrice" className="pb-2">
                        Original Price
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter event product original price"
                        type="number"
                        name="originalPrice"
                        value={originalPrice}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || Number(value) >= 0) {
                                setOriginalPrice(value);
                            }
                        }}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="discountPrice" className="pb-2">
                        Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter event product discounted price"
                        type="number"
                        name="discountPrice"
                        value={discountPrice}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || Number(value) >= 0) {
                                setDiscountPrice(value);
                            }
                        }}
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="stock" className="pb-2">
                        Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter event product stock"
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || Number(value) >= 0) {
                                setStock(value);
                            }
                        }}
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="startDate" className="pb-2">
                        Event Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter event start date"
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                        onChange={handleStartDateChange}
                        min={today}
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="finishDate" className="pb-2">
                        Event End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter event end date"
                        type="date"
                        name="finishDate"
                        id="finishDate"
                        value={finishDate ? finishDate.toISOString().slice(0, 10) : ""}
                        onChange={handleFinishDateChange}
                        min={minEndDate}
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="discountPrice" className="pb-2">
                        Upload images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="images" className="cursor-pointer">
                        <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                    </label>
                    <div className="flex flex-wrap items-center w-full">
                        {images?.map((image, index) => (
                            <img
                                key={`${image.name}-${image.lastModified}-${index}`}
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index + 1}`}
                                className="h-[90px] w-[90px] sm:h-[120px] sm:w-[120px] object-cover rounded-[4px] m-2"
                            />
                        ))}
                    </div>
                    <br />
                    <div>
                        <input type="submit" value={loading ? "Creating..." : "Create Event"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full" />
                    </div>
                </div>
            </form>
        </div>
    );
}
