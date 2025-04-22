import style from './Pagination.module.scss';
import { PaginationProps } from '../../../types/PaginationProps.type';

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}: PaginationProps) {
  return (
    <div className={style.pagination }>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={style.navButton}
      >
        Voltar
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`${style.pageButton} ${currentPage === i + 1 ? style.active : ''}`}
          disabled={false}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={style.navButton}
      >
        Próximo
      </button>
    </div>
  );
}
