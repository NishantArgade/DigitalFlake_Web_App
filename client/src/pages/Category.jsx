import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import CategoryTable from "../components/CategoryTable";
import CommonHeader from "../components/CommonHeader";

const Category = () => {
  const [keyword, setKeyword] = useState("");

  let { data } = useQuery({
    queryKey: ["allCategories"],
    initialData: [],
    queryFn: async () => {
      const response = await axios.get("/api/all-categories");
      return response?.data?.allCategories || []; // Make sure to return the data from the axios call
    },
  });

  const filterData = data.filter((item) => {
    let isPresent = false;
    Object.entries(item).forEach(([key, value]) => {
      if (
        !!value &&
        String(value).toLowerCase().includes(keyword.toLowerCase())
      ) {
        isPresent = true;
      }
    });

    return isPresent;
  });

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("_id", {
      header: () => <span>ID</span>,
      cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor("categoryName", {
      header: () => <span>Name</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("categoryDescription", {
      header: () => <span>Description</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("categoryStatus", {
      header: () => <span>Status</span>,
    }),
  ];

  return (
    <div className=" flex flex-col  gap-y-1 ">
      <CommonHeader
        title="Category"
        icon={<CategoryOutlinedIcon />}
        link="/category/add"
        keyword={keyword}
        setKeyword={setKeyword}
      />
      {data.length > 0 && <CategoryTable columns={columns} data={filterData} />}
    </div>
  );
};

export default Category;
