import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categoriesData } from "../../static/data.jsx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product.js";
import { toast } from "react-toastify";
export default function CreateProduct() {
    const { shop } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.products);
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

    React.useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            setLoading(false);
            toast.success("Product created successfully");
            dispatch({ type: "ProductCreateReset" });
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
        setLoading(true);
        await dispatch(createProduct(formData));
    };
    return (
        <div className="w-[90%] md:w-[70%] bg-[#fff] shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className="text-[20px] md:text-[25px] lg:text-[30px] font-bold font-Poppins text-center">
                Create Product
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
                        placeholder="Enter your product name"
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
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 py-1 h-[50px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter your product description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        placeholder="Enter product tags"
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
                        placeholder="Enter original price"
                        type="number"
                        name="originalPrice"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="discountPrice" className="pb-2">
                        Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="sm:text-sm mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-600"
                        placeholder="Enter discounted price"
                        type="number"
                        name="discountPrice"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
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
                        placeholder="Enter product stock"
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
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
                                className="h-[120px] w-[120px] object-cover rounded-[4px] m-2"
                            />
                        ))}
                    </div>
                    <br />
                    <div>
                        <input type="submit" value={loading ? "Creating..." : "Create Product"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full" />
                    </div>
                </div>
            </form>
        </div>
    );
}
