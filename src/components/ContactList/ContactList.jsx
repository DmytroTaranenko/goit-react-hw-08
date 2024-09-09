import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader/Loader';
import { selectFilteredContacts } from '../../redux/selectors';
import { deleteContact } from '../../redux/contacts/operations';
import {
  selectContactsError,
  selectContactsLoading,
} from '../../redux/contacts/selectors';
const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const loader = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  const dispatch = useDispatch();
  const onDeleteContact = (contactId) => {
    const thunk = deleteContact(contactId);

    dispatch(thunk);
  };

  return (
    <>
      {loader && <Loader />}
      {error && <p>{error}</p>}
      <ul className={css.contactList}>
        {filteredContacts !== undefined &&
          filteredContacts.map((contact) => (
            <Contact
              onDeleteContact={onDeleteContact}
              key={contact.id}
              contact={contact}
            />
          ))}
      </ul>
    </>
  );
};

export default ContactList;
