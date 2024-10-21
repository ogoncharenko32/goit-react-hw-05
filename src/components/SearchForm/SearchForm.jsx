import css from './SearchForm.module.css';
import clsx from 'clsx';

const SearchForm = ({ onSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    onSearch(evt.target.elements.query.value);
    evt.target.reset();
  };

  return (
    <div className={clsx(css.wrapper)}>
      <form className={clsx(css.form)} onSubmit={handleSubmit}>
        <input className={clsx(css.input)} name="query" type="text" placeholder="Type to search movie" autoFocus />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
