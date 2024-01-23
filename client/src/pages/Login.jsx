import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { client } from "../main";
import { login } from "../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputs((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = axios.post("/api/login", inputs);

      toast.promise(response, {
        loading: "Logging...",
        success: (res) => {
          dispatch(login(res.data?.user));

          setInputs({
            email: "",
            password: "",
          });

          client.invalidateQueries("tokenValidation");
          navigate("/", { replace: true });
          return res.data.message;
        },
        error: (err) => err.response.data.message.toString(),
      });
    } catch (error) {
      return toast.error(error.response?.data?.message);
    }
  };
  // const { isLoggedIn } = useAuth();
  // if (isLoggedIn) return <Navigate to={"/"} />;

  return (
    <div className="container mx-auto w-full md:h-screen h-fit flex justify-center  items-center">
      <div className="md:w-[80%] w-[90%]  md:h-[90%] my-8  shadow-[rgba(0,_0,_0,_0.30)_0px_3px_8px] md:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg object-center relative">
        <img
          src="/assets/loginBG.png"
          className="w-full md:h-full -z-0"
          alt="bg"
        />
        <div className="md:w-[45%] w-full md:h-[94%] p-2  md:p-8 bg-white md:absolute mt-2  md:top-5 md:left-4 rounded-lg  shadow-[rgba(0,_0,_0,_0.30)_0px_3px_8px]">
          <div className="flex flex-col justify-center items-center mb-10">
            <img
              className="w-48"
              src="/assets/brandBigLogo.svg"
              alt="brandLogo"
            />
            <p className="text-gray-500 md:text-base text-sm">
              Log in to your account
            </p>
          </div>
          <ValidatorForm
            onSubmit={handleLogin}
            className="flex flex-col gap-y-6"
          >
            <TextValidator
              label="Email"
              name="email"
              value={inputs.email}
              fullWidth
              onChange={handleInputChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <TextValidator
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <Link
              to="/forgot-password"
              className="text-right text-sm text-gray-500"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              className="w-full bg-[#5C218B] p-2 mt-1 rounded-lg text-white shadow-md"
            >
              Login
            </button>
          </ValidatorForm>

          <p className="text-sm text-center mt-4 md:mb-0 mb-3">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-800 font-semibold cursor-pointer"
            >
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
