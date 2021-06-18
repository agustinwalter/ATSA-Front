import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import firebase from 'firebase/app'
import 'firebase/firestore'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

function UserRow({ userData }) {
  const [status, setStatus] = React.useState(userData.status)
  const fullName = capitalize(userData.name) + ' ' + capitalize(userData.surname)

  const changeUserStatus = e => {
    // Local UI update.
    setStatus(e.target.value)
    // Firestore update.
    firebase
      .firestore()
      .doc(`users/${userData.docId}`)
      .update({ status: e.target.value })
    // Send email.
    let text =
      'Tu cuenta se encuentra en etapa de verificación.\n\nRevisaremos si sos afiliado de ATSA Santa Cruz y te notificaremos a la brevedad.'
    let html =
      'Tu cuenta se encuentra en etapa de <b>verificación</b>.<br></br><br></br>Revisaremos si sos afiliado de ATSA Santa Cruz y te notificaremos a la brevedad.'
    switch (e.target.value) {
      case 'Afiliado':
        text =
          '¡Ya podés acceder a la app de ATSA Santa Cruz!\n\nRevisamos tus datos y actualmente sos afiliado, ingresá a la app y descubrí todos los descuentos que tenemos para vos.'
        html =
          '¡Ya podés acceder a la app de ATSA Santa Cruz!<br></br><br></br>Revisamos tus datos y <b>actualmente sos afiliado</b>, ingresá a la app y descubrí todos los descuentos que tenemos para vos.'
        break
      case 'No afiliado':
        text =
          'Lamentablemente no sos afiliado de ATSA Santa Cruz.\n\nNo te preocupes, ponete en contacto con un administrador para afiliarte y acceder a todos los beneficios que tenemos para vos.'
        html =
          'Lamentablemente <b>no sos afiliado</b> de ATSA Santa Cruz.<br></br><br></br>No te preocupes, ponete en contacto con un administrador para afiliarte y acceder a todos los beneficios que tenemos para vos.'
        break
      case 'Bloqueado':
        text =
          'Hemos bloqueado tu cuenta temporalmente.\n\nSi creés que se trata de un error, ponete en contacto con un administrador.'
        html =
          'Hemos <b>bloqueado</b> tu cuenta temporalmente.<br></br><br></br>Si creés que se trata de un error, ponete en contacto con un administrador.'
        break
      default:
        break
    }
    firebase
      .firestore()
      .collection('emails')
      .add({
        to: userData.email,
        message: {
          subject: 'Actualización de tu estado de cuenta',
          text,
          html
        }
      })
  }

  return (
    <TableRow key={userData.dni} hover>
      <TableCell>{fullName}</TableCell>
      <TableCell align='right'>
        <FormControl size='small' variant='outlined'>
          <Select value={status} onChange={changeUserStatus}>
            <MenuItem value={'Verificación pendiente'}>
              Verificación pendiente
            </MenuItem>
            <MenuItem value={'Afiliado'}>Afiliado</MenuItem>
            <MenuItem value={'No afiliado'}>No afiliado</MenuItem>
            <MenuItem value={'Bloqueado'}>Bloqueado</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  )
}

export default UserRow
