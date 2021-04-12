import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TitleAppBar from './components/TitleAppBar';
import InputForm from './components/InputForm';
import Stream from './components/Stream';
import Results from './components/Results';

function App() 
{
  const deleteStorage = () =>
  {
    localStorage.clear();
  }

  return (
    <ThemeProvider>
      <CssBaseline style={{height: '100vh'}}>
        <div className="App">
          <div className="container">
            <Router>
              <TitleAppBar/>
              <Route exact path="/" render={deleteStorage} component={InputForm}/>
              <Route exact path="/stream" component={Stream}/>
              <Route exact path="/results" component={Results} />
            </Router>
          </div>   
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;