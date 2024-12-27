/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import InputComponent from "../component/InputComponent";
import ButtonComponent from "../component/ButtonComponent";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <InputComponent
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputComponent
            icon={Lock}
            type="password"
            placeholder="Type In Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          <ButtonComponent onClick={handleLogin}>Log In</ButtonComponent>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">Don't have an Account.....?</p>
        <Link to="/signup" className="text-green-400 text-sm  hover:underline">
          Create An Account
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
