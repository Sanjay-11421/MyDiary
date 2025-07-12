import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const ViewEntry = () => {
  const [entry, setEntry] = useState([]);
  const navigate = useNavigate();
  const UseParam = useParams();
  const id = UseParam.id;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5001/api/diary/getOne/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEntry(res.data);
    } catch (err) {
      setError("Failed to fetch entry.", err.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5001/api/diary/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Deleted Successfully");
        navigate("/");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className="bg-white shadow-lg px-4 py-4 rounded-lg w-[70%] my-8">
          <div className="flex">
            <button
              onClick={() => navigate("/")}
              className=" text-blue-300 text-xs mb-4 font-bold  hover:text-blue-400 cursor-pointer transition"
            >
              {"<- "}Back to Home
            </button>
          </div>
          {entry && (
            <div>
              <h1 className="text-3xl text-center font-semibold">
                {entry.title}
              </h1>
              {entry.createdAt ? (
                <p className="text-center text-sm text-neutral-500 mt-2">
                  {format(new Date(entry.createdAt), "MMMM dd,yyyy")}
                </p>
              ) : null}
              <div>
                <p className="text-sm mt-6 mb-6 px-4 whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
              <div className="flex justify-center  items-center md:mr-2">
                <Trash
                  onClick={handleDelete}
                  className="text-red-600 cursor-pointer md:h-6 md:w-6 h-5 w-5 hover:text-red-700"
                />
              </div>
            </div>
          )}
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ViewEntry;
