import { useFetchCSV } from "../../../hooks/useFetchCSV";
import { SHEETS_URLS } from "../../../services/sheetsUrls";
import EMPLOYEE_LABELS from "../../../util/employeeLabels";
import { formatEmployeeValue } from "../../../util/employeeFormat";

export default function AgencyTab({ client }: { client: Record<string, string> }) {
  const { data, isLoading, error } = useFetchCSV(SHEETS_URLS.agency);

  if (isLoading) return <div>Carregando agência...</div>;
  if (error) return <div>Erro ao carregar agência.</div>;

  const agency = data.find(
    a => a.id === client.codigoAgencia || a.codigo === client.codigoAgencia
  );

  if (!agency) return <div>Agência não encontrada para este cliente.</div>;

  const filteredEntries = Object.entries(agency).filter(
    ([key, value]) =>
      key &&
      key !== ":" &&
      !/^\d+$/.test(key) &&
      !key.startsWith("_") &&
      String(value).trim() !== ""
  );

  return (
    <table>
      <tbody>
        {filteredEntries.map(([key, value]) => (
          <tr key={key}>
            <th>{EMPLOYEE_LABELS[key] || key}</th>
            <td>{formatEmployeeValue(key, String(value))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
