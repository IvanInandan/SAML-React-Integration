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

    // If a user exists in the back-end session
    if (response.data.user) {
      dispatch(setUser(response.data.user));
    } else {
      dispatch(logoutUser());
    }
  } catch (error) {
    dispatch(logoutUser());
  }
};

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
