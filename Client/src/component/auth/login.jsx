import { Link, useNavigate } from "react-router-dom";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../services/authServices";
import Cookies from "js-cookie";

const Login = () => {
  const [gmail, setgmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validate inputs
  const validate = () => {
    let error = {};

    if (!gmail.trim()) {
      error.gmail = "gmail is required";
    }
    if (password.trim().length < 6) {
      error.password = "Password must be at least 6 characters";
    }

    setErrors(error);
    return Object.keys(error).length === 0; // Trả về true nếu không có lỗi
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Dừng lại nếu có lỗi

    setIsLoading(true); // Ngăn chặn spam login

    try {
      const data = await login(gmail, password);
      if (data) {
        toast.success("Đăng nhập thành công!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors((prev) => ({ ...prev, gmail: error.response.data.message }));
      } else {
        toast.error("Đăng nhập thất bại! Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-start px-10 space-x-6 font-semibold text-gray-700 text-2xl">
        <Link to="/auth/login">Sign in</Link>
        <Link to="/auth/register">Sign up</Link>
      </div>

      <div className="flex flex-col p-8 rounded-lg w-[90%]">
        <div className="mb-5">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="text"
            value={gmail}
            onChange={(e) => setgmail(e.target.value)}
            placeholder="Enter your email address or username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            autoComplete="username"
          />
          {errors.gmail && <p className="text-red-500 text-sm">{errors.gmail}</p>}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-600 mb-1">Password</label>
          <div className="relative">
            <input
              type={hidePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <LuEyeClosed /> : <LuEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <Link to="#" className="text-blue-500 text-sm float-right mt-3">
            Forgot password?
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center mb-5 mt-4">
          By clicking Log in, you accept Mentoring's{" "}
          <Link to="#" className="text-blue-500">Terms of Service</Link> and{" "}
          <Link to="#" className="text-blue-500">Privacy Policy</Link>.
        </p>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full text-white py-2 rounded-lg ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        <div className="mt-4 text-center">
          <Link to="#" className="text-gray-600">
            New to Quizlet? <span className="text-blue-500">Create an account</span>
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link to="#" className="text-blue-500">Log in with magic link</Link>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Login;
