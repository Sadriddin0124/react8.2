import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useGenreStore = create((set)=>({
    genres: [],
    getGenre: async()=> {
        const response = await axiosClient.get("/category/get/all")
        set({genres: [...response?.data]}) 
    },
    postGenre: async(payload)=> {
        const response = await axiosClient.post("/category/create", payload)
    },
    updateGenre: async(payload)=> {
        const response = await axiosClient.patch(`/category/update/${payload.id}`, payload)
    },
    deleteGenre: async(id)=> {
        const response = await axiosClient.delete(`/category/delete/${id}`)
    },
}))

export default useGenreStore