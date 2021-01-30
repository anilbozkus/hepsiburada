
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import List from './pages/list.js';
import Add from './pages/add.js';
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/add" component={Add} />
          <Route path="/" component={List} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
