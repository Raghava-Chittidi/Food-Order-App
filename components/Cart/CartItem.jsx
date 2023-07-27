"use-client";
import { cartActions } from "@/store";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai/index.esm";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ item, cartItem }) => {
  const [qty, setQty] = useState(cartItem.quantity);
  const dispatch = useDispatch();

  const userId = useSelector((state) => {
    if (state.auth.userData !== null) {
      return state.auth.userData.id;
    }
    return "GUEST";
  });

  return (
    <div
      key={item._id}
      className="grid grid-cols-4 justify-items-center space-y-7 mb-5"
    >
      <div className="flex flex-col items-center">
        <img
          className="w-[6rem] h-[6rem] rounded-lg object-cover m-0"
          src={item.imageUrl}
          alt={item.title}
        />
        <span>{item.title}</span>
      </div>
      <span className="space-x-3 flex">
        <span className="cursor-pointer text-red-600 mt-1">
          <AiOutlineMinus
            onClick={() => {
              dispatch(
                cartActions.removeFromCart({
                  id: item._id,
                  price: item.price,
                  userId,
                })
              );
              setQty((prevState) => {
                if (prevState > 1) {
                  return prevState - 1;
                }
                return prevState;
              });
            }}
          />
        </span>
        <span>x {qty}</span>
        <span className="cursor-pointer text-red-600 mt-1">
          <AiOutlinePlus
            onClick={() => {
              dispatch(
                cartActions.addToCart({
                  id: item._id,
                  quantity: 1,
                  price: item.price,
                  userId,
                })
              );
              setQty((prevState) => prevState + 1);
            }}
          />
        </span>
      </span>
      <span>${item.price.toFixed(2)}</span>
      <span>${(item.price * cartItem.quantity).toFixed(2)}</span>
    </div>
  );
};

export default CartItem;
