import React, { useState } from "react";
import { BsChevronDoubleLeft } from "react-icons/bs";
import {
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const Pagination = ({ totalPages, page, setPage }) => {
  return (
    <div className="flex items-center space-x-3 text-2xl absolute right-[12%] bottom-[5%]">
      <BsChevronDoubleLeft
        style={{
          cursor: `${page == 1 ? "auto" : "pointer"}`,
          color: `${page == 1 ? "lightgray" : "red"}`,
        }}
        onClick={() =>
          setPage((prevState) => {
            if (prevState != 1) {
              return 1;
            }
            return prevState;
          })
        }
      />
      <BsChevronLeft
        style={{
          cursor: `${page == 1 ? "auto" : "pointer"}`,
          color: `${page == 1 ? "lightgray" : "red"}`,
        }}
        onClick={() =>
          setPage((prevState) => {
            if (prevState > 1) {
              return prevState - 1;
            }
            return prevState;
          })
        }
      />
      <button className="btn-primary text-white bg-red-600 w-10">{page}</button>
      <BsChevronRight
        style={{
          cursor: `${page == totalPages ? "auto" : "pointer"}`,
          color: `${page == totalPages ? "lightgray" : "red"}`,
        }}
        onClick={() =>
          setPage((prevState) => {
            if (prevState < totalPages) {
              return prevState + 1;
            }
            return prevState;
          })
        }
      />
      <BsChevronDoubleRight
        style={{
          cursor: `${page == totalPages ? "auto" : "pointer"}`,
          color: `${page == totalPages ? "lightgray" : "red"}`,
        }}
        onClick={() =>
          setPage((prevState) => {
            if (prevState != totalPages) {
              return totalPages;
            }
            return prevState;
          })
        }
      />
    </div>
  );
};

export default Pagination;
