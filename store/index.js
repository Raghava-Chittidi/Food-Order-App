import { guestSave, save, saveBillingAddress } from "@/util/clientFunctions";

const { createSlice, configureStore } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], totalItems: 0, totalPrice: 0 },
  reducers: {
    addToCart(state, action) {
      const id = action.payload.id;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex != -1) {
        state.cart[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.cart = [...state.cart, action.payload];
      }
      state.totalItems += action.payload.quantity;
      state.totalPrice += +(
        action.payload.price * action.payload.quantity
      ).toFixed(2);

      action.payload.userId === "GUEST"
        ? guestSave(state)
        : save(state, action.payload.userId);
    },
    removeFromCart(state, action) {
      const id = action.payload.id;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex > -1) {
        const qty = state.cart[existingItemIndex].quantity;
        if (qty > 1) {
          state.cart[existingItemIndex].quantity -= 1;
        } else {
          const existingItem = state.cart[existingItemIndex];
          state.cart = state.cart.filter((item) => item.id !== existingItem.id);
        }
        state.totalItems -= 1;
        state.totalPrice -= +action.payload.price.toFixed(2);

        action.payload.userId === "GUEST"
          ? guestSave(state)
          : save(state, action.payload.userId);
      }
    },
    setCart(state, action) {
      state.cart = action.payload.cart;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    userData: null,
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const { token, userData } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      state.token = token;
      state.userData = userData;
      state.isLoggedIn = !!token;
      if (localStorage.getItem("cart")) {
        localStorage.removeItem("cart");
      }
      cartActions.setCart({
        cart: userData.cart.cart,
        totalItems: userData.cart.totalItems,
      });
    },
    logout(state) {
      localStorage.clear();
      state.token = "";
      state.userData = null;
      state.isLoggedIn = false;
      cartActions.setCart({ cart: [], totalItems: 0, totalPrice: 0 });
    },
    saveBillingInfo(state, action) {
      const { city, address1, address2, postal } = action.payload;
      state.userData = { ...state.userData, city, address1, address2, postal };
      saveBillingAddress(
        { city, address1, address2, postal },
        state.userData.id
      );
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer, auth: authSlice.reducer },
});

export const cartActions = cartSlice.actions;
export const authActions = authSlice.actions;

export default store;
