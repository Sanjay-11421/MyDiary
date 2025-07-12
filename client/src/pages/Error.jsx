import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-3xl">Oops!</h1>
        <p className="text-center text-sm text-neutral-600">Page not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-blue-400 text-white px-4 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
