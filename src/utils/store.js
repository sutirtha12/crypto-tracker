import { configureStore } from '@reduxjs/toolkit';
import coinListReducer from './coinlist';
import marketChartReducer from './marketchartslice';

const store = configureStore({
  reducer: {
    coins: coinListReducer,
    marketChart: marketChartReducer,
  },
});

export default store;
