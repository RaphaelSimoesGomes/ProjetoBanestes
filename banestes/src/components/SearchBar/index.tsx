import style from "./SearchBar.module.scss"
interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
  }
  
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
  