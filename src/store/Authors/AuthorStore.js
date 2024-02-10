import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useAuthorStore = create((set)=>({
    auhtors: [],
    singleAuthor: {},
    data: "",
    getAuthors: async ()=> {
        const response = await axiosClient.get("/author")
        set({authors: [...response?.data]})
    },
    getSingleAuthor: async (id)=> {
        const response = await axiosClient.get(`/author/${id}`)
        set({singleAuthor: {...response?.data}})
        set({data: response?.data?.birthdate.slice(0,10)})
    },
    postAuthor: async(payload)=> {
        const response = await axiosClient.post(`/author`, payload)
    },
    updateAuthor: async(payload)=> {
        const response = await axiosClient.patch(`/author/${payload.id}`, payload)
    },
    deleteAuthor: async(id)=> {
        const response = await axiosClient.delete(`/author/${id}` )
    },
}))
export default useAuthorStore