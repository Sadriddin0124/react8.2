import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import useGenreStore from "../store/Genre/GenreStore";

const GenreModal = ({ open, toggle, editJanr, required }) => {
  const { postGenre, updateGenre, getGenre } = useGenreStore();
  const addJanr = async(e) => {
    e.preventDefault();
    let payload = {
      name: e.target[0].value ? e.target[0].value : editJanr.name,
    };
    if (editJanr !== "") {
      await updateGenre({...payload, id: editJanr.id})
      getGenre()
      toggle()
    } else {
      await postGenre({...payload})
      getGenre()
      toggle()
    }
  };
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
          <div className="w-[100%] flex flex-col items-center">
            <h1 className="text-[28px] text-center my-[20px]">
              {editJanr ? "Edit Genre" : "Add Genre"}
            </h1>
            <form
              onSubmit={addJanr}
              className="flex flex-col items-center w-[70%]"
            >
              <input
                required={required}
                type="text"
                className="form-control my-[20px]"
                placeholder="Genre"
                defaultValue={editJanr.name}
              />
              <button
                type="submit"
                className="  px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]"
              >
                Save
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GenreModal;
