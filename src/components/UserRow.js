import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import firebase from 'firebase/app'
import 'firebase/firestore'
import IconButton from '@material-ui/core/IconButton';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Divider from '@material-ui/core/Divider';
import styles from './styles/UserRowStyles'
import { Link } from 'react-router-dom'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

function UserRow({ userData }) {
  const c = styles()

  const [status, setStatus] = React.useState(userData.status)
  const [tooltip, setTooltip] = React.useState("Copiar dirección de Email")

  const fullName = capitalize(userData.name) + ' ' + capitalize(userData.surname)
  const showAffiliationIcon = userData.hasOwnProperty('affiliation-form')

  const copyEmail = () => {
    navigator.clipboard.writeText(userData.email);
    setTooltip('¡Copiada!');
    setTimeout(() => {
      setTooltip('Copiar dirección de Email');
    }, 1000);
  }

  const changeUserStatus = e => {
    // Local UI update.
    setStatus(e.target.value)
    // Firestore update.
    firebase.firestore().doc(`users-v2/${userData.docId}`).update({ status: e.target.value })
    // If the customer decides to add their credit card details to enable the 
    // Firebase extensions service, the following function must be uncommented.
    // sendEmail()
  }

  // This function sends a notification email to the user every time their 
  // affiliation status is updated.
  // const sendEmail = () => {
  //   let text =
  //     'Tu cuenta se encuentra en etapa de verificación.\n\nRevisaremos si sos afiliado de ATSA Santa Cruz y te notificaremos a la brevedad.'
  //   let html =
  //     'Tu cuenta se encuentra en etapa de <b>verificación</b>.<br></br><br></br>Revisaremos si sos afiliado de ATSA Santa Cruz y te notificaremos a la brevedad.'
  //   switch (e.target.value) {
  //     case 'AFFILIATED':
  //       text =
  //         '¡Ya podés acceder a la app de ATSA Santa Cruz!\n\nRevisamos tus datos y actualmente sos afiliado, ingresá a la app y descubrí todos los descuentos que tenemos para vos.'
  //       html =
  //         '¡Ya podés acceder a la app de ATSA Santa Cruz!<br></br><br></br>Revisamos tus datos y <b>actualmente sos afiliado</b>, ingresá a la app y descubrí todos los descuentos que tenemos para vos.'
  //       break
  //     case 'NOT_AFFILIATED':
  //       text =
  //         'Lamentablemente no sos afiliado de ATSA Santa Cruz.\n\nNo te preocupes, ponete en contacto con un administrador para afiliarte y acceder a todos los beneficios que tenemos para vos.'
  //       html =
  //         'Lamentablemente <b>no sos afiliado</b> de ATSA Santa Cruz.<br></br><br></br>No te preocupes, ponete en contacto con un administrador para afiliarte y acceder a todos los beneficios que tenemos para vos.'
  //       break
  //     case 'BLOCKED':
  //       text =
  //         'Hemos bloqueado tu cuenta temporalmente.\n\nSi creés que se trata de un error, ponete en contacto con un administrador.'
  //       html =
  //         'Hemos <b>bloqueado</b> tu cuenta temporalmente.<br></br><br></br>Si creés que se trata de un error, ponete en contacto con un administrador.'
  //       break
  //     default:
  //       break
  //   }
  //   firebase
  //     .firestore()
  //     .collection('emails')
  //     .add({
  //       // TODO: Update the following line to get the email from the correct place.
  //       to: userData.email,
  //       message: {
  //         subject: 'Actualización de tu estado de cuenta',
  //         text,
  //         html
  //       }
  //     })
  // }

  return (
    <TableRow key={userData.dni} hover>
      <TableCell>{fullName}</TableCell>
      <TableCell>{userData.dni}</TableCell>
      <TableCell>
        <FormControl size='small' variant='outlined'>
          <Select value={status} onChange={changeUserStatus}>
            <MenuItem value={'PENDING_VERIFICATION'}>Verificación pendiente</MenuItem>
            <MenuItem value={'AFFILIATION_FORM_PENDING'}>Afiliación pendiente</MenuItem>
            <MenuItem value={'AFFILIATED'}>Afiliado</MenuItem>
            <MenuItem value={'NOT_AFFILIATED'}>No afiliado</MenuItem>
            <MenuItem value={'BLOCKED'}>Bloqueado</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align='right'>
        <div className={c.divActions}>
          <Tooltip title={tooltip}>
            <IconButton size="small" color="primary" onClick={copyEmail}>
              <MailOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          {showAffiliationIcon &&
            <>
              <Divider orientation="vertical" flexItem className={c.divider} />
              <Link to={`/formulario-de-afiliacion/${userData.docId}`}>
                <Tooltip title="Formulario de afiliación">
                  <IconButton size="small" color="primary">
                    <DescriptionOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </>
          }
        </div>
      </TableCell>
    </TableRow>
  )
}

export default UserRow
