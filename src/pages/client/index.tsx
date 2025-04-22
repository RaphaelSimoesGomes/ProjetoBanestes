import style from "./Client.module.scss";
import TabsDetails from "../../components/Tab/TabDetails";

export default function ClientPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return null;
  return (
    <div className={style["client-bg"]}>
      <div className={style["client-box"]}>
        <h2>Área do Cliente</h2>
        <TabsDetails client={user} />
      </div>
    </div>
  );
}
