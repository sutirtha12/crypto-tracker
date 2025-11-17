import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMarketChart = createAsyncThunk(
  'marketChart/fetchMarketChart',
  async (coinId, thunkAPI) => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch market chart');
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const marketChartSlice = createSlice({
  name: 'marketChart',
  initialState: {
    chartData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      })
      .addCase(fetchMarketChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching market chart';
      });
  },
});

export default marketChartSlice.reducer;
