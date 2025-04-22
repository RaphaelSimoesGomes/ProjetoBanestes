import style from "./SearchBar.module.scss"
import { SearchBarProps } from "../../types/SearchBarProps.type";
  export default function SearchBar({
    searchTerm,
    setSearchTerm,
    setCurrentPage
  }: SearchBarProps) {
    return (
      <div>
        <input
          type="text"
          placeholder="Procurar pelo colaborador..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className={style.SearchBar}
        />
      </div>
    );
  }
  