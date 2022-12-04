import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonTitle } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { contextInterface, GlobalContext } from '../../context/Context';
import { UserChange } from "../../interfaces/interfaces";
import { handleRequest } from "./handleRequest";


const Change: React.FC = () => {

    const {loggedIn} = useContext(GlobalContext) as contextInterface;

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [mistake, setMistake] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const history = useHistory();

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("")

        if (newPassword !== confirmNewPassword){
            setMistake(false);
            setMessage("You didn't confirm the new password correctly")
            return;
        }

        if (newPassword === password){
            setMistake(false);
            setMessage("You can't change to the same password!")
            return;
        }

        const newUser: UserChange = {
            username: window.localStorage.getItem('username')!,
            old_password: password,
            new_password: newPassword
        };
        
        handleRequest(`https://ce3pi0.pythonanywhere.com/users?id=${window.localStorage.getItem("id")}`, "PUT", newUser, setMessage, setMistake, undefined, undefined);
    }

    return (  
        <div id="container">{loggedIn && 
            <form id="form" onSubmit={handleChange}>
                <IonFab>
                    <IonFabButton size={"small"} onClick={() => history.push('/account')}>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonTitle id="title">Change your password</IonTitle>
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setPassword(e.detail.value!)
                }} clearInput={true} value={password} id="password" placeholder="Enter old password" required={true} />
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setNewPassword(e.detail.value!)
                }} clearInput={true} value={newPassword} id="password" placeholder="Enter new password" required={true} />
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setConfirmNewPassword(e.detail.value!)
                }} clearInput={true} value={confirmNewPassword} id="password" placeholder="Confirm new password" required={true} />
                <p id="warning">{!message && !mistake && <br></br>} {message} {mistake && "Incorrect password"}</p>
                <IonButton type="submit" expand="block" id="button">Change</IonButton>
            </form>}
            {!loggedIn && <div>
                <IonFab horizontal="start" vertical="top">
                    <IonFabButton size={"small"} onClick={() => history.push('/account')}>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <h2> You aren't logged in!</h2>
                <IonButton expand="block" onClick={() => history.push('/account')}>Login</IonButton>
            </div>}
        </div>
    );
}
 
export default Change;
