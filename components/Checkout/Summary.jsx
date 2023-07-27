"use client";
import { useSelector } from "react-redux";
import SummaryItem from "./SummaryItem";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai/index.esm";

const Summary = ({ menu, setSummary, billingInfo }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const userId = useSelector((state) => {
    if (state.auth.userData !== null) {
      return state.auth.userData.id;
    }
    return "GUEST";
  });
  const GST = +(0.07 * totalPrice).toFixed(2);
  const DELIVERY_FEE = 2.5;
  const finalPrice = totalPrice + GST + DELIVERY_FEE;
  const router = useRouter();

  const submitHandler = async () => {
    const items = cartItems.map((cartItem) => {
      const item = menu.find((obj) => obj._id === cartItem.id);
      return {
        title: item.title,
        price: +item.price.toFixed(2),
        quantity: cartItem.quantity,
        id: item._id,
      };
    });
    const res = await axios.post("/api/checkout", {
      items: items.concat([
        { title: "GST 7%", price: GST, quantity: 1 },
        { title: "Delivery Fee", price: DELIVERY_FEE, quantity: 1 },
      ]),
      userId,
      billingInfo,
    });
    router.push(res.data.url);
  };

  return (
    <div
      className={`rounded-lg px-5 overflow-y-scroll max-h-[75vh] border-2 border-black`}
    >
      <h1 className="text-xl pt-2 border-b-2 border-black w-fit m-auto">
        Order Summary
      </h1>
      {cartItems.map((cartItem) => {
        const item = menu.find((obj) => obj._id === cartItem.id);
        if (item) {
          return (
            <SummaryItem
              key={cartItem.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              quantity={cartItem.quantity}
            />
          );
        }
      })}
      <div className="flex flex-col mt-3 space-y-2">
        <h1 className="flex justify-between">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </h1>
        <h1 className="flex justify-between">
          <span>GST 7%:</span>
          <span>${GST.toFixed(2)}</span>
        </h1>
        <h1 className="flex justify-between">
          <span>Delivery Fee:</span>
          <span>${DELIVERY_FEE.toFixed(2)}</span>
        </h1>
        <h1 className="flex justify-between">
          <span>Total Cost:</span>
          <span>${finalPrice.toFixed(2)}</span>
        </h1>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="btn-secondary my-5 sm:text-sm md:text-base text-xs"
          onClick={() => setSummary(false)}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn-primary my-5 flex items-center space-x-2 sm:text-sm md:text-base text-xs"
          onClick={submitHandler}
        >
          <span>Proceed To Payment</span>
          <AiOutlineArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Summary;
