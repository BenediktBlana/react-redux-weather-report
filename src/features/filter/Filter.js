import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDataForCity, filterItems } from './filterSlice'

export const Filter = () => {
    const dispatch = useDispatch()
    const city = useSelector(state => state.filter.city)
    const data = useSelector(state => state.filter.data)
    const status = useSelector(state => state.filter.status)
    const latestData = useSelector(state => filterItems(state.filter.data))

    const cities = ['Horsens', 'Copenhagen', 'Aarhus']

    useEffect(() => {
        if (!city) {
            dispatch(fetchDataForCity('Horsens'))
        }
    }, [city, dispatch])


    const onChangeCity = async (city) => {
        try {
            await dispatch(fetchDataForCity(city));
        } catch (err) {
            console.error('Failed to change the city: ', err)
        }
    }

    return (
        <div>
            <form>
                <label>
                    City: <p>{city}</p>
                    <select defaultValue={city} onChange={(e) => onChangeCity(e.target.value)}>
                        {cities.map(by => <option key={by}>{by}</option>)}
                    </select>
                </label>
            </form>
            <p>{status ? status : 'no status'} </p>
           
            {/* <p>{latestData ? latestData.map(obj => obj['type']) : 'no data'} </p> */}
        </div>
    );
}