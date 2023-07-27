"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cartActions } from "@/store";
import { guestSave } from "@/util/clientFunctions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    dispatch(cartActions.setCart({ cart: [], totalItems: 0, totalPrice: 0 }));
    router.push("/cart?success=true");
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <div></div>;
};

export default PaymentPage;
