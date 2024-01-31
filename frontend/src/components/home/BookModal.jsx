import { AiOutlineClose } from 'react-icons/ai';
import '../../styles/loader.css';

const BookModal = ({ onClose }) => {
  return (
    <div className='modal' onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className='modal-content'>
        <AiOutlineClose className='' onClick={onClose} />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
        voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
        necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
        nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
        dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
        vitae voluptate sequi repellat!
      </div>
    </div>
  );
};

export default BookModal;