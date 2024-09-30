import { useDispatch } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="filter">filter</label>
      <input
        id="filter"
        type="text"
        name="filter"
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};

export default Filter;
