import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Profile from './components/Profile';
import NewAdmin from './components/NewAdmin';
import History from './components/History';
import NewBlock from './components/NewBlock';
import Editing from './components/Editing';
import Statistics from './components/Statistics';
import Cabinet from './components/Cabinet';
import MakeVideo from './components/MakeVideo';

export default function App() {

  return (
    <BrowserRouter>
      <div className="App" >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/new_admin" component={NewAdmin} />
          <Route exact path="/history" component={History} />
          <Route exact path="/new_block" component={NewBlock} />
          <Route exact path="/editing" component={Editing} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/cabinet" component={Cabinet} />
          <Route exact path="/make_video" component={MakeVideo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
    

       
