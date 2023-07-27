import { formatDate } from "./OrderItem";

const OrderInfo = ({ order }) => {
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[65%] m-auto text-base">
      <div className="lg:text-lg flex justify-between m-auto mt-10 items-start">
        <div className="w-1/3">
          <h1 className="flex justify-between">
            <span>City:</span>
            <span>{order.billingInfo.city}</span>
          </h1>
          <h1 className="flex justify-between">
            <span>Address 1:</span>
            <span>{order.billingInfo.address1}</span>
          </h1>
          <h1 className="flex justify-between">
            <span>Address 2:</span>
            <span>{order.billingInfo.address2}</span>
          </h1>
          <h1 className="flex justify-between">
            <span>Postal:</span>
            <span>{order.billingInfo.postal}</span>
          </h1>
          <h1 className="flex justify-between items-center">
            <span className="w-[5.2rem]">Instructions To Driver:</span>
            <span>{order.billingInfo.instructions || "Nil"}</span>
          </h1>
        </div>
        <div className="w-3/5 lg:w-[55%] xl:w-1/2 text-base xl:text-lg">
          <h1 className="flex justify-between">
            <span>Payment ID:</span>
            <span>{order.paymentInfo.paymentId}</span>
          </h1>
          <h1 className="flex justify-between">
            <span>Order ID:</span>
            <span>{order._id}</span>
          </h1>
          <h1 className="flex justify-between">
            <span>Payment Date:</span>
            <span>{formatDate(new Date(+order.createdAt))}</span>
          </h1>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-6 gap-x-16 text-base md:text-lg font-semibold">
          <span className="col-span-3 justify-self-start">Title</span>
          <span>Quantity</span>
          <span>Unit Price</span>
          <span>Total Cost</span>
        </div>
        <hr className="mt-1" />
        {order.items.map((item, index) => (
          <div
            className="grid grid-cols-6 gap-x-16 text-base md:text-lg space-y-3"
            key={index}
          >
            <span className="col-span-3 justify-self-start mt-3">
              {item.id.title}
            </span>
            <span>{item.quantity.toFixed(2)}</span>
            <span>${item.id.price.toFixed(2)}</span>
            <span>${(item.id.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr className="mt-3" />
      <div className="lg:text-lg mt-5 md:pr-3 lg:pr-5 space-y-3 w-full">
        <h1 className="flex justify-between">
          <span className="font-semibold">Sub-Total:</span>$
          {order.totalPriceOfItems}
        </h1>
        <h1 className="flex justify-between">
          <span className="font-semibold">
            GST ({(order.GST * 100).toFixed(0)}%):
          </span>
          ${(order.totalPriceOfItems * order.GST).toFixed(2)}
        </h1>
        <h1 className="flex justify-between">
          <span className="font-semibold">Delivery Fee:</span>$
          {order.deliveryFee.toFixed(2)}
        </h1>
        <h1 className="flex justify-between">
          <span className="font-semibold">Total Paid:</span>$
          {order.paymentInfo.amountPaid.toFixed(2)}
        </h1>
      </div>
    </div>
  );
};

export default OrderInfo;
