"use client";
import OrderInfo from "@/components/CustomerOrders/OrderInfo";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getOrderById } from "@/util/clientFunctions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const { orderId } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => {
    if (state.auth.userData) {
      return state.auth.userData.id;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    } else {
      const sendRequest = async () => {
        try {
          const res = await getOrderById(userId, orderId);
          setOrder(res.data.order);
          setLoading(false);
        } catch (error) {
          router.replace("/404");
          return;
        }
      };
      sendRequest();
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-center text-base md:text-lg lg:text-xl xl:text-3xl">
      <h1 className="border-b-2 border-black w-1/2 m-auto mt-3">
        Order ID - {orderId}
      </h1>
      <OrderInfo order={order} />
    </div>
  );
};

export default OrderPage;
