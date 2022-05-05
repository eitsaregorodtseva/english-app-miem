import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {  PrivateRoute  } from './components/PrivateRoute';
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
import Unauthorized from './components/Unauthorized';

export default function App() {

  return (
    <BrowserRouter>
      <div className="App" >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <PrivateRoute exact path="/menu" component={Menu} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/new_admin" component={NewAdmin} />
          <PrivateRoute exact path="/history" component={History} />
          <PrivateRoute exact path="/new_block" component={NewBlock} />
          <PrivateRoute exact path="/editing" component={Editing} />
          <PrivateRoute exact path="/statistics" component={Statistics} />
          <PrivateRoute exact path="/cabinet" component={Cabinet} />
          <PrivateRoute exact path="/make_video" component={MakeVideo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
    

       
