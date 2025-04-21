import { useEffect } from "react";
import Papa from "papaparse";
import Box from "../Box";
import Pagination from "./Pagination";
import style from "./ListClient.module.scss";

interface ListClientProps {
  data: Record<string, string>[];
  searchTerm: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setDetailedEmployee: (employee: Record<string, string>) => void;
  setData: (data: Record<string, string>[]) => void;
}

const itemsPerPage = 10;

function ListClient({
  data,
  searchTerm,
  currentPage,
  setCurrentPage,
  setDetailedEmployee,
  setData
}: ListClientProps) {
  useEffect(() => {
    Papa.parse<Record<string, string>>(
      'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes',
      {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      }
    );
  }, [setData]);

  // Filter data based on search term
  const filteredData = data.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const visibleItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Box>
        <div className={style.listClientContainer}>
          <ul className={style.collaboratorList}>
            {visibleItems.map((employee, i) => (
              <li key={i}>
                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <button onClick={() => setDetailedEmployee(employee)}>
                  Details
                </button>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </Box>
    </div>
  );
}

export default ListClient;
