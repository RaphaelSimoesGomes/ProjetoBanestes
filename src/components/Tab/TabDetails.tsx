import React, { useState } from "react";
import ClientTab from "./ClientTab/index";
import AgencyTab from "./AgencyTab/index";
import AccountTab from "./AccountTab/index";
import style from "./Tab.module.scss"

export default function TabsDetails({ client }: { client: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState("client");

  return (
    
<div>
  <div className={style["tabs-header"]}>
    <button 
      className={`${style["tab-btn"]} ${activeTab === "client" ? style.active : ""}`}
      onClick={() => setActiveTab("client")}
    >
      Cliente
    </button>
    <button 
      className={`${style["tab-btn"]} ${activeTab === "agency" ? style.active : ""}`}
      onClick={() => setActiveTab("agency")}
    >
      Agência
    </button>
    <button 
      className={`${style["tab-btn"]} ${activeTab === "account" ? style.active : ""}`}
      onClick={() => setActiveTab("account")}
    >
      Conta
    </button>
  </div>
  <div>
    {activeTab === "client" && <ClientTab key={`client-${client.id || client.cpfCnpj}`} client={client} />}
    {activeTab === "agency" && <AgencyTab key={`agency-${client.id || client.cpfCnpj}`} client={client} />}
    {activeTab === "account" && <AccountTab key={`account-${client.id || client.cpfCnpj}`} client={client} />}
  </div>
</div>


  );
}
