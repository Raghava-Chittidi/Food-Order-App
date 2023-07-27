"use client";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useRouter, useSearchParams } from "next/navigation";
import Backdrop from "../Modals/Backdrop";
import Modal from "../Modals/Modal";
import { AiFillCheckCircle } from "react-icons/ai";
import { useState } from "react";

const Cart = ({ menu }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [modal, setModal] = useState(useSearchParams().get("success"));
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const router = useRouter();

  return (
    <>
      {cartItems.length > 0 && (
        <>
          <div className="grid grid-cols-4 justify-items-center font-semibold mt-5 grid-flow-col-dense">
            <span>Item</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total Price</span>
          </div>
          <div className="mt-5">
            {cartItems.map((cartItem) => {
              const item = menu.find((obj) => obj._id === cartItem.id);
              if (item) {
                return (
                  <CartItem item={item} cartItem={cartItem} key={cartItem.id} />
                );
              }
            })}
          </div>
        </>
      )}
      {cartItems.length === 0 && (
        <div className="text-center mt-20 text-xl">
          Cart is empty.{" "}
          <span
            className="cursor-pointer text-red-600 underline"
            onClick={() => router.push("/menu")}
          >
            Order now!
          </span>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="text-center font-semibold text-2xl space-x-10 flex items-center justify-center mb-5">
          <span>Cart Total: ${totalPrice.toFixed(2)}</span>
          <button
            className="btn-primary font-normal"
            onClick={() => router.push("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}
      {modal === "true" && (
        <>
          <Backdrop
            className="bg-black opacity-40 z-10 left-0"
            onClick={() => setModal(false)}
          />
          <Modal
            className="top-[30%] h-[40vh]"
            closeModal={() => setModal(false)}
            cross={false}
          >
            <div className="py-2 px-4 text-xl text-center">
              <AiFillCheckCircle
                size={100}
                fill="green"
                style={{ margin: "auto" }}
              />
              <div className="text-green-600 mt-2">SUCCESS</div>
              <div className="mt-5">
                <p className="text-lg">
                  Thank you for your purchase. We will deliver the items to the
                  given address shortly!
                </p>
                {isLoggedIn && (
                  <button
                    className="btn-primary mt-5 w-full"
                    onClick={() => router.push("/orders")}
                  >
                    View Orders
                  </button>
                )}
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Cart;
