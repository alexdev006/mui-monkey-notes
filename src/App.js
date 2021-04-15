import React from "react";
import CreateNote from "./pages/CreateNote";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Layout from "../src/components/Layout";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

//json-server --watch data/db.json --port 8000

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Notes />
            </Route>
            <Route>
              <CreateNote path='/create' />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
