import React, { useEffect, useState } from "react";
import AuthorModal from "../../components/AuthorModal";
import DeleteAuthor from "../../components/DeleteAuthor";
import axiosClient from "../../plugins/axiosClient";
import AuthorCard from "./AuthorCard";
import useAuthorStore from "../../store/Authors/AuthorStore";

const Author = () => {
  const [startDate, setStartDate] = useState(new Date());
 const {authors, getAuthors} = useAuthorStore()
  const [required, setRequired] = useState(false)
  useEffect(() => {
    getAuthors()
  }, []);
  const [authorModal, setAuthorModal] = useState(false);
  const [editAuthor, setEditAuthor] = useState("");
  const [removeAuthor, setRemoveAuthor] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [imagelink, setImageLink] = useState("");
  const toggle = () => {
    setAuthorModal(false);
    setRemoveAuthor("");
    setDeleteModal(false);
    setEditAuthor("")
    setImageLink("")
  };
  const updateAuthor = (item) => {
    setEditAuthor(item);
    setAuthorModal(true)
    setRequired(false)
    setImageLink(item.image)
  };
  const deleteItem = (item) => {
    setRemoveAuthor(item);
    setDeleteModal(true);
  };
 const postAuthor =()=> {
  setRequired(true)
  setAuthorModal(true)
 }
  return (
    <div className="flex">
      <AuthorModal open={authorModal} toggle={toggle} update={editAuthor} required={required} imagelink={imagelink} setImageLink={setImageLink}/>
      <DeleteAuthor
        open={deleteModal}
        toggle={toggle}
        remove={removeAuthor}
      />
      <div className="pr-[10px] w-[100%] flex flex-col items-center">
        <button
          className="self-start px-[20px] py-[10px] bg-purple-600 text-white rounded-xl my-[20px]"
          onClick={postAuthor}
        >
          Add Author
        </button>
        <div className="flex flex-wrap gap-[15px]">
          {authors?.map((item, index) => {
            return (
              <AuthorCard item={item} key={index} updateAuthor={updateAuthor} deleteItem={deleteItem} startDate={startDate} setStartDate={setStartDate}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Author;
