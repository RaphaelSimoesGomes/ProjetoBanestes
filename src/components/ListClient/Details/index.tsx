import style from "./Details.module.scss";
import TabsDetails from "../../Tab/TabDetails";
import {DetailsProps} from "../../../types/DetailsProps.type";
import { useEffect } from "react";



export default function Details({ detailedEmployee, setDetailedEmployee }: DetailsProps) {
  useEffect(() => {
    if (detailedEmployee) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    return () => document.body.classList.remove("body-no-scroll");
  }, [detailedEmployee]);

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
