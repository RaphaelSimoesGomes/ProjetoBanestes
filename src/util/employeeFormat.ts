export function formatEmployeeValue(key: string, value: string) {
    if ((key === "cpfCnpj"|| key === "cpfCnpjCliente") && value.length === 11) {

      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    if (key === "dataNascimento" && value.match(/^\d{4}-\d{2}-\d{2}/)) {

      const [date] = value.split(" ");
      const [y, m, d] = date.split("-");
      return `${d}/${m}/${y}`;
    }

    if ((key === "rendaAnual" || key === "patrimonio" ||key === "limiteCredito" || key=== "creditoDisponivel" || key=== "saldo") && !isNaN(Number(value))) {

      return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
    }

    return value;

  }
  