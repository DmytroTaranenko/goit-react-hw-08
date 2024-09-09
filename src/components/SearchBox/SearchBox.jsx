import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { changeFilter} from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

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
        placeholder="Enter contact name or number"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
