import { BookOpenText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    await axios
      .post("https://mydiary-ajb3.onrender.com/api/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.msg);
        navigate("/login");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.msg || "Register failed";
        toast.error(errorMessage);
      });
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-white md:py-12 py-6 md:px-8 px-4 rounded-lg shadow-lg w-[75%] md:w-[60%] lg:w-[40%]">
        <div className="flex justify-center items-center">
          <BookOpenText className="bg-amber-100 text-red-600 p-2 h-10 w-10 rounded-full" />
        </div>
        <h1 className="font-bold mt-1 md:mt-2 lg:mt-6 tracking-wider text-lg md:text-2xl text-center">
          MyDiary ✨
        </h1>
        <div>
          <p className="text-center font-bold tracking-widest text-[0.625rem] md:text-sm text-neutral-600 md:mt-2 mt-1">
            Create your account
          </p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col md:mt-7 mt-4">
            <label className="font-medium text-xs md:text-sm lg:text-lg">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border mt-2 border-black/20 text-xs md:text-sm rounded-lg py-2.5 px-2.5  focus:outline-0 focus:bg-black/5 transition duration-400"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col md:mt-7 mt-3">
            <label className="font-medium text-xs md:text-sm lg:text-lg">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border mt-2 border-black/20 rounded-lg py-2.5 px-2.5 text-xs md:text-sm focus:outline-0 focus:bg-black/5 transition duration-400"
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
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="border mt-2 border-black/20 rounded-lg py-2.5 px-2.5 text-xs md:text-sm focus:outline-0 focus:bg-black/5 transition duration-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex">
            <button className="bg-blue-400 w-full text-white md:mt-8 mt-4 py-2.5 rounded-lg cursor-pointer text-sm md:text-lg hover:bg-blue-500 transition duration-500">
              Register
            </button>
          </div>
          <div className="flex justify-center items-center mt-4 text-[0.620rem] sm:text-sm md:text-sm font-light text-neutral-500">
            <h1>Already registered? </h1>
            <button
              type="button"
              onClick={() => {
                toast.remove();
                navigate("/Login");
              }}
              className="ml-1 text-blue-400 font-normal cursor-pointer hover:underline transition duration-500 hover:text-blue-500 "
            >
              {" "}
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
