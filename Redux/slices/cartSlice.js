import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/api";

// פונקציה עזר לשליפת token
const getToken = (getState) => {
  const { users } = getState();
  return (
    users?.userInfo?.token ||
    JSON.parse(localStorage.getItem("userInfo"))?.token
  );
};

// =====================
// שליפת עגלה מהשרת
// =====================
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      if (!token) throw new Error("משתמש לא מחובר");

      const res = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "שליפת עגלה נכשלה");

      return data.items || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =====================
// הוספת מוצר לעגלה
// =====================
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      if (!token) throw new Error("משתמש לא מחובר");

      const res = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "הוספה לעגלה נכשלה");

      return data.items || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =====================
// הסרת מוצר מהעגלה
// =====================
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      if (!token) throw new Error("משתמש לא מחובר");

      const res = await fetch(`${BASE_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "הסרה מהעגלה נכשלה");

      return data.items || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =====================
// ניקוי כל העגלה
// =====================
export const clearCartServer = createAsyncThunk(
  "cart/clearCartServer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);
      if (!token) throw new Error("משתמש לא מחובר");

      const res = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "ניקוי כשל");

      return data.items || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// =====================
// Slice של העגלה
// =====================
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // שינוי כמות מוצר באופן מיידי ב־Redux (עדכון מקומי)
    changeQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.product._id === productId);
      if (item) item.quantity = quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE FROM CART
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLEAR CART
      .addCase(clearCartServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartServer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(clearCartServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ייצוא פעולות רגילות
export const { changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
