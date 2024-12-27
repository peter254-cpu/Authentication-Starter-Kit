import {  motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import InputComponent from "../component/InputComponent";
import { ArrowLeft, Mail } from "lucide-react";
import ButtonComponent from "../component/ButtonComponent";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await forgotPassword(email);
    setIsSubmitted(true)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Please Enter Email and well send a link to reset your password
            </p>
            <InputComponent
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <ButtonComponent>Send Reset Link</ButtonComponent>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 50 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              If an account exists for {email}, you will receive a password
              reset lnk
            </p>
          </div>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link
          to="/login"
          className="text-sm text-green-400 hover: underline flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back To Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
