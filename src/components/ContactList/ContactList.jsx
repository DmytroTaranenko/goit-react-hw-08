import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Loader from '../Loader/Loader';
import { selectFilteredContacts } from '../../redux/selectors';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import {
  selectContactsError,
  selectContactsLoading,
} from '../../redux/contacts/selectors';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const loader = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  const dispatch = useDispatch();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [deletingContactId, setdeletingContactId] = useState(null);
  const [updatedContactId, setUpdatedContactId] = useState(null);
  const [updatedBodyContact, setUpdatedBodyContact] = useState(null);

  const openDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setdeletingContactId(null);
  };

  const openUpdateModal = () => {
    setIsOpenUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setIsOpenUpdateModal(false);
    setUpdatedBodyContact(null);
  };

  const onDeleteContact = (contactId) => {
    openDeleteModal();
    setdeletingContactId(contactId);
  };

  const onConfirmDelete = () => {
    dispatch(deleteContact(deletingContactId))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted successfully🎉');
        closeDeleteModal();
      });
  };

  const onUpdateContact = (contactId) => {
    openUpdateModal();
    setUpdatedContactId(contactId);
  };

  const onConfirmUpdate = (updatedContactId, updatedBodyContact) => {
    
    dispatch(updateContact({ updatedContactId, updatedBodyContact }))
      .unwrap()
      .then(() => {
        toast.success('Contact update successfully🎉');
        closeUpdateModal();
      });
  };

  const INITIAL_VALUES = {
    name: '',
    number: '',
  };

  const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

  const UpdateValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Too short')
      .max(50, 'Too long'),
    number: Yup.string()
      .matches(phoneRegExp, "Number should to use this format 'xxx-xxx-xxxx'")
      .required('Number is required'),
  });
  
  const handleSubmit = (values, actions) => {
    const updatedContact = {
      name: values.name,
      number: values.number,
    };
    onConfirmUpdate(updatedContactId, updatedContact);

    actions.resetForm();
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
              onUpdateContact={onUpdateContact}
              key={contact.id}
              contact={contact}
            />
          ))}
      </ul>
      <Modal
        isOpen={isOpenDeleteModal}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p>Do you really want to delete contact?</p>
        <button onClick={onConfirmDelete} type="button">
          Yes
        </button>
        <button onClick={closeDeleteModal} type="button">
          Not
        </button>
      </Modal>
      <Modal
        isOpen={isOpenUpdateModal}
        onRequestClose={closeUpdateModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={UpdateValidationSchema}
        >
          <Form className={css.form}>
            <label className={css.label}>
              <span>Name</span>
              <Field
                className={css.formInput}
                type="text"
                name="name"
                placeholder=""
              />
              <ErrorMessage
                className={css.errorText}
                name="name"
                component="span"
              />
            </label>
            <label className={css.label}>
              <span>Number</span>
              <Field
                className={css.formInput}
                type="text"
                name="number"
                placeholder=""
              />
              <ErrorMessage
                className={css.errorText}
                name="number"
                component="span"
              />
            </label>
            <button type="submit">Update contact</button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
export default ContactList;
