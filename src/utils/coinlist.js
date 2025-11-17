import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Your API Key
const API_KEY = 'CG-ED9uB8eZrVZD2yLBfmLZu2YH';


export const fetchCoinList = createAsyncThunk(
  'coins/fetchCoinList',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch coins');
      }

      const data = await response.json();
      return data; // This will be action.payload in extraReducers
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  coins: [],
  loading: false,
  error: null,
};

const coinListSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinList.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoinList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch coin list';
      });
  },
});

export default coinListSlice.reducer;
