import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai/index.esm";
import Backdrop from "../Modals/Backdrop";
import Modal from "../Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cartActions } from "@/store";

const MenuItemModal = ({
  id,
  title,
  imageUrl,
  description,
  calories,
  price,
  setModal,
}) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState(1);

  const userId = useSelector((state) => {
    if (state.auth.userData !== null) {
      return state.auth.userData.id;
    }
    return "GUEST";
  });

  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        id,
        quantity: items,
        price,
        userId,
      })
    );
    setTimeout(() => {
      setModal(false);
    }, 100);
  };

  return (
    <>
      <Backdrop
        onClick={() => {
          setModal(false);
          setItems(1);
        }}
        className="bg-black opacity-40 z-10 left-0"
      />
      <Modal
        closeModal={() => {
          setModal(false);
          setItems(1);
        }}
      >
        <img
          className="w-full max-h-[21rem] sm:max-h-[25rem] rounded-t-lg object-cover"
          src={imageUrl}
          alt={title}
        />
        <div className="py-2 px-4 mb-4">
          <div className="flex justify-between text-2xl">
            <span className="flex flex-col sm:flex-row items-start sm:items-center space-x-2">
              <span>{title}</span>
              <span className="text-sm">({calories} kcal)</span>
            </span>
            <span>${price.toFixed(2)}</span>
          </div>
          <p className="mt-5 text-justify">{description}</p>
          <div className="flex mt-10 items-center space-x-2 text-2xl">
            <span
              className={`${
                items > 1 ? "cursor-pointer text-red-600" : "text-gray-300"
              }`}
            >
              <AiOutlineMinus
                onClick={() =>
                  setItems((prevState) => {
                    let value = prevState;
                    prevState > 1 && (value -= 1);
                    return value;
                  })
                }
              />
            </span>
            <span>{items}</span>
            <span className="cursor-pointer text-red-600">
              <AiOutlinePlus
                onClick={() => setItems((prevState) => prevState + 1)}
              />
            </span>
            <button className="btn-primary w-full" onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuItemModal;
