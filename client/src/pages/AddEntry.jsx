import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEntry = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  const addEntry = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://mydiary-ajb3.onrender.com/api/diary/create",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
        navigate("/");
      });
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="flex w-[85%] md:w-[60%] lg:w-[40%] fixed top-4 left-0">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="ml-4 text-blue-400 text-xs mb-4 font-bold  hover:text-blue-500 cursor-pointer transition"
        >
          {"<- "}Back to Home
        </button>
      </div>
      <div className="bg-white px-6 py-12 shadow-lg rounded-lg w-[85%] md:w-[60%] lg:w-[40%] ">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-center">
          New Diary Entry✍️
        </h1>
        <div className="mt-4 sm:mt-7">
          <form onSubmit={addEntry}>
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm text-neutral-600">
                Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A wonderful day"
                className="border border-black/20 rounded-lg text-xs sm:text-sm mt-1.5 px-3 py-1.5 focus:outline-0 font-medium"
              />
            </div>
            <div className="flex flex-col mt-4 sm:mt-4">
              <label className="text-xs sm:text-sm text-neutral-600">
                Content
              </label>
              <textarea
                type="text"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Today was..."
                className="border resize-none h-50 border-black/20 rounded-lg text-xs sm:text-sm mt-1.5 px-3 py-1.5 focus:outline-0 "
              />
            </div>
            <div className="mt-4 md:mt-8">
              <button className="bg-blue-400 w-full text-white py-2 rounded-lg cursor-pointer font-medium text-sm hover:bg-blue-500 transition duration-500">
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntry;
