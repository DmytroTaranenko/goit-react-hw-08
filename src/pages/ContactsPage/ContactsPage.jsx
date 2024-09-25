import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { selectContacts } from '../../redux/contacts/selectors';
import css from './ContactsPage.module.css';
import toast from 'react-hot-toast';


const ContactsPage = () => {
  const userContacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  console.log('userContacts: ', userContacts);



  useEffect(() => {
    dispatch(fetchContacts()).unwrap().then(() => {
      toast.success("Contact loaded successfully🎉");
    });
;
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      <SearchBox />
      {userContacts.length === 0 ? (
        <p className={css.contactsMessage}>
          Sorry, you don't have any contact yet
        </p>
      ) : (
        <ContactList />
      )}
    </div>
  );
};

export default ContactsPage;
