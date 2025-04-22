import style from "./Details.module.scss";
import TabsDetails from "../../Tab/TabDetails";
import {DetailsProps} from "../../../types/DetailsProps.type";

export default function Details({ detailedEmployee, setDetailedEmployee }: DetailsProps) {
  if (!detailedEmployee) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <button
          onClick={() => setDetailedEmployee(null)}
          className={style.btnClose}
          aria-label="Fechar"
        >
          X
        </button>
        <div className={style.modalHeader}>
          <h3>Detalhes do Colaborador</h3>
        </div>
        <div className={style.modalBody}>
          <TabsDetails client={detailedEmployee} />
        </div>
      </div>
    </div>
  );
}
