import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCSV } from "../../hooks/useFetchCSV";
import { SHEETS_URLS } from "../../services/sheetsUrls";
import style from "./Login.module.scss"

export default function Login() {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: clients } = useFetchCSV(SHEETS_URLS.client);

  const ADMIN_DOC = "00000000000"; // Substitua pelo CPF/CNPJ do admin (só números)

  function clean(doc: string) {
    return doc.replace(/\D/g, "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const doc = clean(cpfCnpj);

    if (doc === ADMIN_DOC) {
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      navigate("/admin");
      return;
    }

    const client = clients.find((c) => clean(c.cpfCnpj) === doc);
    if (client) {
      localStorage.setItem("user", JSON.stringify({ ...client, role: "client" }));
      navigate("/client");
    } else {
      setError("CPF/CNPJ não encontrado.");
    }
  }

  return (
    <div className={style["login-bg"]}>
      <form className={style["login-box"]} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className={style["form-group"]}>
          <label htmlFor="cpfCnpj">CPF/CNPJ</label>
          <input
            id="cpfCnpj"
            type="text"
            placeholder="Digite seu CPF ou CNPJ"
            value={cpfCnpj}
            onChange={e => setCpfCnpj(e.target.value)}
            className={style["form-control"]}
            autoComplete="off"
            required
          />
        </div>
        {error && <div className={style["error-msg"]}>{error}</div>}
        <button type="submit" className={style["login-button"]}>Entrar</button>
      </form>
    </div>
  );
}
