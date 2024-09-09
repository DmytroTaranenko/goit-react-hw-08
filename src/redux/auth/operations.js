import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://connections-api.goit.global',
});
const setAuthToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setAuthToken(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        return thunkApi.rejectWithValue('Невірний логін або пароль');
      }
      return thunkApi.rejectWithValue('Сталася помилка. Спробуйте пізніше');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/logout', formData);
      setAuthToken('');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthToken(state.auth.token);
      const { data } = await instance.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      if (state.auth.token) return true;

      return false;
    },
  }
);
