import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: JSON.parse(localStorage.getItem("userID")) || 1,
  users: JSON.parse(localStorage.getItem("users")) || [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRecord: (state, { payload }) => {
      state.users.push({ ...payload, id: ++state.userId });
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("userID", JSON.stringify(state.userId));
    },
    clearUserData: (state) => {
      state.users = [];
      localStorage.removeItem("users");
      localStorage.removeItem("userID");
    },
    deleteUserRecord: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUserRecord: (state, { payload }) => {
      const userIndex = state.users.findIndex((user) => user.id === payload.id);
      state.users[userIndex] = payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteMultipleRecords: (state, { payload }) => {
      state.users = state.users.filter((user) => !payload.includes(user.id));
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const {
  setUserRecord,
  clearUserData,
  deleteUserRecord,
  updateUserRecord,
  deleteMultipleRecords,
} = userSlice.actions;

export default userSlice.reducer;
