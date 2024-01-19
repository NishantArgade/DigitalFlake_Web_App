import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import { FormControl, MenuItem } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  SelectValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { useQuery } from "react-query";
import CommonHeader from "../components/CommonHeader";
import ProductTable from "../components/ProductTable";

const Products = () => {
  const [keyword, setKeyword] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  let { data } = useQuery({
    queryKey: ["allProducts"],
    initialData: [],
    queryFn: async () => {
      const response = await axios.get("/api/all-products");
      return response?.data?.allProducts || []; // Make sure to return the data from the axios call
    },
    refetchOnWindowFocus: false,
  });

  let { data: cat } = useQuery({
    queryKey: ["allCategories"],
    initialData: [],
    queryFn: async () => {
      const response = await axios.get("/api/all-categories");
      return response?.data?.allCategories || []; // Make sure to return the data from the axios call
    },
  });

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("_id", {
      header: () => <span>ID</span>,
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("productName", {
      header: () => <span>Name</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("productPackSize", {
      header: () => <span>Pack Size</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("productCategory", {
      header: () => <span>Category</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("productMRP", {
      header: () => <span>MRP</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("productImage", {
      header: () => <span>Image</span>,
      cell: (info) => (
        <img
          className="w-10 h-10 object-cover bg-gray-100 p-1"
          src={info.row.original.productImage}
          alt="img"
        />
      ),
    }),
    columnHelper.accessor("productStatus", {
      header: () => <span>Status</span>,
      cell: (info) => info.renderValue(),
    }),
  ];

  const filterData = data.filter((item) => {
    let isPresent = false;
    Object.entries(item).forEach(([key, value]) => {
      if (
        !!value &&
        String(value).toLowerCase()?.includes(keyword.toLowerCase())
      ) {
        isPresent = true;
      }
    });

    return isPresent;
  });

  const handleSearchCategory = (selectedOption) => {
    setKeyword(selectedOption);
  };

  return (
    <div className=" flex flex-col  gap-y-1 ">
      <CommonHeader
        title="Products"
        icon={<AllInboxOutlinedIcon />}
        link="/product/add"
        keyword={keyword}
        setKeyword={setKeyword}
      />

      <ValidatorForm className="mt-2">
        <SelectValidator
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          floatingLabelText="Search By Category"
          label="Search By Category"
          style={{
            minWidth: "14.1rem",
          }}
          name="categoryStatus"
          value={searchCategory}
          onChange={(e) => {
            handleSearchCategory(e.target.value);
            setSearchCategory(e.target.value);
          }}
          validators={["required"]}
          errorMessages={["this field is required"]}
        >
          <MenuItem defaultChecked value={""}>
            All
          </MenuItem>
          {cat.map(({ categoryName }) => (
            <MenuItem key={categoryName} value={categoryName}>
              {categoryName}
            </MenuItem>
          ))}
        </SelectValidator>
      </ValidatorForm>

      {data.length > 0 && <ProductTable columns={columns} data={filterData} />}
    </div>
  );
};

export default Products;
