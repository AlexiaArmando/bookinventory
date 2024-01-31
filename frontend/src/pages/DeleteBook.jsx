import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import axiosInstance from '../../axios.js';

const DeleteBook = ({ onClose, loadBook }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axiosInstance
      .delete(`/books/${id}`)
      .then(() => {
        setLoading(false);
        // enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='container'>
      {loading ? <Spinner isFull={true} /> : ''}
      <div className='modal' onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()} className='modal-content'>
          <div className='modal__header'>
            <div className='header__title'>Delete Book</div>
            <AiOutlineClose className='button--close' onClick={onClose} />
          </div>
          <div>
            <p>Are You Sure You want to delete this book?</p>
            <button className='button--primary' onClick={handleDeleteBook}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook;