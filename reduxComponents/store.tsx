
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PatternReducer } from "../reduxComponents/pattern-reducer";

export interface RootState {
    PatternReducer: ReturnType<typeof PatternReducer>
}

const rootReducer = combineReducers({
    PatternReducer
});

const store = configureStore({
    reducer: rootReducer
});


export default store;