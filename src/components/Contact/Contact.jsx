import { FaUserLarge, FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";

const Contact = ({ contact, onDeleteContact, onUpdateContact }) => {
  return (
    <li className={css.contactItem}>
      <div className={css.contactWrapper}>
        <div className={css.contactDetails}>
          <FaUserLarge className={css.contactIcon} />
          <p className={css.contactTitle}>{contact.name}</p>
        </div>
        <div className={css.contactDetails}>
          <FaPhone className={css.contactIcon} />
          <p>{contact.number}</p>
        </div>
      </div>

      <button
        onClick={() => onDeleteContact(contact.id)}
        className={css.contactBtn}
        type="button"
      >
        Delete
      </button>
      <button
        onClick={() => onUpdateContact(contact.id)}
        className={css.contactBtnUpdate}
        type="button"
      >
        Update contact
      </button>
    </li>
  );
};

export default Contact;
