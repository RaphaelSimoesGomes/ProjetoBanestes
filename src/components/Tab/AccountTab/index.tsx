import { useFetchCSV } from "../../../hooks/useFetchCSV";
import { SHEETS_URLS } from "../../../services/sheetsUrls";
import EMPLOYEE_LABELS from "../../../util/employeeLabels";
import { formatEmployeeValue } from "../../../util/employeeFormat";

export default function AccountTab({ client }: { client: Record<string, string> }) {
  const { data, isLoading, error } = useFetchCSV(SHEETS_URLS.accounts);

  if (isLoading) return <div>Carregando contas...</div>;
  if (error) return <div>Erro ao carregar contas.</div>;

  const clean = (v: string) => v ? v.replace(/\D/g, "") : "";
  const clientDoc = clean(client.cpfCnpj);

  const accounts = data.filter(account => clean(account.cpfCnpjCliente) === clientDoc);

  const corrente = accounts.find(acc => acc.tipo?.toLowerCase() === "corrente");
  const poupanca = accounts.find(acc => acc.tipo?.toLowerCase() === "poupanca");

  const filterProperties = (obj: Record<string, unknown> | null) => {
    if (!obj) return [];
    return Object.entries(obj).filter(
      ([key, value]) =>
        key &&
        key !== ":" &&
        !/^\d+$/.test(key) &&
        !key.startsWith("_") &&
        String(value).trim() !== ""
    );
  };

  return (
    <div>
      <h4>Conta Corrente</h4>
      {corrente ? (
        <table>
          <tbody>
            {filterProperties(corrente).map(([key, value]) => (
              <tr key={key}>
                <th>{EMPLOYEE_LABELS[key] || key}</th>
                {/* Corrigido: Convertido value para string */}
                <td>{formatEmployeeValue(key, String(value))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>Este cliente não possui conta corrente.</p>
        </div>
      )}
      <br />
      <h4>Conta Poupança</h4>
      {poupanca ? (
        <table>
          <tbody>
            {filterProperties(poupanca).map(([key, value]) => (
              <tr key={key}>
                <th>{EMPLOYEE_LABELS[key] || key}:</th>
                <td>{formatEmployeeValue(key, String(value))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>Este cliente não possui conta poupança.</p>
        </div>
      )}
    </div>
  );
}
