import { configureStore, combineReducers  } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
// reducer
import authenticationReducer from './authentication/authenticationSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
    'counter' : authenticationReducer,
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store  =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your/action/type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates'],
    },
  }),
})

export const  persistor = persistStore(store)
 
