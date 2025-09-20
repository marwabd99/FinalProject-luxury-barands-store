import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// יצירת הזמנה חדשה
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const { users } = getState();
      const token = users?.userInfo?.token;

      if (!token) return rejectWithValue("משתמש לא מחובר. אנא התחברו מחדש.");

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("❌ createOrder server error:", data);
        return rejectWithValue(data?.message || "יצירת הזמנה נכשלה");
      }

      const data = await res.json();
      if (!data._id)
        return rejectWithValue("שגיאה: ההזמנה לא כוללת מזהה (_id).");

      return data;
    } catch (err) {
      console.error("❌ createOrder fetch error:", err);
      return rejectWithValue(err.message || "שגיאה לא צפויה ביצירת ההזמנה");
    }
  }
);

// שליפת כל ההזמנות של המשתמש
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { users } = getState();
      const token = users?.userInfo?.token;
      if (!token) return rejectWithValue("משתמש לא מחובר. אנא התחברו מחדש.");

      const res = await fetch("http://localhost:5000/api/orders/my-orders", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("❌ fetchMyOrders server error:", data);
        return rejectWithValue(data?.message || "שליפת הזמנות נכשלה");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("❌ fetchMyOrders fetch error:", err);
      return rejectWithValue(err.message || "שגיאה לא צפויה בשליפת ההזמנות");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?._id) state.orders.push(action.payload);
        else state.error = "שגיאה: ההזמנה לא כוללת מזהה.";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
