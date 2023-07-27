"use client";
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai/index.esm";
import { IoFastFoodOutline } from "react-icons/io5/index.esm";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions, cartActions } from "@/store";
import LoadingSpinner from "../LoadingSpinner";

const NavBar = ({ children }) => {
  const router = useRouter();
  const totalItems = useSelector((state) => state.cart.totalItems);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      axios
        .post("/api/verify", { token })
        .then((res) => {
          if (res.status == 200 && res.data.userData) {
            dispatch(authActions.login({ token, userData: res.data.userData }));
            dispatch(cartActions.setCart(res.data.userData.cart));
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response.data.error.name);
          setLoading(false);
        });
    } else {
      if (localStorage.getItem("cart")) {
        dispatch(cartActions.setCart(JSON.parse(localStorage.getItem("cart"))));
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex items-center justify-between py-3 sticky px-14 top-0 bg-white z-10">
        <div
          className="flex items-center font-semibold text-4xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="mb-2">
            <IoFastFoodOutline />
          </span>
          <span>Mealz</span>
        </div>
        <div className="flex items-center space-x-5 md:space-x-10">
          <span className="relative">
            <AiOutlineShoppingCart
              size={20}
              className="navlink"
              onClick={() => router.push("/cart")}
            />
            <span className="item-number bottom-3 left-3">{totalItems}</span>
          </span>
          <div className="navlink" onClick={() => router.push("/menu")}>
            Menu
          </div>
          {isLoggedIn && (
            <div className="navlink" onClick={() => router.push("/orders")}>
              Orders
            </div>
          )}
          {!isLoggedIn && (
            <div className="navlink" onClick={() => router.push("/login")}>
              Login
            </div>
          )}
          {isLoggedIn && <Avatar />}
        </div>
      </div>
      {children}
    </>
  );
};

export default NavBar;
