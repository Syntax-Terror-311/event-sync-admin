import { Admin, Resource } from 'react-admin';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import RoomIcon from '@mui/icons-material/Room';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

import { authProvider } from './providers/authProvider';
import { dataProvider } from './providers/dataProvider';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { EventList, EventCreate, EventEdit, EventShow } from './pages/Events';
import { SessionList, SessionCreate, SessionEdit, SessionShow } from './pages/Sessions';
import { SpeakerList, SpeakerCreate, SpeakerEdit, SpeakerShow } from './pages/Speakers';
import { RoomList, RoomCreate, RoomEdit, RoomShow } from './pages/Rooms';
import { darkTheme, lightTheme } from './theme';

export default function App() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      title="EventSync Admin"
      loginPage={LoginPage}
      theme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="dark"
    >
      <Resource
        name="events"
        list={EventList}
        show={EventShow}
        create={EventCreate}
        edit={EventEdit}
        icon={EventIcon}
        options={{ label: 'Événements' }}
      />
      <Resource
        name="sessions"
        list={SessionList}
        show={SessionShow}
        create={SessionCreate}
        edit={SessionEdit}
        icon={ViewAgendaIcon}
        options={{ label: 'Sessions' }}
      />
      <Resource
        name="speakers"
        list={SpeakerList}
        show={SpeakerShow}
        create={SpeakerCreate}
        edit={SpeakerEdit}
        icon={PeopleIcon}
        options={{ label: 'Intervenants' }}
      />
      <Resource
        name="rooms"
        list={RoomList}
        show={RoomShow}
        create={RoomCreate}
        edit={RoomEdit}
        icon={RoomIcon}
        options={{ label: 'Salles' }}
      />
    </Admin>
  );
}
