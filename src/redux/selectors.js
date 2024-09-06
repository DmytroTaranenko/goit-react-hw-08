import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "./contactsSlice";
import { selectNameFilter } from "./filtersSlice";

export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter],(contacts,filterValue)=>{
    const filteredContacts = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(filterValue.toLowerCase().trim()) ||
          contact.number.toLowerCase().includes(filterValue.toLowerCase().trim())
      );
      return filteredContacts
})