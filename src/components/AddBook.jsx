import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../plugins/axiosClient";
import upload from "../assets/upload.jpg"
import useBookStore from "../store/Books/BookStore";
import useImageStore from "../store/ImageUpload/ImageUpload";
const AddBook = ({ open, toggle, edit, imglink, setImgLink, required }) => {
  const [janrlar, setJanrlar] = useState([])
  const [authors, setAuthors] = useState([])
  const {postBook, updateBook, getBooks} = useBookStore()
  const {sendImage } = useImageStore()
  useEffect(()=> {
    axiosClient.get("/category/get/all").then((res)=> {
      setJanrlar(res?.data)
    })
    axiosClient.get("/author").then((res)=> {
      setAuthors(res?.data)
    })
    
  },[])
  const imageUpload = async(e)=> {
    let file = e.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    await sendImage(formData)
    setImgLink(localStorage.getItem("link"))
  }
  const addNewBook =async(e)=> {
    e.preventDefault()
    let payload = {
      name: e.target[1].value? e.target[1].value : edit.name,
      author_id: +e.target[2].value ? +e.target[2].value : edit.author_id,
      price: +e.target[3].value ? +e.target[3].value : edit.price,
      code: e.target[4].value ? e.target[4].value : edit.code,
      janr_id: +e.target[5].value ? +e.target[5].value : edit.janr_id,
      description: e.target[6].value ? e.target[6].value : edit.description,
      image: imglink ? imglink : edit.image
    }
    
    if (edit !== "") {
      await updateBook({id: edit.id, ...payload})
      getBooks()
      toggle()
    }    
    else {
      await postBook({...payload})
      getBooks()
      toggle()
    }
  }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
          <form onSubmit={addNewBook} className="flex flex-wrap justify-end">
            <div className="w-[30%] relative flex items-center">
              <img src={`${imglink === "" ? upload: imglink}`} alt="upload" className="w-[90%] mx-2 object-cover h-[50%] absolute z-0 mix-blend-multiply"/>
              <input required={required} type="file" className="w-[100%] cursor-crosshair h-[100%] z-10 absolute opacity-0"  onChange={imageUpload}/>
            </div>
            <div className="w-[70%]">
              <input required={required}
                type="text"
                className="form-control my-2"
                placeholder="Name"
                defaultValue={edit.name}
              />
              <select className="form-control my-2" defaultValue={edit?.author?.full_name}>
                <option value="" hidden>Author</option>
                {
                  authors.map((item, index)=> <option key={index} value={item.id}>{item.full_name}</option>)
                }
              </select>
              <input required={required}
                type="number"
                className="form-control my-2"
                placeholder="Price"
                defaultValue={edit.price}
              />
              <input required={required}
                type="text"
                className="form-control my-2"
                placeholder="Book code"
                defaultValue={edit.code}
              />
              <select className="form-control my-2"  placeholder="Janr ID" defaultValue={edit?.janr?.name}>
                <option value="" hidden>Genre</option>
                {
                  janrlar.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
                }
                </select>
            </div>
              <textarea
                type="text"
                className="form-control my-2 w-[100%]"
                placeholder="Description"
                rows="5"
                defaultValue={edit.description}
              ></textarea>
                <button type='submit' className='  px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]'>Save</button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddBook;
