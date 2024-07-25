import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "src/@types/user/userData";
import { RootState } from "../store";


const initialState: any = {
  setUser: {
    message: null,
    isSuccess: true,
    data: {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    errorCode: null,
    error: null,
    errors: null,
  },
  user: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: { setUser: (state, action: PayloadAction<UserData>) => state.setUser = action.payload },
})

export default slice.reducer

export const user = (state: RootState) => state.user.setUser
export const { setUser } = slice.actions