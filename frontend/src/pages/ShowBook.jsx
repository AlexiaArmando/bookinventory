import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook';
import DefaultImage from '../images/default.png';
import axiosInstance from '../../axios.js';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = () => {
    setLoading(true);
    axiosInstance
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className='container'>
      <div className='header'>
        <BackButton />
        <div className='action-buttons'>
          <button to={`/books/edit/${book._id}`} className='button--primary' onClick={() => setShowEditModal(true)}>
            Edit
          </button>
          <button to={`/books/delete/${book._id}`} className='button--secondary' onClick={() => setShowDeleteModal(true)}>
            Delete
          </button>
        </div>
      </div>
      {loading ? (
        <Spinner isFull={false} />
      ) : (
        <div className='card show-book'>
          <div className='card-content book__content'>
            <div className='book__image'>
              <img src={'/' + book.image ?? DefaultImage} />
            </div>
            <div>
              <div className='book__title--label'>{book.title}</div>
              <div className='book__content-item'>
                <div className='book__author--label'>Author </div>
                <div>{book.author}</div>
              </div>
              <div className='book__content-item'>
                <div className='book__year--label'>Publish Year </div>
                <div>{book.publishYear}</div>
              </div>
              <div className='book__content-item'>
                <div className='book__description--label'>Description </div>
                <div>{book.description || 'N/A'}</div>
              </div>
            </div>
          </div>
          {showEditModal && (
            <EditBook onClose={() => setShowEditModal(false)} loadBook={() => loadBook()}/>
          )}
          {showDeleteModal && (
            <DeleteBook onClose={() => setShowDeleteModal(false)} loadBook={() => loadBook()}/>
          )}
        </div>
      )}
    </div>
  )
}

export default ShowBook