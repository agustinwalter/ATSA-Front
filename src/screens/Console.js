import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import styles from './styles/ConsoleStyles'
import UserRow from '../components/UserRow'
import BusinessCard from '../components/BusinessCard'
import SimpleAppBar from '../components/SimpleAppBar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const Console = () => {
  const c = styles()

  const [users, setUsers] = useState([])
  const [business, setBusiness] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingBusiness, setLoadingBusiness] = useState(true)

  useEffect(() => {
    // Get users.
    firebase
      .firestore()
      .collection('users')
      .where('email', '>', '')
      .get()
      .then(snap => {
        let users = []
        snap.docs.forEach(doc => {
          let user = doc.data()
          user['docId'] = doc.id
          users.push(user)
        })
        users.sort((a, b) => {
          var x = a['createdAt']
          var y = b['createdAt']
          return x > y ? -1 : x > y ? 1 : 0
        })
        setUsers(users)
        setLoadingUsers(false)
      })
    // Get business.
    firebase
      .firestore()
      .collection('business')
      .get()
      .then(snap => {
        let business = []
        snap.docs.forEach(doc => {
          let bs = doc.data()
          bs['docId'] = doc.id
          business.push(bs)
        })
        setBusiness(business)
        setLoadingBusiness(false)
      })
  }, [])

  return (
    <React.Fragment>
      <SimpleAppBar title={'ATSA Administración'} />
      {/* Console */}
      <div className={c.console}>
        {/* Left card */}
        <div className={c.leftArea}>
          <Typography variant='h5' className={c.usersTitle}>
            Usuarios
          </Typography>
          {/* Users table */}
          {loadingUsers ? (
            <div className={c.centerLoading}>
              <CircularProgress size={20} />
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>DNI</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align='right'>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => {
                    return <UserRow key={user.docId} userData={user} />
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        {/* Right card */}
        <div className={c.rightArea}>
          <div className={c.divBusinessTitle}>
            <Typography variant='h5'>Negocios</Typography>
            <Link to='/agregar-negocio' className={c.noUnderline}>
              <Button color='primary'>+ Agregar negocio</Button>
            </Link>
          </div>
          {loadingBusiness ? (
            <div className={c.centerLoading}>
              <CircularProgress size={20} />
            </div>
          ) : (
            business.map(buisiness => {
              return <BusinessCard key={buisiness.docId} business={buisiness} />
            })
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Console
