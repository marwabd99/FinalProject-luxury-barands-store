import { createSlice } from "@reduxjs/toolkit";

// =====================
// יצירת ה-Slice
// =====================
const loginRegisterSlice = createSlice({
  name: "loginRegister",
  initialState: {
    // נטען משתמש מה-localStorage אם קיים
    login_open: false,
    register_open: false,
  },
  reducers: {
    // פעולה ליציאה מהמערכת (Logout)
    login_popup: (state) => {
      state.login_open = true;
      state.register_open = false;
    },
    register_popup: (state) => {
      state.login_open = false;
      state.register_open = true;
    },
    close_popup: (state) => {
      state.login_open = false;
      state.register_open = false;
    },
  },
});

// =====================
// ייצוא הפעולות וה-reducer
// =====================
export const { close_popup, login_popup, register_popup } =
  loginRegisterSlice.actions;
export default loginRegisterSlice.reducer;