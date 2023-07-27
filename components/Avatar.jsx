"use client";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs/index.esm";
import Backdrop from "./Modals/Backdrop";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authActions, cartActions } from "@/store";

const Avatar = () => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => setDropdown((prevState) => !prevState)}
      >
        <img
          src={userData.imageUrl}
          alt="Profile Picture"
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="bg-gray-200 w-3 h-3 rounded-full absolute top-10 right-14 outline outline-white">
          <BsChevronDown size={12} />
        </div>
      </div>
      {dropdown && (
        <div className="absolute top-[3.25rem] right-14 text-center shadow-xl border-gray-200 border-2 rounded-md z-10 bg-white">
          <div
            className="navlink px-5 py-2"
            onClick={() => {
              setDropdown(false);
              router.push("/profile");
            }}
          >
            Profile
          </div>
          <div
            className="navlink px-5 py-2"
            onClick={() => {
              dispatch(authActions.logout());
              dispatch(
                cartActions.setCart({ cart: [], totalItems: 0, totalPrice: 0 })
              );
              setDropdown(false);
              router.push("/");
            }}
          >
            Logout
          </div>
        </div>
      )}
      {dropdown && <Backdrop onClick={() => setDropdown(false)} />}
    </>
  );
};

export default Avatar;
