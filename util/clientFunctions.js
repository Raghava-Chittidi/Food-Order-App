import axios from "axios";

export const save = async (cart, userId) => {
  try {
    const res = await axios.patch(`/api/cart/${userId}`, cart);
    if (res.status !== 200) {
      throw Error(res.data.error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const guestSave = async (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const saveBillingAddress = async (info, userId) => {
  try {
    const res = await axios.patch(`/api/billing/${userId}`, info);
    if (res.status !== 200) {
      throw Error(res.data.error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (userId, page = 1) => {
  try {
    const res = await axios.get(`/api/orders/${userId}?page=${+page}`);
    if (res.data.orders) {
      return res.data;
    }
    throw Error(res.data.error);
  } catch (err) {
    console.log(err);
  }
};

export const getOrderById = async (userId, orderId) => {
  const res = await axios.get(`/api/orders/${userId}/${orderId}`);
  return res;
};
