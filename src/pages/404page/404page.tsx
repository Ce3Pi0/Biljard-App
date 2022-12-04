import { IonButton, IonContent } from "@ionic/react";
import React from "react";

const NotFound: React.FC = () => {
    return (  
        <IonContent slot="">
            <div><h1>Ooops, that wasn't suposed to happen :/</h1></div>
            <IonButton onClick={() => window.location.assign("/Biljard-App/home")}>Go back home</IonButton>
        </IonContent>
    );
}
 
export default NotFound;
