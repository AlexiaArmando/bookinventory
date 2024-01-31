import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import axiosInstance from '../../axios.js';

const EditBook = ({ onClose, loadBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/books/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setDescription(response.data.description)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])

  const handleEditBook = () => {
    onClose();
    const data = {
      title,
      author,
      publishYear,
      image,
      description
    };
    setLoading(true);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    axiosInstance
      .post(`/books/${id}`, data, config)
      .then(() => {
        setLoading(false);
        // enqueueSnackbar('Book Created successfully', { variant: 'success' });
        loadBook();
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        // enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='container'>
      {loading ? <Spinner isFull={true} /> : ''}
      <div className='modal' onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()} className='modal-content'>
          <div className='modal__header'>
            <div className='header__title'>Edit Book</div>
            <AiOutlineClose className='button--close' onClick={onClose} />
          </div>
          <div className='form__input'>
            <div className='form__input-title'>
              <label>Title</label>
            </div>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form__input-box'
            />
          </div>
          <div className='form__input'>
            <div className='form__input-title'>
              <label>Author</label>
            </div>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='form__input-box'
            />
          </div>
          <div className='form__input'>
            <div className='form__input-title'>
              <label>Publish Year</label>
            </div>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='form__input-box'
            />
          </div>
          <div className='form__input'>
            <div className='form__input-title'>
              <label>Image</label>
            </div>
            <input
                type='file'
                accept='.png, .jpg, .jpeg'
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
                className='form__input-box'
                
              />
          </div>
          <div className='form__input'>
            <div className='form__input-title'>
              <label>Description</label>
            </div>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='form__input-box'
            />
          </div>
          <button className='button--primary' onClick={handleEditBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBook;