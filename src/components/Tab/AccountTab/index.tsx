import { useFetchCSV } from "../../../hooks/useFetchCSV";
import { SHEETS_URLS } from "../../../services/sheetsUrls";
import EMPLOYEE_LABELS from "../../../util/employeeLabels";
import { formatEmployeeValue } from "../../../util/employeeFormat";
import style from "./AccountTab.module.scss";
type AccountTabProps = {
  client: Record<string, string>;
  tipo?: "corrente" | "poupanca";
};

export default function AccountTab({ client, tipo }: AccountTabProps) {
  const { data, isLoading, error } = useFetchCSV(SHEETS_URLS.accounts);

  if (isLoading) return <div>Carregando contas...</div>;
  if (error) return <div>Erro ao carregar contas.</div>;

  const clean = (v: string) => v ? v.replace(/\D/g, "") : "";
  const clientDoc = clean(client.cpfCnpj);

  const accounts = data.filter(account => clean(account.cpfCnpjCliente) === clientDoc);

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

  const negativeFields = ["saldo", "limiteAtual", "limiteDisponivel"];

  if (tipo) {
    const conta = accounts.find(acc => acc.tipo?.toLowerCase() === tipo);
    return (
      <div>
        <h4>Conta {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h4>
        {conta ? (
          <table>
            <tbody>
              {filterProperties(conta).map(([key, value]) => (
                <tr key={key}>
                  <th>{EMPLOYEE_LABELS[key] || key}</th>
                  <td className={
                    negativeFields.includes(key) && Number(value) < 0
                      ? style.negative
                      : ""
                  }>
                    {formatEmployeeValue(key, String(value))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Este cliente não possui conta {tipo}.</div>
        )}
      </div>
    );
  }

  const corrente = accounts.find(acc => acc.tipo?.toLowerCase() === "corrente");
  const poupanca = accounts.find(acc => acc.tipo?.toLowerCase() === "poupanca");

  return (
    <div>
      <h4>Conta Corrente</h4>
      {corrente ? (
        <table>
          <tbody>
            {filterProperties(corrente).map(([key, value]) => (
              <tr key={key}>
                <th>{EMPLOYEE_LABELS[key] || key}</th>
                <td className={
                  negativeFields.includes(key) && Number(value) < 0
                    ? style.negative
                    : ""
                }>
                  {formatEmployeeValue(key, String(value))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Este cliente não possui conta corrente.</div>
      )}

      <h4>Conta Poupança</h4>
      {poupanca ? (
        <table>
          <tbody>
            {filterProperties(poupanca).map(([key, value]) => (
              <tr key={key}>
                <th>{EMPLOYEE_LABELS[key] || key}</th>
                <td className={
                  negativeFields.includes(key) && Number(value) < 0
                    ? style.negative
                    : ""
                }>
                  {formatEmployeeValue(key, String(value))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Este cliente não possui conta poupança.</div>
      )}
    </div>
  );
}