import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as validation from "../utils/Validation";
import toast, { ToastBar } from "react-hot-toast";
import UserService from "../service/UserService";
import { Cookies } from "react-cookie";

const Register = () => {
  const navigate = useNavigate();
  const [isToggle, setToggle] = useState(false);

  const [inputRegisterForm, setInputRegisterForm] = useState({
    fullname: {
      pattern: validation.FULL_NAME_REGEX,
      value: "",
      isValid: null,
    },
    username: {
      pattern: validation.USER_NAME_REGEX,
      value: "",
      isValid: null,
    },
    password: {
      pattern: validation.PASSWORD_REGEX,
      value: "",
      isValid: null,
    },
    email: {
      pattern: validation.EMAIL_REGEX,
      value: "",
      isValid: null,
    },
    rePassword: {
      pattern: validation.PASSWORD_REGEX,
      value: "",
      isValid: null,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 50);
  }, []);

  const handleOnChangeRegisterForm = (e) => {
    const { id, value } = e.target;

    setInputRegisterForm({
      ...inputRegisterForm,
      [id]: {
        ...inputRegisterForm[id],
        value,
        isValid: validation.validationRegex(
          inputRegisterForm[id].pattern,
          value
        ),
      },
    });
  };

  const handleRegister = async () => {
    let registerForm = {
      email: "",
      username: "",
      fullname: "",
      password: "",
      rePassword: "",
    };
    for (const key in inputRegisterForm) {
      if (inputRegisterForm[key].isValid) {
        toast.error("OOP! Something wrong! Please check again!", {
          duration: 2000,
        });
        return;
      } else {
        registerForm = { ...registerForm, [key]: inputRegisterForm[key].value };
      }
    }

    // dispatch(post_register(registerForm)).then((res) => {
    //   if (res !== true) {
    //     toast.error(`${res}`, {
    //       duration: 2000,
    //     });
    //   } else {
    //     navigate("/login");
    //   }
    // });
   const userData = await UserService.register(registerForm);
   console.log('userData ==== ',userData);
    toast.success("User Registered successfully")
  };
  return (
    <>
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleRegister();
          }
        }}
        className="flex items-center justify-center h-screen w-full px-5 sm:px-0"
      >
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://i.pinimg.com/564x/5b/35/22/5b3522c29f18452b11bf3bd6c9fc4ade.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-lg text-gray-600 text-center ">ようこそ</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
                id="email"
                value={inputRegisterForm.email.value}
                onChange={handleOnChangeRegisterForm}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="username"
                required
                id="username"
                value={inputRegisterForm.username.value}
                onChange={handleOnChangeRegisterForm}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="fullname"
                required
                id="fullname"
                value={inputRegisterForm.fullname.value}
                onChange={handleOnChangeRegisterForm}
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                id="password"
                value={inputRegisterForm.password.value}
                onChange={handleOnChangeRegisterForm}
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter the password
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                id="rePassword"
                value={inputRegisterForm.rePassword.value}
                onChange={handleOnChangeRegisterForm}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={handleRegister}
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              >
                Register
              </button>
            </div>
            <div className="">
              <div className="flex gap-x-2.5 justify-center">
                <a
                  href="#"
                  className=" flex items-center justify-center mt-3 text-white rounded-lg shadow-md hover:bg-gray-100"
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
                        Google
                      </h1>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-blue-400 bg-blue-300"
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
                        Facebook
                      </h1>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-4 flex items-center w-full text-center">
              <a
                href="#"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Do you already have an account
                <Link
                  className="text-blue-700"
                  to={"/tuananhafjdjhv-mobile-app/login"}
                >
                  {" "}
                  Login
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
