import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "./contacts/selectors";
import { selectNameFilter } from "./filters/selectors";


export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter],(contacts,filterValue)=>{
    const filteredContacts = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(filterValue.toLowerCase().trim()) ||
          contact.number.toLowerCase().includes(filterValue.toLowerCase().trim())
      );
      return filteredContacts
})