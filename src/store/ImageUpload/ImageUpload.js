import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useImageStore = create((set) => ({
  sendImage: async (payload) => {
    try {
      const response = await axiosClient.post("/files/upload", payload);
      localStorage.setItem("link", response?.data)
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useImageStore;
