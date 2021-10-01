import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TitleAppBar from './components/TitleAppBar';
import InputForm from './components/InputForm';
import Stream from './components/Stream';
import Results from './components/Results';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

import './App.css';

function App() 
{
  return (
        <div className='App' style={{height: '100vh'}}>
          <div className='container'>
            <Router>
              <TitleAppBar/>
              <Switch>
                <Route exact path='/' component={InputForm}/>
                <ProtectedRoute exact path='/stream' component={Stream} />
                <ProtectedRoute exact path='/results' component={Results} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>   
        </div>
  );
}

export default App;