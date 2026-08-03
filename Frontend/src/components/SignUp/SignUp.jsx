import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserCircle, LoaderCircle } from "lucide-react";
import styles from "../../styles/styles";
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = () => {
        console.log("Uploaded");
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("fullName", fullname);
            formData.append("email", email);
            formData.append("password", password);
            if (avatar) {
                formData.append("image", avatar);
            }

            const response = await fetch("/api/user/sign-up", {
                method: "POST",
                body: formData,
            });
            setLoading(false);
            const data = await response.json();

            if (data.success === true) {
                navigate("/log-in");
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a new User
                </h1>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm-px-10 mx-3">
                    <form onSubmit={handleFormSubmit} className="space-y-6 px-4" encType="multipart/form-data">
                        <div>
                            <label
                                htmlFor="fullname"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    autoComplete="name"
                                    required
                                    value={fullname}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your fullname"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your Email"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full border px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                {!visible ? (
                                    <Eye
                                        className="text-gray-500 absolute top-2 right-2 cursor-pointer"
                                        size={25}
                                        onClick={() => {
                                            setVisible(!visible);
                                        }}
                                    />
                                ) : (
                                    <EyeOff
                                        className="text-gray-500 absolute top-2 right-2 cursor-pointer"
                                        size={25}
                                        onClick={() => {
                                            setVisible(!visible);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={`${styles.normalFlex}`}>
                            <div className="mt-2 flex items-center ">
                                <span className="h-8 w-8 rounded-full overflow-hidden">
                                    {avatar ? (
                                        <img
                                            src={URL.createObjectURL(avatar)}
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <UserCircle size={23} className="mr-3" />
                                    )}
                                </span>
                                <label
                                    htmlFor="file-input"
                                    className="ml-3 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white cursor-pointer"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        id="file-input"
                                        name="avatar"
                                        onChange={handleFileInputChange}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="font-semibold uppercase w-full bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:opacity-85"
                        >
                            {loading ? <LoaderCircle size={26} className="animate-spin mx-auto" /> : "Sign Up"}
                        </button>
                    </form>
                    <div className={`${styles.normalFlex} w-full mt-5 px-5`}>
                        <p className="text-gray-500 text-md">Already have an account?</p>
                        <Link
                            to={"/log-in"}
                            className="text-sm ml-2 text-blue-600 hover:opacity-70"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
