import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import styles from "../../styles/styles";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login Your Account
                </h1>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm-px-10 mx-3">
                    <form className="space-y-6">
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
                        <div className={`${styles.normalFlex} justify-between`}>
                            <div className={`${styles.normalFlex}`}>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    id="remember-me"
                                    name="remember-me"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900 hover:text-blue-600 cursor-pointer"
                                >
                                    Remember Me!
                                </label>
                            </div>
                            <div className={`${styles.normalFlex}`}>
                                <p className="text-sm text-gray-900 hover:text-blue-600 cursor-pointer">Forget Password?</p>
                            </div>
                        </div>
                        <button type="submit" className="font-semibold uppercase w-full bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:opacity-85">
                            Login
                        </button>
                    </form>
                    <div className={`${styles.normalFlex} w-full mt-5`} >
                        <p className="text-gray-500 text-md">Not have an account?</p>
                        <Link to={"/sign-up"} className="text-sm ml-2 text-blue-600 hover:opacity-70">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
