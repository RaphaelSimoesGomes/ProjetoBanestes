import Box from "../Box";
import EMPLOYEE_LABELS from "../../util/employeeLabels";
import Pagination from "./Pagination";
import style from "./ListClient.module.scss";
import {ListClientProps} from "../../types/ListClientProps.type"
import { useFetchCSV } from "../../hooks/useFetchCSV";
import { SHEETS_URLS } from "../../services/sheetsUrls";
const itemsPerPage = 10;

function ListClient({
  searchTerm,
  currentPage,
  setCurrentPage,
  setDetailedEmployee,
}: ListClientProps) {

  const { data, isLoading, error } = useFetchCSV(SHEETS_URLS.client);

  const filteredData = data.filter((employee) =>
    Object.values(employee).some((value) =>
      value?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const visibleItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={style.listClientCenter}>
      <Box >
        <div>
          {isLoading ? (
            <div className={style.loadingState}>Carregando...</div>
          ) : error ? (
            <div className={style.errorState}>{error}</div>
          ) : filteredData.length === 0 ? (
            <div className={style.emptyState}>Nenhum colaborador entrado.</div>
          ) : (
            <>
              <table className={style.employeeTable}>
                <thead>
                  <tr>
                    <th>{EMPLOYEE_LABELS["id"]}</th>
                    <th>{EMPLOYEE_LABELS["nome"]}</th>
                    <th>{EMPLOYEE_LABELS["email"]}</th>
                    <th>Detalhar</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleItems.map((employee, i) => (
                    <tr key={i}>
                      <td data-label={EMPLOYEE_LABELS["id"]}>{employee.id}</td>
                      <td data-label={EMPLOYEE_LABELS["nome"]}>{employee.nome}</td>
                      <td data-label={EMPLOYEE_LABELS["email"]}>{employee.email}</td>
                      <td data-label="Detalhar">
                        <button
                          className={style.detailsButton}
                          onClick={() => setDetailedEmployee(employee)}
                        >
                          Exibir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
            </>
          )}
        </div>
      </Box>
    </div>
  );
}

export default ListClient;