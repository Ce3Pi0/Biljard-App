import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, personOutline } from 'ionicons/icons';
import Home from './pages//home/Home';
import Account from './pages/user/Account';
import CreateAccount from './pages/user/CreateAccount';
import ChangeAccount from './pages/user/ChangeAccount';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { GlobalProvider } from './context/Context';
import NotFound from './pages/404page/404page';

setupIonicReact();

const App: React.FC = () => (
  <GlobalProvider>
    <IonApp>
      <IonReactRouter basename='/Biljard-App'>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Route exact path="/account_create">
              <CreateAccount/>
            </Route>
            <Route exact path="/account_change">
              <ChangeAccount />
            </Route>
            <Redirect exact from="/" to="/home" />
            <Route>
              <NotFound />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon icon={personOutline} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </GlobalProvider>
);

export default App;
