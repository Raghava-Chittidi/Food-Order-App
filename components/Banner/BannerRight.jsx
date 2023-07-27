"use client";
import { cartActions } from "@/store";
import { useDispatch, useSelector } from "react-redux";

const BannerRight = ({ menu }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    if (state.auth.userData !== null) {
      return state.auth.userData.id;
    }
    return "GUEST";
  });
  const item = menu.find((item) => item.title === "Original Cheeseburger");
  return (
    <div className="w-screen px-14 md:px-0 md:w-[45%] lg:w-2/5 mt-10 flex flex-col items-center">
      <div className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl 2xl:text-4xl text-red-600">
        20% OFF! LIMITED TIME
      </div>
      <div className="text-xl sm:text-2xl md:text-lg lg:text-xl 2xl:text-2xl absolute -z-10 mt-10 md:mt-8 lg:mt-12">
        Original Cheeseburger $12.99
      </div>
      <img
        className="w-11/12 hover:scale-105 transition-all duration-300 cursor-pointer"
        src="burger.png"
        alt="burger"
      />
      <button
        className="btn-primary"
        onClick={() =>
          dispatch(
            cartActions.addToCart({
              id: item._id,
              quantity: 1,
              price: item.price,
              userId,
            })
          )
        }
      >
        Add To Cart
      </button>
    </div>
  );
};

export default BannerRight;
