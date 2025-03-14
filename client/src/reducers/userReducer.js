import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    login(state, action) {
      console.log("Payload: ", action.payload);
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
