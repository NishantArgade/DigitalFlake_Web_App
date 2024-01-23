import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormControl, MenuItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
import { client } from "../main";

const AddCategory = () => {
  const [inputs, setInputs] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryStatus: "",
  });

  const handleChangedInputs = (e) => {
    const name = e.target.name;
    setInputs((state) => ({ ...state, [name]: e.target.value }));
  };

  const naviate = useNavigate();

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    try {
      const data = axios.post("/api/create-category", inputs);

      toast.promise(data, {
        loading: "Loading...",
        success: "Category Added",
        error: (err) => err.response.data.message.toString(),
      });

      setInputs({
        categoryName: "",
        categoryDescription: "",
        categoryStatus: "",
      });
      client.invalidateQueries("allCategories");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="text-gray-600 flex flex-col gap-2 my-2 h-screen md:h-full  ">
      <div className="flex justify-start items-center gap-x-2 mb-4">
        <button onClick={() => naviate(-1)}>
          <ArrowBackIcon className="cursor-pointer" sx={{ color: "#888888" }} />
        </button>
        <p className="font-bold block">Add Category</p>
      </div>
      <ValidatorForm
        onSubmit={handleCategoryAdd}
        className="flex justify-evenly items-center md:flex-row flex-col gap-4 w-full md:h-10"
      >
        <TextValidator
          label="Category Name"
          fullWidth
          type="text"
          name="categoryName"
          value={inputs.categoryName}
          onChange={handleChangedInputs}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <TextValidator
          label="Description"
          type="text"
          fullWidth
          name="categoryDescription"
          value={inputs.categoryDescription}
          onChange={handleChangedInputs}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <FormControl>
          <SelectValidator
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            floatingLabelText="Status"
            label="Status"
            style={{
              minWidth: "10rem",
            }}
            name="categoryStatus"
            value={inputs.categoryStatus}
            onChange={handleChangedInputs}
            validators={["required"]}
            errorMessages={["this field is required"]}
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
          </SelectValidator>
        </FormControl>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-[#662671] py-2 px-8 rounded-3xl text-white text-sm  "
          >
            Add
          </button>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default AddCategory;
