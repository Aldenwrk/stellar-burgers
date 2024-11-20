import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, updateUserdata } from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthChecked: (
      state: TUserState,
      action: PayloadAction<boolean>
    ): void => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state: TUserState, action: PayloadAction<TUser | null>): void => {
      state.user = action.payload;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUserdata.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { setIsAuthChecked, setUser } = authSlice.actions;
export const { getIsAuthChecked, getUser } = authSlice.selectors;

