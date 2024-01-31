import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import BookModal from '../components/home/BookModal';
import CreateBook from './CreateBook';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    loadBooks(1);
  }, []);

  const loadBooks = (page) => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books?page=' + page)
      .then((response) => {
        setBooks(response.data.data);
        setCurrentPage(response.data.currentPage);
        setPreviousPage(response.data.previousPage);
        setHasPreviousPage(response.data.hasPreviousPage);
        setNextPage(response.data.nextPage);
        setHasNextPage(response.data.hasNextPage);
        setLastPage(response.data.lastPage);
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
        <div className='header__title'>Books List</div>
        <button to='/books/create' className='button--primary' onClick={() => setShowModal(true)}>
          Add Book
        </button>
      </div>
      {loading ? (
        <Spinner isFull={false}/>
      ) : (
        <div>
          <BooksCard books={books} />
          <div className='pagination'>
            {(currentPage !== 1 && previousPage !== 1) &&
              (<a onClick={() => loadBooks(1)}>1</a>)
            }
            {(hasPreviousPage) &&
              (<a onClick={() => loadBooks(previousPage)}>{previousPage}</a>)
            }
            <a onClick={() => loadBooks(currentPage)} className="active">{currentPage}</a>
            {(hasNextPage) &&
              (<a onClick={() => loadBooks(nextPage)}>{nextPage}</a>)
            }
            {(lastPage !== currentPage && nextPage !== lastPage) &&
              (<a onClick={() => loadBooks(lastPage)}>{lastPage}</a>)
            }
          </div>
        </div>
      )}
      {showModal && (
        <CreateBook onClose={() => setShowModal(false)} loadBooks={() => loadBooks()}/>
      )}
    </div>
  )
}

export default Home;