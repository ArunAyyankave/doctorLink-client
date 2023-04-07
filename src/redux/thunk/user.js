import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const signinThunk = createAsyncThunk(
  'user/signin',
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/signin", userData)
      return data;
    } catch (error) {
      console.log(error?.response?.data);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)       