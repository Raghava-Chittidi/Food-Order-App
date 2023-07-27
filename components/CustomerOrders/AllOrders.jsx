import OrderItem from "./OrderItem";

const AllOrders = ({ orders }) => {
  return (
    <div className="mt-4">
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} index={index} />
      ))}
    </div>
  );
};

export default AllOrders;
