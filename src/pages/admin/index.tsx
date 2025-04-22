import { useState } from "react";
import ListClient from "../../components/ListClient";
import Details from "../../components/ListClient/Details/index";
import SearchBar from "../../components/SearchBar";
import style from "./Admin.module.scss"

function Admin() {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailedEmployee, setDetailedEmployee] = useState<Record<string, string> | null>(null);

  return (
    <div className={style['body-no-scroll']} >
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
      />
      <ListClient
        data={data}
        searchTerm={searchTerm}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setDetailedEmployee={setDetailedEmployee}
        setData={setData}
      />
      <Details
        detailedEmployee={detailedEmployee}
        setDetailedEmployee={setDetailedEmployee}
      />
    </div>
  );
}

export default Admin;
