import WarningIcon from "@mui/icons-material/Warning";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import toast from "react-hot-toast";
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

export default function DeleteProductModal({ open, setOpen, productId }) {
  const handleClose = () => setOpen(false);

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/api/remove-product/${productId}`);
      client.invalidateQueries("allProducts");
      handleClose();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
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
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center items-center gap-x-2">
                <WarningIcon sx={{ color: "red" }} />
                <p className="font-semibold text-[1.1rem]">Delete Product</p>
              </div>
              <p className="text-gray-700 pt-2 text-[0.9rem]">
                Are you sure you want to delete this product?
              </p>
            </div>
            <div className="flex justify-center items-center gap-x-4 mt-10">
              <button
                onClick={() => handleClose()}
                className="bg-white py-2 px-8 text-sm  rounded-3xl text-gray-600 border-[1px] border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-[#662671] py-2 px-8 rounded-3xl text-white text-sm  "
              >
                Confirm
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
