import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const _initialState = {
    city: '',
    dateFrom: 'initial',
    dateTo: 'initial',
    data: [],
    status: 'initial',
    error: ''
}

export const fetchDataForCity = createAsyncThunk('filter/fetchDataForCity', async (city) => {
    const response = await client.get(`http://localhost:8080/data/${city}`);
    return { 'city': city, 'response': response }
})

export const filterSlice = createSlice({
    name: 'filter',
    initialState: _initialState,
    reducers: {
        setCity(state, action) {
            // state.city = action.payload
            console.log('dataLoaded')
        },
    },
    extraReducers: {
        [fetchDataForCity.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchDataForCity.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.city = action.payload.city
            console.log(action.payload.city)
            state.data = state.data.concat(action.payload.response)
        },
        [fetchDataForCity.rejected]: (state, action) => {
            state.status = 'failed'
            console.log('failed')
            state.error = action.error.message
        }
    }
})

export const { setCity } = filterSlice.actions;

export default filterSlice.reducer;

export function filterItems(dataToFilter) {
    var lookup = {};
    var result = [];

    for (var item, i = 0; item = dataToFilter[i++];) {
        var type = item['type'];
        if (!(type in lookup)) {
            lookup[type] = 1;
            result.push(type);
        }
    }

    result.forEach(i => console.log(i))
    console.log(result.length)
    return result.length;
}

