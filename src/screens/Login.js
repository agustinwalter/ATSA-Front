import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'

const s = {
  background: {
    height: '100vh',
    background: '#efefef',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: '150px',
    height: '150px',
    marginBottom: '40px'
  },
  divLogin: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  loginTitle: { textAlign: 'center' }
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const _signInWithGoogle = async e => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        setShowSnackbar(true)
      }
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <div style={s.background}>
        <Avatar
          alt='Logo de ATSA'
          src='https://atsa-dev-1da6f.web.app/logo512.png'
          style={s.logo}
        />
        <Paper style={s.divLogin} elevation={1}>
          <Typography variant='h5' style={s.loginTitle}>
            ATSA Administración
          </Typography>
          <br />
          <form onSubmit={_signInWithGoogle}>
            <TextField
              label='Email'
              type='email'
              required
              variant='outlined'
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <br />
            <TextField
              label='Contraseña'
              type='password'
              required
              variant='outlined'
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button variant='contained' color='primary' type='submit' fullWidth>
              {loading ? (
                <CircularProgress size={24} style={{ color: 'white' }} />
              ) : (
                'Ingresar'
              )}
            </Button>
          </form>
        </Paper>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message='Algo salió mal, revisá tus datos e intentalo de nuevo.'
      />
    </React.Fragment>
  )
}

export default Login
