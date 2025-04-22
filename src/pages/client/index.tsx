import { useState, useMemo } from "react";
import style from "./Client.module.scss";
import ClientTab from "../../components/Tab/ClientTab";
import AgencyTab from "../../components/Tab/AgencyTab";
import AccountTab from "../../components/Tab/AccountTab";
import { FaUserCircle } from "react-icons/fa";
import { useFetchCSV } from "../../hooks/useFetchCSV";
import { SHEETS_URLS } from "../../services/sheetsUrls";

export default function ClientPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showPersonal, setShowPersonal] = useState(false);
  const [accountType, setAccountType] = useState<"corrente" | "poupanca">("corrente");
  const { data: contas, isLoading } = useFetchCSV(SHEETS_URLS.accounts);

  const clean = (v: string) => v ? v.replace(/\D/g, "") : "";
  const clientDoc = clean(user.cpfCnpj);

  const contasCliente = useMemo(
    () => contas?.filter((acc: any) => clean(acc.cpfCnpjCliente) === clientDoc) || [],
    [contas, clientDoc]
  );

  const contaCorrente = contasCliente.find((acc: any) => acc.tipo?.toLowerCase() === "corrente");
  const contaPoupanca = contasCliente.find((acc: any) => acc.tipo?.toLowerCase() === "poupanca");
  
  const contaAtual = accountType === "corrente" ? contaCorrente : contaPoupanca;
  const hasPoupanca = contasCliente.some((acc: any) => acc.tipo?.toLowerCase() === "poupanca");

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className={style.bg}>
      <div className={style.topBar}>
        <div className={style.userSummary} onClick={() => setShowPersonal(true)}>
          <FaUserCircle className={style.userIcon} />
          <div>
            <div className={style.userName}>{user.nome}</div>

          </div>
        </div>
        <div className={style.centerWelcome}>
          Bem-vindo, <span className={style.userStrong}>{user.nome}</span>
        </div>
        <div className={style.accountInfoBox}>
          <div>
            <span className={style.infoLabel}>Saldo:</span>
            <span className={contaAtual?.saldo && Number(contaAtual.saldo) < 0 ? style.negative : style.positive}>
              R$ {contaAtual?.saldo ? Number(contaAtual.saldo).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "--"}
            </span>
          </div>
          <div>
          <span className={style.infoLabel}>Limite disponível:</span>
          <span className={
            (contaAtual && contaAtual.limiteDisponivel && Number(contaAtual.limiteDisponivel) < 0)
              ? style.negative
              : style.positive
          }>
            {(() => {
              if (!contaAtual) return "--";
              if (typeof contaAtual.limiteDisponivel === 'undefined') return "--";
              return `R$ ${Number(contaAtual.limiteDisponivel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
            })()}
          </span>
        </div>
          <div>
            <span className={style.infoLabel}>Tipo de conta:</span>
            <span className={style.accountType}>
              {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
            </span>
            <button
              className={style.switchBtn}
              onClick={() => setAccountType(accountType === "corrente" ? "poupanca" : "corrente")}
              disabled={!hasPoupanca}
            >
              Trocar
            </button>
          </div>
        </div>
      </div>

      <div className={style.cardsContainer}>
        <section className={style.card}>
          <h2 className={style.cardTitle}>Agência e Conta</h2>
          <AgencyTab client={user} />
          <AccountTab client={user} tipo={accountType} />
        </section>
      </div>

      {showPersonal && (
        <div className={style.overlay}>
          <div className={style.modal}>
            <button className={style.closeBtn} onClick={() => setShowPersonal(false)}>
              ×
            </button>
            <h2>Dados Pessoais</h2>
            <ClientTab client={user} />
          </div>
        </div>
      )}
    </div>
  );
}
