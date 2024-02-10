import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useBookStore = create((set)=>({
    books: [],
    singleBook: "",
    getBooks: async ()=> {
        try{
            const response = await axiosClient.get("/book")
            set({books: [...response?.data]})
        }catch(err){
            console.log(err);
        }
    },
    getSingleBook: async(id)=> {
        try{
            const response = await axiosClient.get(`/book/${id}`) 
            set({singleBook: response?.data})
        }catch(err){
            console.log(err);
        }
    },
    postBook: async (payload)=> {
        try{
            const response = await axiosClient.post("/book/create", payload)
        }catch(err){
            console.log(err);
        }
    },
    updateBook: async (payload)=> {
        try{
            const response = await axiosClient.patch(`/book/${payload.id}`, payload)
        }catch(err){
            console.log(err);
        }
    },
    deleteBook: async (id)=> {
        try{
            const response = await axiosClient.delete(`/book/${id}`)
        }catch(err){
            console.log(err);
        }
    },
}))

export default useBookStore