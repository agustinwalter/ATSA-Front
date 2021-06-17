import React from 'react'
import { AuthContext } from './context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Console from './screens/Console'
import SetBusiness from './screens/SetBusiness'
import NotFound from './screens/NotFound'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Console />
            </Route>
            <Route exact path='/agregar-negocio'>
              <SetBusiness />
            </Route>
            <Route path='/editar-negocio/:businessId'>
              <SetBusiness />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContext>
    </ThemeProvider>
  )
}

export default App
