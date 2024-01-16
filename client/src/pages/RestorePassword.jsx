import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";

const RestorePassword = () => {
  const [email, setEmail] = useState("");

  const handleRestorePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/forgot-password", { email });
      toast.success("Reset password link has been sent to your mail address");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="container mx-auto  h-screen w-full flex justify-center items-center">
      <div
        className="md:w-[40%] w-[90%] h-auto p-4 py-6 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] 
      flex flex-col justify-center items-center
      "
      >
        <p className="font-medium">Did you forgot your password?</p>
        <p className="text-xs mt-2 text-gray-600">
          Enter your email address and we'll send you a link to restore password
        </p>

        <ValidatorForm
          // ref="form"
          onSubmit={handleRestorePassword}
          className="mt-8 w-full "
        >
          <p className="text-sm text-gray-500 pb-1">Email Address</p>
          <TextValidator
            label="Email"
            name="email"
            className="p-2 w-full rounded-md outline-purple-500 border-[1px] border-gray-400"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
          <button
            type="submit"
            className="bg-purple-500 w-full mt-6 py-2 rounded-md text-white"
          >
            Request Reset Link
          </button>
        </ValidatorForm>

        <Link className="mt-4 text-gray-500 underline text-sm" to="/login">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default RestorePassword;
