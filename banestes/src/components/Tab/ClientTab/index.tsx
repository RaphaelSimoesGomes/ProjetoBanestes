import EMPLOYEE_LABELS from "../../../util/employeeLabels";
import { formatEmployeeValue } from "../../../util/employeeFormat";

export default function ClientTab({ client }: { client: Record<string, string> }) {
  const filteredEntries = Object.entries(client).filter(
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
            <td>{formatEmployeeValue(key, value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
