import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import axiosClient from "../plugins/axiosClient";
import upload from "../assets/upload.jpg";
import useAuthorStore from "../store/Authors/AuthorStore";
import useImageStore from "../store/ImageUpload/ImageUpload";

const AuthorModal = ({ open, toggle, update, required, imagelink, setImageLink }) => {
  const { postAuthor, getAuthors, updateAuthor } = useAuthorStore();
  const { sendImage } = useImageStore();
  const imgUpload = async (e) => {
    let image = e.target.files[0];
    const imgData = new FormData();
    imgData.append("file", image);
    await sendImage(imgData);
    setImageLink(localStorage.getItem("link"));
  };
  const addAuthor = async (e) => {
    e.preventDefault();

    let payload = {
      full_name: e.target[1].value ? e.target[1].value : update.full_name,
      birthdate: e.target[2].value ? e.target[2].value : update.birthdate,
      country: e.target[3].value ? e.target[3].value : update.country,
      image: imagelink ? imagelink : update.image,
    };
    if (update !== "") {
      await updateAuthor({ ...payload, id: update.id });
      getAuthors();
      toggle();
    } else {
      await postAuthor({ ...payload });
      getAuthors();
      toggle();
    }
  };
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
          <form onSubmit={addAuthor} className="flex flex-wrap justify-end">
            <div className="w-[40%] relative">
              <input
                type="file"
                className="absolute w-[100%] h-[100%] opacity-0 z-20 cursor-crosshair"
                onChange={imgUpload}
                required={required}
              />
              <img
                className="w-[100%] absolute top-0 h-[100%] object-contain p-[10px]"
                src={`${imagelink ? imagelink : upload}`}
                alt="author"
              />
            </div>
            <div className="w-[60%]">
              <input
                type="text"
                className="form-control my-2"
                placeholder="Fullname"
                defaultValue={update.full_name}
                required={required}
              />
              <input
                type="date"
                className="form-control my-2"
                placeholder="Birthdate"
                defaultValue={update.birthdate}
                required={required}
              />
              <input
                type="text"
                className="form-control my-2"
                placeholder="Country"
                defaultValue={update.country}
                required={required}
              />
            </div>
            <button
              type="submit"
              className="  px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]"
            >
              Save
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AuthorModal;
