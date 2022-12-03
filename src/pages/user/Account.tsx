import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Account.css';
import Login from '../../components/userAccount/userLogin';
import { useContext } from 'react';
import { contextInterface, GlobalContext } from '../../context/Context'

const Account: React.FC = () => {

  const { loggedIn } = useContext(GlobalContext) as contextInterface;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Login</IonTitle>
          {loggedIn && <IonTitle slot="end">Welcome, {window.localStorage.getItem("username")}!</IonTitle>}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default Account;
