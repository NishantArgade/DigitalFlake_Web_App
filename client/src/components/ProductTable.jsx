import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import DeleteProductModal from "./DeleteProductModal";
import EditProductModal from "./EditProductModal";

const ProductTable = ({ data, columns }) => {
  const [sorting, setSorting] = React.useState([]);
  const [openDeleteProductModal, setOpenDeleteProductModal] =
    React.useState(false);
  const [openEditProductModal, setOpenEditProductModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
  });

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setOpenDeleteProductModal(true);
  };
  const handleEditProductModal = (product) => {
    setSelectedProduct(product);
    setOpenEditProductModal(true);
  };
  return (
    <>
      <EditProductModal
        open={openEditProductModal}
        setOpen={setOpenEditProductModal}
        product={selectedProduct}
      />
      <DeleteProductModal
        open={openDeleteProductModal}
        setOpen={setOpenDeleteProductModal}
        productId={selectedProduct?._id}
      />
      <div className="p-2 min-h-[24rem] overflow-auto">
        <table className=" w-full  p-4 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="bg-purple-100 w-full" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="p-2 py-3" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex justify-start gap-x-3 items-center text-md"
                            : "",
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <span className="inline-flex flex-col gap-y-[4px] ">
                          <img
                            onClick={() => {
                              header.column.toggleSorting(false, false);
                            }}
                            src="/assets/up.png"
                            alt=""
                            className="p-0 m-0 w-[0.6rem] "
                          />
                          <img
                            onClick={() => {
                              header.column.toggleSorting(true, false);
                            }}
                            src="/assets/down.png"
                            alt=""
                            className="p-0 m-0  w-[0.6rem]"
                          />
                        </span>
                      </div>
                    )}
                  </th>
                ))}
                <div className=""> </div>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className="shadow-md h-full" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="p-2 text-sm " key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <button
                    className="mr-2 cursor-pointer "
                    onClick={() =>
                      handleEditProductModal(
                        row.getVisibleCells()[0]?.row?.original
                      )
                    }
                  >
                    <EditNoteIcon style={{ color: "gray" }} />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      handleDeleteProduct(
                        row.getVisibleCells()[0]?.row?.original
                      )
                    }
                  >
                    <DeleteOutlineIcon
                      style={{ color: "gray", fontSize: "1.3rem" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center gap-x-2 ">
        <button
          className="shadow-lg  md:px-2 md:py-1 px-1 rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>

        <button
          className="shadow-lg md:px-3 md:py-1 px-1 rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="shadow-lg md:px-3 md:py-1 px-1 rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="shadow-lg md:px-2 md:py-1 px-1 rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1 mr-2 text-sm md:text-base">
          <div className="text-md ">Page</div>
          <span className="font-semibold">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </span>
      </div>
    </>
  );
};

export default ProductTable;
