import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='back__button'>
      <Link to={destination}>
        <BsArrowLeft className='button--back' />
      </Link>
    </div>
  );
};

export default BackButton;