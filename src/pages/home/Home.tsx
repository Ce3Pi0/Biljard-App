import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useContext } from 'react';
import { contextInterface, GlobalContext } from '../../context/Context';
import openTableModal from '../../components/modals/openTableModal';
import TableModal from '../../components/modals/tableModal';
import Table from '../../components/home/table';
import useFetch from '../../utils/useFetch';
import './Home.css';

const Home: React.FC = () => {
  
  const { loggedIn } = useContext(GlobalContext) as contextInterface;

  const { data, err, loading } = useFetch(`https://ce3pi0.pythonanywhere.com/tables?user_id=${window.localStorage.getItem("id")}`);
  const [present, dismiss] = useIonModal(TableModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role)});
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tables:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
            { data && loggedIn && <IonList id="center">{JSON.parse(JSON.stringify(data)).tables?.map((table: any) => (<Table key={table.id} name={table.name} price={table.price} type={table.type} start_time={table.start_time} end_time={table.end_time} user_id={table.user_id} id={table.id}/>))}</IonList> }      
            { err && loggedIn && <div>Error</div>}
            { loading && loggedIn && <div>...Loading</div>}
            { loggedIn &&   
            <IonFab slot='fixed' horizontal="end" vertical='bottom'>
              <IonFabButton id="addButton" onClick={() => openTableModal(present)}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
            }
          {!loggedIn && <h2 id="not_logged_in">You are not logged in to an account!</h2>}
          {!loggedIn && <p id="not_logged_in">log in to an account too see its tables</p>}
      </IonContent>
    </IonPage>
  );
};

export default Home;

