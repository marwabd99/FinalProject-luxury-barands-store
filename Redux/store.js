import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartSlice";
import accessibilityReducer from "./slices/accessibilitySlice";
import ordersReducer from "./slices/ordersSlice";
import loginRegisterReducer from "./slices/loginRegisterSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    cart: cartReducer,
    accessibility: accessibilityReducer,
    orders: ordersReducer,
    loginRegister: loginRegisterReducer,
  },
});
