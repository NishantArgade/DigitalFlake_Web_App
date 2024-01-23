import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { client } from "../main";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 500,
  bgcolor: "background.paper",
  border: "2px solid #8c8c8c",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function EditProductModal({ open, setOpen, product }) {
  const handleClose = () => setOpen(false);
  const uploadRef = React.useRef(null);
  // const client = new QueryClient();

  const [inputs, setInputs] = React.useState({});

  React.useEffect(() => {
    setInputs({
      category: product?.productCategory,
      productName: product?.productName,
      packSize: product?.productPackSize,
      mrp: product?.productMRP,
      status: product?.productStatus,
      image: product?.productImage,
    });
  }, [product]);
  const handleChangedInputs = (e) => {
    const name = e.target.name;
    setInputs((state) => ({ ...state, [name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    setInputs((state) => ({ ...state, image: e.target.files[0] }));
  };

  const mutation = useMutation({
    mutationKey: ["editProduct"],
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("file", inputs.image);
      formData.append("category", inputs.category);
      formData.append("productName", inputs.productName);
      formData.append("packSize", inputs.packSize);
      formData.append("mrp", inputs.mrp);
      formData.append("status", inputs.status);
      formData.append("id", product?._id);

      const data = axios.post("/api/update-product", formData);
      toast.promise(data, {
        loading: "Loading...",
        success: "Product Updated",
        error: (err) => err.response.data.message.toString(),
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
      client.invalidateQueries("allProducts");
      handleCancel();
    },
  });

  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (!inputs.image) {
      return toast.error("Select an Image");
    } else {
      mutation.mutate();
    }
  };
  const [cat, setCat] = React.useState([]);

  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/all-categories");

      const ans = data?.allCategories || [];
      setCat(ans);
    } catch (error) {
      return [];
    }
  };

  React.useEffect(() => {
    fetchAllCategories();
    if (uploadRef.current) {
      uploadRef.current.value = product?.productImage;
    }
  }, []);

  const handleCancel = () => {
    setInputs(product);
    uploadRef.current.value = "";
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCancel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex justify-start items-center  mb-6">
              <p className="font-semibold text-[1.1rem] text-gray-600">
                Edit Product
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="md:grid md:grid-col-3   md:grid-rows-2  md:grid-flow-col md:gap-x-4 md:gap-y-8 flex flex-col gap-y-4  ">
                <FormControl size="small" className="col-start-1" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    name="category"
                    value={inputs?.category || product?.productCategory}
                    onChange={handleChangedInputs}
                  >
                    {cat.map(({ categoryName }) => (
                      <MenuItem key={categoryName} value={categoryName}>
                        {categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  style={{ minWidth: "10rem" }}
                  fullWidth
                  size="small"
                  className="text-sm"
                  type="number"
                  label="MRP"
                  name="mrp"
                  value={inputs?.mrp}
                  onChange={handleChangedInputs}
                />
                <TextField
                  style={{ minWidth: "10rem" }}
                  fullWidth
                  size="small"
                  type="text "
                  label="Product Name"
                  name="productName"
                  value={inputs?.productName}
                  onChange={handleChangedInputs}
                />

                <div className="w-64 flex  flex-col items-center  bg-white text-blue rounded-sm border-[1px] border-gray-400  tracking-wide  border border-blue cursor-pointer hover:bg-blue hover:text-black">
                  <label className="flex justify-between items-center w-full py-[0.24rem] px-2 cursor-pointer">
                    <input
                      ref={uploadRef}
                      type="file"
                      multiple={false}
                      name="image"
                      className="cursor-pointer"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <TextField
                  style={{ minWidth: "10rem" }}
                  className="w-full"
                  size="small"
                  type="number"
                  label="Pack Size"
                  name="packSize"
                  value={inputs?.packSize}
                  onChange={handleChangedInputs}
                />
                <FormControl
                  style={{ minWidth: "10rem" }}
                  size="small"
                  className="row-end-3"
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    name="status"
                    value={inputs?.status || product?.productStatus}
                    onChange={handleChangedInputs}
                    // onChange={handleChange}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-4 mt-10">
              <button
                onClick={() => handleCancel()}
                className="bg-white py-2 px-8 text-sm  rounded-3xl text-gray-600 border-[1px] border-gray-400"
              >
                Cancel
              </button>
              <button
                disabled={mutation.isLoading}
                onClick={handleEditProduct}
                className="bg-[#662671] py-2 px-8 rounded-3xl text-white text-sm  "
              >
                Update
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
