import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useAuthStore = create((set) => ({
  status: "",
  signUp: async (payload) => {
    try {
      const response = await axiosClient.post("/auth/signup", payload);
      localStorage.setItem("success", response?.data?.message)
        sessionStorage.setItem("status", response?.status)
      if (response?.data?.tokens?.access_token) {
        localStorage.setItem("token", response?.data?.tokens?.access_token);
      }
      set({status: response?.status})
    } catch (err) {
      console.error(err);
      localStorage.setItem("error", err?.response?.data?.message)
      sessionStorage.setItem("status", err?.response?.status)
    }
  },
  signIn: async (payload) => {
    try {
      const response = await axiosClient.post("/auth/signin", payload);
      localStorage.setItem("success", response?.data?.message)
      console.log(response);
      if (response?.data?.tokens?.access_token) {
        localStorage.setItem("token", response?.data?.tokens?.access_token);
      }
      set({status: response?.status})
      return response
    } catch (err) {
      console.error(err);
      localStorage.setItem("error", err?.response?.data?.message)
    }
  },
}));
export default useAuthStore;
