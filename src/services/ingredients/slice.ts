import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

interface TIngredientsState {
  ingredientsData: TIngredient[];
  dataLoading: boolean;
}

export const initialState: TIngredientsState = {
  ingredientsData: [],
  dataLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsData = action.payload;
        state.dataLoading = false;
      })
      .addCase(getIngredients.pending, (state) => {
        state.dataLoading = true;
      });
  }
});
