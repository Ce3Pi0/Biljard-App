import React, { useContext, useState } from "react";
import { contextInterface, GlobalContext } from "../../context/Context";
import { IonButton, IonTitle, IonInput, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { useHistory } from "react-router";
import { arrowBack } from "ionicons/icons";
import { UserRegister } from "../../interfaces/interfaces";
import { handleRequest } from "./handleRequest";


const Register: React.FC = () => {

    const { loggedIn, setLoggedIn} = useContext(GlobalContext) as contextInterface;
    
    const [email, setEamil] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userExists, setUserExists] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const history = useHistory();

    const logOut = () => {
        window.localStorage.clear();
        setLoggedIn(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.length < 6){
            setMessage("Password too weak!")
            return;
        }

        const newUser: UserRegister = {
            name,
            username,
            password 
        };

        handleRequest("https://ce3pi0.pythonanywhere.com/users/register", "POST", newUser, setMessage, undefined, undefined, setUserExists);
    }

    return (  
        <div id="container">
            {!loggedIn && <form id="form" onSubmit={handleSubmit}>
                <IonFab>
                    <IonFabButton size={"small"} onClick={() =>history.push('/account')}>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonTitle id="title">Create a new account</IonTitle>
                <br />
                <IonInput onIonChange={e => {
                    if(e.detail.value === undefined) return;
                    setName(e.detail.value!);
                }} clearInput={true} value={name} id="username" placeholder="Enter your name" required={true} />
                <br />
                <IonInput onIonChange={e => {
                    if(e.detail.value === undefined) return;
                    setUsername(e.detail.value!);
                }} clearInput={true} value={username} id="username" placeholder="Enter username" required={true} />
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setPassword(e.detail.value!)
                }} clearInput={true} value={password} id="password" placeholder="Enter password" required={true} />
                {userExists && !message && <p id="warning">User already exists!</p>}
                {!userExists && message && <p id="warning">{message}</p>}
                {!userExists && !message && <br />}
                <IonButton type="submit" expand="block" id="button">Create</IonButton>
            </form>}
            {loggedIn && <div>
                <h1>You are already logged in!</h1>
                <IonButton expand="block" onClick={() => logOut()}>Logout</IonButton>
            </div>}
        </div>
    );
}
 
export default Register;
