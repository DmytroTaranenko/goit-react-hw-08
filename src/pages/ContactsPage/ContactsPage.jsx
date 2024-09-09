import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { selectContacts } from '../../redux/contacts/selectors';
import css from "./ContactsPage.module.css"



const ContactsPage = () => {
  const userContacts = useSelector(selectContacts);
  console.log('userContacts: ', userContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      <SearchBox />
      {userContacts.length === 0 ? <p className={css.contactsMessage} >Sorry, you don't have any contact yet</p> :       <ContactList />
      }
    </div>
  );
};

export default ContactsPage;
