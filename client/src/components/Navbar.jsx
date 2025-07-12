import { BookOpenText } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await localStorage.removeItem("token");
    toast.success("Logout successfull");
    navigate("/login");
  };
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-b-black/10">
      <nav className="flex justify-between items-center mx-8 py-2">
        <div className="flex items-center">
          <BookOpenText className=" text-blue-400 h-4 w-4 rounded-full" />
          <h1 className="ml-1 font-bold text-lg text-blue-400"> MyDiary</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={logout}
            className="text-sm text-neutral-400 hover:text-black transition cursor-pointer focus:text-black"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
