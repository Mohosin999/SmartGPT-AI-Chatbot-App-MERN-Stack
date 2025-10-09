// import axios from "axios";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // ---Thunks---

// // Register
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/register`,
//         userData
//       );
//       // Store token in localStorage
//       localStorage.setItem("token", res.data.data.access_token);
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Register failed"
//       );
//     }
//   }
// );

// // Login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/login`,
//         userData
//       );
//       // Store token in localStorage
//       localStorage.setItem("token", res.data.data.access_token);
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// // Logout
// export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
//   localStorage.removeItem("token");
// });

// // ---Slice---
// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.loading = false;
//         state.error = null;
//       });
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;

// import api from "@/api/axiosInstance";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // ---Thunks---

// // Register
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/register`,
//         userData
//       );

//       // Store tokens in localStorage
//       localStorage.setItem("accessToken", res.data.data.access_token);
//       localStorage.setItem("refreshToken", res.data.data.refresh_token);

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Register failed"
//       );
//     }
//   }
// );

// // Login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/login`,
//         userData
//       );

//       // Store tokens in localStorage
//       localStorage.setItem("accessToken", res.data.data.access_token);
//       localStorage.setItem("refreshToken", res.data.data.refresh_token);

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// /**
//  * -------------------------------------------------------------------------
//  * NOTE ABOUT EXTRA REDUCERS
//  * -------------------------------------------------------------------------
//  * We intentionally do NOT handle this action in extraReducers because:
//  *
//  * 1. The refresh token process does not modify the user's Redux state.
//  *    It only updates tokens in localStorage to keep the session alive.
//  *
//  * 2. This thunk runs silently in the background (usually via an Axios
//  *    interceptor) and doesn’t need to trigger any UI loading or error state.
//  *
//  * 3. If you ever need to track loading/error states or force logout on
//  *    refresh failure, you can easily add extraReducers for this action later.
//  * -------------------------------------------------------------------------
//  */
// export const refreshAccessToken = createAsyncThunk(
//   "auth/refreshAccessToken",
//   async (_, { rejectWithValue }) => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) throw new Error("No refresh token found");

//       const res = await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
//         { refresh_token: refreshToken } // send in body
//       );

//       // Update access token
//       localStorage.setItem("accessToken", res.data.data.access_token);

//       // Optionally update refresh token if backend rotates it
//       if (res.data.data.refresh_token) {
//         localStorage.setItem("refreshToken", res.data.data.refresh_token);
//       }

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Token refresh failed"
//       );
//     }
//   }
// );

// // Logout
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) return rejectWithValue("No authentication token found");

//       await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/logout`,
//         {},
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       return null;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Logout failed");
//     }
//   }
// );

// // ---Slice---
// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.loading = false;
//         state.error = null;
//       });
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;

// import api from "@/api/axiosInstance";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // ---Thunks---

// // Register
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/register`,
//         userData
//       );

//       // Store tokens in localStorage
//       localStorage.setItem("accessToken", res.data.data.access_token);
//       localStorage.setItem("refreshToken", res.data.data.refresh_token);

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Register failed"
//       );
//     }
//   }
// );

// // Login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/login`,
//         userData
//       );

//       // Store tokens in localStorage
//       localStorage.setItem("accessToken", res.data.data.access_token);
//       localStorage.setItem("refreshToken", res.data.data.refresh_token);

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// /**
//  * -------------------------------------------------------------------------
//  * NOTE ABOUT EXTRA REDUCERS
//  * -------------------------------------------------------------------------
//  * We intentionally do NOT handle this action in extraReducers because:
//  *
//  * 1. The refresh token process does not modify the user's Redux state.
//  *    It only updates tokens in localStorage to keep the session alive.
//  *
//  * 2. This thunk runs silently in the background (usually via an Axios
//  *    interceptor) and doesn’t need to trigger any UI loading or error state.
//  *
//  * 3. If you ever need to track loading/error states or force logout on
//  *    refresh failure, you can easily add extraReducers for this action later.
//  * -------------------------------------------------------------------------
//  */
// export const refreshAccessToken = createAsyncThunk(
//   "auth/refreshAccessToken",
//   async (_, { rejectWithValue }) => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) throw new Error("No refresh token found");

//       const res = await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
//         { refresh_token: refreshToken } // send in body
//       );

//       if (res.data.logout) {
//         // Auto logout
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         // clear persisted Redux store
//         const { persistor } = await persistor.purge();
//         persistor.purge();
//       }

//       // Update access token
//       localStorage.setItem("accessToken", res.data.data.access_token);

//       // Optionally update refresh token if backend rotates it
//       if (res.data.data.refresh_token) {
//         localStorage.setItem("refreshToken", res.data.data.refresh_token);
//       }

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Token refresh failed"
//       );
//     }
//   }
// );

// // Logout
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) return rejectWithValue("No authentication token found");

//       await api.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/logout`,
//         {},
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       return null;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Logout failed");
//     }
//   }
// );

// // ---Slice---
// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.loading = false;
//         state.error = null;
//       });
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;

import api from "@/api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ---Thunks---

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        userData
      );

      // Store tokens in localStorage
      localStorage.setItem("accessToken", res.data.data.access_token);
      localStorage.setItem("refreshToken", res.data.data.refresh_token);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        userData
      );

      // Store tokens in localStorage
      localStorage.setItem("accessToken", res.data.data.access_token);
      localStorage.setItem("refreshToken", res.data.data.refresh_token);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

/**
 * -------------------------------------------------------------------------
 * NOTE ABOUT EXTRA REDUCERS
 * -------------------------------------------------------------------------
 * We intentionally do NOT handle this action in extraReducers because:
 *
 * 1. The refresh token process does not modify the user's Redux state.
 *    It only updates tokens in localStorage to keep the session alive.
 *
 * 2. This thunk runs silently in the background (usually via an Axios
 *    interceptor) and doesn’t need to trigger any UI loading or error state.
 *
 * 3. If you ever need to track loading/error states or force logout on
 *    refresh failure, you can easily add extraReducers for this action later.
 * -------------------------------------------------------------------------
 */
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");

      const res = await api.post(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
        { refresh_token: refreshToken } // send in body
      );

      if (res.data.logout) {
        // Auto logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        const { persistor } = await import("@/store/store");
        dispatch(authSlice.actions.resetAuth()); // reset slice in memory
        await persistor.flush(); // persist reset state
        await persistor.purge(); // clear persisted storage

        window.location.reload(); // ✅ reloads the whole page
      }

      // Update access token
      localStorage.setItem("accessToken", res.data.data.access_token);

      // Optionally update refresh token if backend rotates it
      if (res.data.data.refresh_token) {
        localStorage.setItem("refreshToken", res.data.data.refresh_token);
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Token refresh failed"
      );
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return rejectWithValue("No authentication token found");

      await api.post(
        `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ---Slice---
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
