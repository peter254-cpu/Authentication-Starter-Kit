/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import InputComponent from "../component/InputComponent";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PassWordStrength from "../component/PassWordStrength";
import ButtonComponent from "../component/ButtonComponent";
import { useAuthStore } from "../../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password === password1) {
        await signup(email, password, name);
        navigate("/verify-email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backgdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <InputComponent
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputComponent
            icon={Mail}
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputComponent
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputComponent
            icon={Lock}
            type="password"
            placeholder="Please Confirm your password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
          <PassWordStrength password={password} />
          {error && <p className="text-red-500 font-regular mt-2">{error.message}</p>}
          <ButtonComponent disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              "Sign Up"
            )}
          </ButtonComponent>
        </form>

        <div className="flex gap-2">
          <ButtonComponent disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin mx-auto" /> : "Google"}
          </ButtonComponent>
          <ButtonComponent disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              "Facebook"
            )}
          </ButtonComponent>
        </div>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">Already have An Account.....?</p>
        <Link to="/login" className="text-green-400 text-sm  hover:underline">
          Login
        </Link>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
