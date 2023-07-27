"use client";
import { useState } from "react";
import MenuItemModal from "./MenuItemModal";

const MenuItem = (props) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer hover:opacity-80 transition-all duration-200 m-auto"
        onClick={() => setModal(true)}
      >
        <img
          className="w-[20rem] h-[20rem] rounded-lg object-cover"
          src={props.imageUrl}
          alt={props.title}
        />
        <div className="flex justify-between 2xl:text-xl xl:text-lg text-base">
          <span>{props.title}</span>
          <span>${props.price.toFixed(2)}</span>
        </div>
      </div>
      {modal && <MenuItemModal {...props} setModal={setModal} />}
    </>
  );
};

export default MenuItem;
