import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  status: "notAuth",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserToken: {
      reducer(state, action) {
        state.userId = action.payload.userId;
        state.status = action.payload.status;
      },
      prepare(userId, status) {
        return {
          payload: {
            userId,
            status,
          },
        };
      },
    },
    userLogout(state) {
      state.status = "notAuth";
      state.userId = "";
    },
  },
});

export const getUserId = (state) => state.user.userId;

export const { getUserToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
