import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth-api";
import userReducer from "./features/user-slice";
import { userApi } from "./api/user-api";
import { resumeApi } from "./api/resume-api";
import { aiApi } from "./api/ai-api";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      resumeApi.middleware,
      aiApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;