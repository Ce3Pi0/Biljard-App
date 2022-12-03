import { OverlayEventDetail } from "@ionic/core";
import { UUID } from "uuid-generator-ts";
import { TableElementTemplate } from "../../interfaces/interfaces";
import requestDBChange from "../../utils/requestDBChange";

const openTableModal = (present: any) => {
  present({
    onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
      if (ev.detail.role === 'confirm') {
          const newTable: TableElementTemplate = {
            name: ev.detail.data.name,
            id: parseInt(UUID.createUUID()),
            type: ev.detail.data.type,
            price: ev.detail.data.price,
            user_id: parseInt(window.localStorage.getItem('id')!),
            start_time: null,
            end_time: null
          };
          let myHeaders = new Headers();
  
          myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("session_id")}`);
          myHeaders.append("Content-Type", "application/json");
  
          requestDBChange(`https://ce3pi0.pythonanywhere.com/tables?user_id=${window.localStorage.getItem("id")}`, {method: "POST", headers: myHeaders, body: JSON.stringify(newTable), redirect: undefined, signal: undefined});
        }
    }
  });
}

export default openTableModal;