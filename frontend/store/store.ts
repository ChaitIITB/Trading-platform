import { configureStore } from '@reduxjs/toolkit'

// Minimal store — prepared for expansion (filters, user settings)
export const store = configureStore({
  reducer: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
