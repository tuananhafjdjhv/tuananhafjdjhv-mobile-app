import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { Sidebar } from "./Sidebar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gọi API để đăng nhập và nhận JWT từ server
      const userData = await UserService.login(username, password);
      console.log(userData);

      if (userData.accessToken) {
        // Lưu JWT vào cookie
        Cookies.set("token", userData.accessToken);
        Cookies.set("role", userData.roleSet);
        toast.success("Đăng nhập success !");
        // navigate("/profile");
      } else {
        toast.error("Tên người dùng hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      toast.error("Tên người dùng hoặc mật khẩu không đúng.");
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const googleLogin = () => {
    const res = axios
      .post("http://localhost:8080/oauth2/authorization/google")
      .then((res) => console.log(res));
  };

  return (
    <>
    {/* <Sidebar></Sidebar> */}
      <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://scontent.fhnd4-2.fna.fbcdn.net/v/t39.30808-6/436425969_1920131778445188_8278204402786003616_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YuTsLQU3yfUQ7kNvgFxHbYL&_nc_ht=scontent.fhnd4-2.fna&oh=00_AYBgiVtlbqbfrP0o-Sub5gUW4lJhZzPKLGEfP8Rx9m8RZw&oe=666F9DDC)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-3xl text-gray- text-center">ようこそ </p>
          <div className="mt-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>

            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 1 12 1c5.523 0 10 4.477 10 10 0 1.023-.15 2.006-.425 2.925M9.165 15.165A3.978 3.978 0 0012 17a4 4 0 003.535-6.165M15 9l-3 3-3-3"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12h.01M12 12h.01M9 12h.01M12 4v.01M12 20v.01M4 12h.01M20 12h.01M4.222 4.222l.01.01M19.778 4.222l.01.01M4.222 19.778l.01.01M19.778 19.778l.01.01"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <a
              href="#"
              className="text-xs text-blue-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
          <a
            onClick={() => googleLogin()}
            href="http://localhost:8080/oauth2/authorization/google"
            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div className="flex px-5 justify-center w-full py-3">
              <div className="min-w-[30px]">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <div className="flex w-full justify-center">
                <h1 className="whitespace-nowrap text-gray-600 font-bold">
                  Sign in with Google
                </h1>
              </div>
            </div>
          </a>
          <a
            href="#"
            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div className="flex px-5 justify-center w-full py-3">
              <div className="min-w-[30px]">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.6757 0H1.32428C0.593755 0 0 0.593755 0 1.32428V22.6757C0 23.4062 0.593755 24 1.32428 24H12.8185V14.706H9.69277V11.0769H12.8185V8.41956C12.8185 5.30944 14.6696 3.69228 17.4814 3.69228C18.7955 3.69228 19.9664 3.79889 20.2811 3.83889V7.04656L18.3051 7.04733C16.7556 7.04733 16.4249 7.7776 16.4249 8.90666V11.0769H20.1423L19.6736 14.706H16.4249V24H22.6757C23.4062 24 24 23.4062 24 22.6757V1.32428C24 0.593755 23.4062 0 22.6757 0Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M16.4249 24V14.706H19.6736L20.1423 11.0769H16.4249V8.90666C16.4249 7.7776 16.7556 7.04733 18.3051 7.04733L20.2811 7.04656V3.83889C19.9664 3.79889 18.7955 3.69228 17.4814 3.69228C14.6696 3.69228 12.8185 5.30944 12.8185 8.41956V11.0769H9.69277V14.706H12.8185V24H16.4249Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex w-full justify-center">
                <h1 className="whitespace-nowrap text-gray-600 font-bold">
                  Sign in with Facebook
                </h1>
              </div>
            </div>
          </a>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet? 
              <Link className="text-blue-700" to={"/tuananhafjdjhv-mobile-app/register"}> Sign Up</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};
export default Login;
