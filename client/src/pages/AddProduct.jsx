import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormControl, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const naviate = useNavigate();
  const uploadRef = useRef(null);

  const mutation = useMutation({
    mutationKey: "addProduct",
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("file", inputs.image);
      formData.append("category", inputs.category);
      formData.append("productName", inputs.productName);
      formData.append("packSize", inputs.packSize);
      formData.append("mrp", inputs.mrp);
      formData.append("status", inputs.status);

      const data = axios.post("/api/create-product", formData);

      toast.promise(data, {
        loading: "Loading...",
        success: "Product Added",
        error: "Something went wrong!",
      });

      return data;
    },
    onSuccess: () => {
      setInputs({
        category: "",
        productName: "",
        packSize: "",
        mrp: "",
        status: "",
        image: "",
      });
      uploadRef.current.value = "";
    },
  });

  const [inputs, setInputs] = useState({
    category: "",
    productName: "",
    packSize: "",
    mrp: "",
    status: "",
    image: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();

    mutation.mutate();
  };

  const handleChangedInputs = (e) => {
    const name = e.target.name;
    setInputs((state) => ({ ...state, [name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    setInputs((state) => ({ ...state, image: e.target.files[0] }));
  };

  const [cat, setCat] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/all-categories");

      const ans = data?.allCategories || [];
      setCat(ans);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="text-gray-600 flex flex-col gap-2 my-2 h-screen md:h-full">
      <div className="flex justify-start items-center gap-x-2 mb-4">
        <button onClick={() => naviate(-1)}>
          <ArrowBackIcon className="cursor-pointer" sx={{ color: "#888888" }} />
        </button>
        <p className="font-bold">Add Product</p>
      </div>

      <ValidatorForm
        onSubmit={handleAddProduct}
        className="md:grid md:grid-col-3  flex flex-col gap-y-4 md:grid-rows-2  md:grid-flow-col md:gap-x-4 md:gap-y-8 flex flex-col gap-y-6 "
      >
        <div className="flex flex-wrap justify-around items-center md:gap-8 gap-y-4">
          <FormControl>
            <SelectValidator
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              floatingLabelText="Status"
              label="Category"
              style={{
                minWidth: "14.1rem",
              }}
              name="category"
              value={inputs.category}
              onChange={handleChangedInputs}
              validators={["required"]}
              errorMessages={["this field is required"]}
            >
              {cat.map(({ categoryName }) => (
                <MenuItem key={categoryName} value={categoryName}>
                  {categoryName}
                </MenuItem>
              ))}
            </SelectValidator>
          </FormControl>

          <TextValidator
            label="Product Name"
            type="text"
            fullWidth
            // onChange={handleInputChange}
            validators={["required"]}
            errorMessages={["this field is required"]}
            name="productName"
            value={inputs.productName}
            onChange={handleChangedInputs}
          />
          <TextValidator
            label="Pack Size"
            type="number"
            fullWidth
            name="packSize"
            value={inputs.packSize}
            onChange={handleChangedInputs}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <TextValidator
            label="MRP"
            type="number"
            name="mrp"
            value={inputs.mrp}
            onChange={handleChangedInputs}
            fullWidth
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <div className="items-center justify-st bg-white text-blue rounded-sm border-[1px] border-gray-400  tracking-wide  border border-blue cursor-pointer hover:bg-blue hover:text-black">
            <label className=" justify-between min-w-8 items-center  py-[0.24rem]cursor-pointer">
              <input
                ref={uploadRef}
                type="file"
                onChange={handleImageUpload}
                multiple={false}
                // className="cursor-pointer"
                style={{
                  padding: "0.6rem",
                  maxWidth: "14rem",
                }}
              />
            </label>
          </div>
          <FormControl>
            <SelectValidator
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              floatingLabelText="Status"
              label="Status"
              style={{
                minWidth: "14.1rem",
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
        </div>
        <div className="flex flex-col justify-start items-end gap-x-4 md:mr-5 md:p-1 p-0">
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

export default AddProduct;
