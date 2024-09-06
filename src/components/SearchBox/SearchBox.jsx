import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
const SearchBox = () => {

  const filterValue = useSelector(selectNameFilter);

  const dispatch = useDispatch()

  const onFilterChange = (value) => {
    dispatch(changeFilter(value));
  };

  return (
    <div>
      <p className={css.searchBox}>Find contacts by name</p>
      <input
        className={css.searchBoxInput}
        type="text"
        placeholder="Enter contact name"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
