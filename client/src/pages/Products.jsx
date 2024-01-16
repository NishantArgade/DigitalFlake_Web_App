import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import ProductTable from "../components/ProductTable";

const Products = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/all-products");


      const ans = data?.allProducts || [];
      setData(ans);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);


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

  (filterData);
  return (
    <div className=" flex flex-col  gap-y-1 ">
      <CommonHeader
        title="Products"
        icon={<AllInboxOutlinedIcon />}
        link="/product/add"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      {data.length > 0 && <ProductTable columns={columns} data={filterData} />}
    </div>
  );
};

export default Products;
