import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const CommonHeader = ({ title, icon, link, keyword, setKeyword }) => {
  return (
    <div className="flex justify-between items-center gap-2 w-full flex-wrap">
      <div className="text-gray-600 flex gap-2 my-2 cursor-pointer">
        {icon}
        <p className="font-bold">{title}</p>
      </div>
      <div className="flex justify-center items-center relative bg-white min-w-40 w-96">
        <SearchIcon
          className="absolute top-auto left-2 "
          color="gray"
          sx={{ color: "#B8B8B8" }}
        />
        <input
          className="pr-2 pl-8 py-1 w-full  outline-purple-700 bg-white border-2 rounded-md"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <Link to={link} className="md:w-auto w-full">
        <button className="bg-[#662671] text-white px-2 py-2 rounded-lg text-sm float-end">
          Add New
        </button>
      </Link>
    </div>
  );
};

export default CommonHeader;
