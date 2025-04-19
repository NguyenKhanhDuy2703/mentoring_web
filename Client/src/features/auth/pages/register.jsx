import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState, useEffect } from "react";
import { register } from "../../../services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [Full_Name, setAccount] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mentee"); // Mặc định là mentee
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const  [touch , setTouch] = useState({
    Full_Name: false,
    gmail: false,
    password: false
  });
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  useEffect(() => {
    // check error input 
    let error = {};
    if (touch.Full_Name && !Full_Name.trim()) error.Full_Name = "Account is required";
    if (touch.gmail && !gmail.trim()) error.gmail = "Gmail is required";
    else if ( touch.gmail && !isValidEmail(gmail)) error.gmail = "Invalid Gmail format";
    if (touch.password && password.length < 6) error.password = "Password must be at least 6 characters";
   
    setErrors(error);
  }, [Full_Name, gmail, password,touch]);

  const handleRegister = async (e) => {
    e.preventDefault();
    // check error input is exists
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const data = await register(Full_Name, gmail, password, role); // Gửi role lên server
      if (data) {
        toast.success("🎉 Đăng ký thành công!", { autoClose: 2000 });
        setTimeout(() => navigate('/auth/login'), 2500);
      }
    } catch (error) {
      toast.error("❌ Đăng ký thất bại! Vui lòng thử lại. ,",error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-start px-10 space-x-6 font-semibold text-gray-700 text-2xl">
        <Link to={"/auth/login"}> Sign in </Link>
        <Link to={"/auth/signup"}> Sign up </Link>
      </div>
      <div className="flex flex-col p-8 rounded-lg w-[90%]">
        <div className="mb-5">
          <label className="block text-gray-600 mb-1">Full name</label>
          <input
            type="text"
            value={Full_Name}
            onChange={(e) => setAccount(e.target.value)}
            onBlur={() => setTouch({...touch, Full_Name: true})}
            placeholder="Enter your Full Name"
            className={`w-full px-3 py-2 border rounded-lg ${errors.Full_Name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
          />
          {errors.Full_Name && <p className="text-red-500 text-sm">{errors.Full_Name}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-600 mb-1">Gmail</label>
          <input
            type="text"
            value={gmail}
            placeholder="Enter your Gmail"
            onChange={(e) => setGmail(e.target.value)}
            onBlur={() => setTouch({...touch, gmail: true})}

            className={`w-full px-3 py-2 border rounded-lg ${errors.gmail ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
          />
          {errors.gmail && <p className="text-red-500 text-sm">{errors.gmail}</p>}
        </div>

        <div className="mb-5 relative">
          <label className="block text-gray-600 mb-1">Password</label>
          <div className="relative">
            <input
              type={hidePassword ? "password" : "text"}
              value={password}
              placeholder="Enter your password"
              onBlur={() => setTouch({...touch, password: true})}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <LuEyeClosed /> : <LuEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Dropdown chọn role */}
        <div className="mb-5">
          <label className="block text-gray-600 mb-1">Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <p className="text-xs text-gray-500 flex items-center mb-5 mt-6 space-x-1.5">
          <input type="checkbox" className="mr-2" /> I accept Metoring's {"   "}
          <Link className="text-blue-500 pl-1">Terms of Service</Link> and{"   "}
          <Link className="text-blue-500 pl-1">Privacy Policy</Link>
        </p>

        <div className="flex flex-col gap-y-4">
          <button
            className={`w-full py-3 rounded-lg transition-transform transform ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'}`}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-blue-600 py-3 rounded-lg transition">
            Already have an Account ? Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
