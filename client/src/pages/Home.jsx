import { format } from "date-fns";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [entry, setEntry] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = () => {
    axios
      .get("https://mydiary-ajb3.onrender.com/api/diary/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEntry(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex justify-between mx-6 mt-10">
          <h1 className="font-bold text-xl sm:text-2xl">Your Diary Entries</h1>
          <button
            onClick={() => navigate("/new")}
            className="bg-blue-400 px-2.5 py-1 font-medium text-xs sm:text-sm text-white rounded-lg cursor-pointer hover:bg-blue-500 transition duration-500"
          >
            + Add Entry
          </button>
        </div>

        {entry.length !== 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 mt-8 mb-4">
            {entry.map((val) => (
              <div
                key={val._id}
                onClick={() => navigate(`/view/${val._id}`)}
                className="bg-white mx-6 px-4 py-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition "
              >
                <h1 className="font-bold text-center text-lg text-gray-700">
                  {val.title}
                </h1>
                <p className="text-xs text-center text-neutral-500 mt-2">
                  {format(new Date(val.createdAt), "MMMM dd,yyyy")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[80vh]">
            <div className="flex justify-center items-center bg-white mx-6 px-4 py-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition w-full h-30 ">
              {" "}
              <h1 className="font-bold text-center text-lg text-gray-700">
                No records
              </h1>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
