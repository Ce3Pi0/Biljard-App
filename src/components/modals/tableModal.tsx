import { useState } from "react";
import { 
    IonContent,
    IonHeader,
    IonToolbar,
    IonItem,
    IonLabel,
    IonPage,
    IonButton,
    IonInput,
    IonButtons,
    IonSelect,
    IonSelectOption,
  } from '@ionic/react';
import { UUID } from "uuid-generator-ts";
import { TableElementTemplate } from "../../interfaces/interfaces";


const TableModal = ({
    onDismiss,
  }: {
    onDismiss: (data?: TableElementTemplate | null, role?: string) => void;
  }) => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string|null>('');
    const [price, setPrice] = useState<number>(0);
    const [message, setMessage] = useState<string|null>('');
    
    const tables: string[] = ["darts", "chess", "pool"]

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() =>{
                  if (name === '' || type === ''){
                    setMessage("Fill in all the required fields!")
                  }
                  else if (price <= 0) {
                    setMessage("Price cannot be zero!")
                  }
                  else if (price >= 9999) {
                    setMessage("Price to high!")
                  }
                  else{
                    onDismiss({name, price, type, id : parseInt(UUID.createUUID()) ,user_id: parseInt(window.localStorage.getItem("id")!), start_time: null, end_time: null}, 'confirm')
                  }
                }
              }>Confirm</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Enter table name</IonLabel>
            <IonInput required value={name} placeholder="Name" onIonChange={e => {
                      if (e.detail.value === undefined) return;
                      setName(e.detail.value!)
                  }} clearInput={true}/>
            <IonLabel position="stacked">Enter table price per hour</IonLabel>
            <IonInput type="number" required value={price} placeholder="Price" onIonChange={e => {
                      if (e.detail.value === undefined) return;
                      setPrice(parseInt(e.detail.value!))
                  }} clearInput={true}/>      
            <IonLabel position="stacked">Enter type</IonLabel>
            <IonSelect interface="popover" placeholder='Type' value={type} onIonChange={(e) => setType(e.detail.value)}>
              {tables.map((currentTable: string, index: number) => (<IonSelectOption key={index} value={currentTable}>{currentTable}</IonSelectOption>))}
            </IonSelect>
          </IonItem>
          <p>{message}</p>
        </IonContent>
      </IonPage>
    );
};

export default TableModal;