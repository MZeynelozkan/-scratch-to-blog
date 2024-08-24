import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserToken(state, action) {
      state.userId = action.payload;
    },
  },
});

export const getUserId = (state) => state.user.userId;

export const { getUserToken } = userSlice.actions;

export default userSlice.reducer;
