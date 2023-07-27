"use client";
import { useRouter } from "next/navigation";

const OrderItem = ({ order, index }) => {
  const router = useRouter();

  return (
    <>
      <div className="absolute">
        <span className="relative top-4 left-7 text-xl">{index + 1}.</span>
      </div>
      <div
        className="grid grid-cols-3 justify-items-center cursor-pointer h-14 mx-14 place-items-center hover:bg-gray-200"
        onClick={() => router.push(`/orders/${order._id}`)}
      >
        <span>{order._id}</span>
        <span>${order.paymentInfo.amountPaid.toFixed(2)}</span>
        <span>{formatDate(new Date(+order.createdAt))}</span>
      </div>
      <hr className="mx-14" />
    </>
  );
};

export const formatDate = (d) => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hr = d.getHours();
  let min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return date + " " + month + " " + year + " " + hr + ":" + min + ampm;
};

export default OrderItem;
