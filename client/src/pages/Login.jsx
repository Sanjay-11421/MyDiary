import { BookOpenText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await axios
      .post("http://localhost:5001/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        toast.success("Login successfull");
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.msg || "Login failed";

        toast.error(errorMessage);
      });
  };
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-white md:py-12 py-6 px-4 md:px-8 rounded-lg shadow-lg w-[75%] md:w-[60%] lg:w-[40%]">
        <div className="flex justify-center items-center">
          <BookOpenText className="bg-amber-100 text-red-600 p-2 h-10 w-10 rounded-full" />
        </div>
        <div>
          <h1 className="font-bold mt-1 md:mt-6 tracking-wider text-lg md:text-2xl text-center">
            Welcome Back to MyDiary ✨
          </h1>
          <p className="text-center font-light text-[0.625rem] md:text-sm text-neutral-600 mt-1 md:mt-2">
            Login to continue your journey
          </p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col mt-4 md:mt-7">
            <label className="font-medium text-xs md:text-sm lg:text-lg">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border mt-2 border-black/20 rounded-lg py-2.5 px-2.5  text-xs md:text-sm focus:outline-0 focus:bg-black/5 transition duration-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col mt-3 md:mt-7">
            <label className="font-medium text-xs md:text-sm lg:text-lg">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              className="border mt-2 border-black/20 rounded-lg py-2.5 px-2.5 text-xs md:text-sm focus:outline-0 focus:bg-black/5 transition duration-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex">
            <button className="bg-blue-400 w-full text-white mt-4 text-sm md:text-lg md:mt-8 py-2.5 rounded-lg cursor-pointer hover:bg-blue-500 transition duration-500">
              Login
            </button>
          </div>
          <div className="flex justify-center items-center mt-4 text-[0.620rem] sm:text-sm md:text-sm font-light text-neutral-500">
            <h1>Don't have an account? </h1>
            <button
              type="button"
              onClick={() => {
                toast.remove();
                navigate("/SignUp");
              }}
              className="ml-1 text-blue-400 font-normal cursor-pointer hover:underline transition duration-500 hover:text-blue-500 "
            >
              {" "}
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
