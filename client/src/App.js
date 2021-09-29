import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TitleAppBar from './components/TitleAppBar';
import InputForm from './components/InputForm';
import Stream from './components/Stream';
import Results from './components/Results';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

function App() 
{
  return (
    <ThemeProvider>
      <CssBaseline style={{height: '100vh'}}>
        <div className='App'>
          <div className='container'>
            <Router>
              <TitleAppBar/>
              <Switch>
                <Route exact path='/' component={InputForm}/>
                <ProtectedRoute exact path='/stream' component={props => <Stream {...props}/>} />
                <ProtectedRoute exact path='/results' component={props => <Results {...props}/>} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>   
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;