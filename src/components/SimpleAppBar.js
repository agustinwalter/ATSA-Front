import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const SimpleAppBar = ({ title }) => {
  const _signOut = () => {
    firebase.auth().signOut()
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button color='inherit' onClick={_signOut}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default SimpleAppBar
