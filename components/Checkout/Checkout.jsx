"use client";
import { useEffect, useState } from "react";
import Address from "./Address";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Backdrop from "@/components/Modals/Backdrop";
import Modal from "@/components/Modals/Modal";
import { AiFillCloseCircle } from "react-icons/ai";

const Checkout = ({ menu }) => {
  const [summary, setSummary] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    city: null,
    address1: null,
    address2: null,
    postal: null,
    instructions: null,
  });
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  console.log(params);
  const [modal, setModal] = useState(useSearchParams().get("success"));
  const cartItems = useSelector((state) => state.cart.cart);
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length == 0) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex space-x-5">
          <span
            className={`${
              !summary && "text-black border-b-2 border-red-600"
            } text-black`}
          >
            Address
          </span>
          <span
            className={`${
              summary ? "text-black border-b-2 border-red-600" : "text-gray-300"
            } `}
          >
            Order Summary
          </span>
          <span className="text-gray-300">Payment</span>
        </div>
        <div className="m-auto w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 mt-5">
          {!summary ? (
            <Address
              setSummary={setSummary}
              setBillingInfo={setBillingInfo}
              billingInfo={billingInfo}
            />
          ) : (
            <Summary
              menu={menu}
              setSummary={setSummary}
              billingInfo={billingInfo}
            />
          )}
        </div>
      </div>
      {modal === "false" && (
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
              <AiFillCloseCircle
                size={100}
                fill="red"
                style={{ margin: "auto" }}
              />
              <div className="text-red-600 mt-2">ERROR</div>
              <div className="mt-5">
                <p className="text-lg">
                  Payment failed! Please try checking out again later.
                </p>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Checkout;
