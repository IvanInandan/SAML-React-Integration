import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return null;
    },
  },
});

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/api/whoami", {
      withCredentials: true,
    });

    dispatch(setUser(response.data.user));
  } catch (error) {
    dispatch(setUser(null));
  }
};

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
