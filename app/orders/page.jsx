"use client";
import AllOrders from "@/components/CustomerOrders/AllOrders";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination/Pagination";
import { getOrders } from "@/util/clientFunctions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => {
    if (state.auth.userData) {
      return state.auth.userData.id;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    } else {
      const sendRequest = async () => {
        setLoading(true);
        const data = await getOrders(userId, page);
        setOrders(data.orders);
        setTotalPages(data.totalPages);
        setLoading(false);
        console.log("working");
      };
      sendRequest();
    }
  }, [page]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 className="text-center text-3xl">Orders</h1>
      {orders && orders.length === 0 && (
        <p className="text-center mt-10">You have not made any orders yet!</p>
      )}
      {orders && orders.length > 0 && (
        <>
          <div className="grid grid-cols-3 px-14 justify-items-center mt-5 font-bold">
            <span>Order ID</span>
            <span>Amount Paid</span>
            <span>Datetime Of Order</span>
          </div>
          <AllOrders orders={orders} />
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        </>
      )}
    </>
  );
};

export default OrdersPage;
