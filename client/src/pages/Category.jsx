import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import CommonHeader from "../components/CommonHeader";

const Category = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/all-categories");


      const ans = data?.allCategories || [];
      setData(ans);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

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
