// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import responseSlice from './features/responseSlice';

const store = configureStore({
    reducer: {
        auth: responseSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
