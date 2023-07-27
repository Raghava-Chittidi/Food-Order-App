import React from "react";

const SummaryItem = ({ imageUrl, title, quantity, price }) => {
  return (
    <div className="flex w-full items-center justify-between py-2">
      <div className="space-y-10">
        <img
          src={imageUrl}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <span className="relative w-fit">
          <span className="item-number left-[4.5rem] bottom-[4.5rem]">
            {quantity}
          </span>
        </span>
      </div>
      <span>{title}</span>
      <span>${(quantity * price).toFixed(2)}</span>
    </div>
  );
};

export default SummaryItem;
