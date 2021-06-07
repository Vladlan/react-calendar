import './app.scss';
import { AppContextProvider } from '../app-context-provider/app-context-provider';
import { NotificationsBlock } from '../notifications-block';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CalendarPage } from '../../pages/calendar-page';
import { LoginPage } from '../../pages/login-page';

export function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <NotificationsBlock />
        <Router>
          <Switch>
            <Route exact={true} path="/" component={LoginPage} />
            <Route path="/calendar" component={CalendarPage} />
          </Switch>
        </Router>
      </div>
    </AppContextProvider>
  );
}
