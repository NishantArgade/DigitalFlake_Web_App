import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });
  }, [inputs.password]);

  const handleInputChange = (e) => {
    setInputs((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/register", inputs);

      setInputs({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
      toast.success("Registration Successful");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto w-full md:h-screen h-fit flex justify-center  items-center">
      <div className="md:w-[80%] w-[90%]  md:h-[90%] my-8  shadow-[rgba(0,_0,_0,_0.30)_0px_3px_8px] md:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg object-center relative">
        <img
          src="/assets/loginBG.png"
          className="w-full md:h-full -z-0"
          alt="bg"
        />
        <div className="md:w-[45%] w-full md:h-[94%]  p-2 md:px-8 md:py-4 bg-white md:absolute mt-2  md:top-5 md:left-4 rounded-lg  shadow-[rgba(0,_0,_0,_0.30)_0px_3px_8px]">
          <div className="flex flex-col justify-center items-center mb-2">
            <img
              className="w-28"
              src="/assets/brandBigLogo.svg"
              alt="brandLogo"
            />
            <p className="text-gray-500 text-sm">Create your account</p>
          </div>

          <ValidatorForm
            onSubmit={handleRegister}
            className="flex flex-col gap-y-4"
          >
            <TextValidator
              label="Name"
              type="text"
              name="name"
              value={inputs.name}
              fullWidth
              onChange={handleInputChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
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
              validators={["required"]}
              errorMessages={["this field is required"]}
              name="password"
              value={inputs.password}
              fullWidth
              onChange={handleInputChange}
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
            />
            <TextValidator
              label="Repeat password"
              validators={["isPasswordMatch", "required"]}
              errorMessages={["password mismatch", "this field is required"]}
              name="confirmPassword"
              fullWidth
              value={inputs.confirmPassword}
              onChange={handleInputChange}
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button
              type="submit"
              className="w-full bg-[#5C218B] p-2 rounded-lg text-white shadow-md"
            >
              Register
            </button>{" "}
          </ValidatorForm>

          <p className="text-sm text-center mt-4 md:mb-0 mb-3">
            Have an account?
            <Link
              to="/login"
              className="text-blue-800 font-semibold cursor-pointer"
            >
              {" "}
              Log in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
