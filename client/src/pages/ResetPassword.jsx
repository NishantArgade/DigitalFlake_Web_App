import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `/api/reset-password/${params.resetPasswordToken}`,
        {
          password,
          confirmPassword,
        }
      );
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [password]);

  return (
    <div className="container mx-auto  h-screen w-full flex justify-center items-center">
      <div
        className="md:w-[40%] w-[90%] h-auto p-4 py-6 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] 
      flex flex-col justify-center items-center
      "
      >
        <p className="font-medium text-lg">Reset Password</p>
        <p className="text-xs mt-2 text-gray-600">Enter new password</p>

        <ValidatorForm
          onSubmit={handleResetPassword}
          className="mt-8  w-full flex flex-col gap-y-6"
        >
          <TextValidator
            label="Password"
            validators={["required"]}
            errorMessages={["this field is required"]}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          />
          <TextValidator
            label="Repeat password"
            validators={["isPasswordMatch", "required"]}
            errorMessages={["password mismatch", "this field is required"]}
            name="confirmPassword"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="bg-purple-500 w-full mt-6 py-2 rounded-md text-white"
          >
            Reset
          </button>
        </ValidatorForm>
      </div>
    </div>
  );
};

export default ResetPassword;
