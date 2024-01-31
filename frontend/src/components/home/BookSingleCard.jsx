import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookModal from './BookModal';
import DefaultImage from '../../images/default.png';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [bookImage, setBookImage] = useState('');

  useEffect(() => {
    let image = '/' + book.image;
    if (image) {
        setBookImage(image);
    }
  });

  return (
    <Link to={`/books/details/${book._id}`} className='book'>
      <div className='book__image'>
        <img src={ bookImage ?? DefaultImage} />
      </div>
      <div className='book__title'>{book.title}</div>
      <div className='book__author'>{book.author}</div>
    </Link>
  );
};

export default BookSingleCard;