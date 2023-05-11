import {combineReducers, configureStore} from '@reduxjs/toolkit'
import navigateSlice from './reducers/navigate/navigateSlice'


const rootReducer = combineReducers({
    navigate: navigateSlice
})

export const setupStore = () => {
    return configureStore({
        devTools: process.env.REACT_APP_DEBUG === 'true',
        reducer: rootReducer
    })
}