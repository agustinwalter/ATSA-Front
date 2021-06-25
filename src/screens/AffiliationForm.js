import React, { useEffect, useState } from 'react'
import SimpleAppBar from '../components/SimpleAppBar'
import Paper from '@material-ui/core/Paper'
import styles from './styles/AffiliationFormStyles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useHistory } from "react-router-dom";

function AffiliationForm() {
  const c = styles()
  const { formId } = useParams()
  const [form, setForm] = useState({})
  const history = useHistory();

  useEffect(() => {
    if (formId !== undefined) {
      firebase
        .firestore()
        .doc(`forms/${formId}`)
        .get()
        .then(doc => {
          setForm(form => ({ ...form, ...doc.data() }))
        })
      firebase
        .firestore()
        .doc(`users-v2/${formId}`)
        .get()
        .then(doc => {
          setForm(form => ({ ...form, ...doc.data() }))
        })
    }
  }, [formId])

  const affiliateUser = () => {
    firebase.firestore().doc(`users-v2/${formId}`).update({ status: 'AFFILIATED' })
    history.goBack();
  }

  return (
    <>
      <SimpleAppBar title='Formulario de afiliación' />
      <Paper elevation={1} className={c.formCard}>
        <Typography variant='h5'>Datos personales</Typography>
        <Typography variant='subtitle1'> <b>Nombre: </b>{form.name}</Typography>
        <Typography variant='subtitle1'> <b>Apellido: </b>{form.surname}</Typography>
        <Typography variant='subtitle1'> <b>DNI: </b>{form.dni}</Typography>
        <Typography variant='subtitle1'> <b>Email: </b>{form.email}</Typography>
        <Typography variant='subtitle1'> <b>Teléfono: </b>{form.personalPhone}</Typography>
        <Typography variant='subtitle1'> <b>Domicilio: </b>{form.personalAddress}</Typography>
        <Typography variant='subtitle1'> <b>Localidad: </b>{form.personalCity}</Typography>
        <Typography variant='subtitle1'> <b>Fecha de nacimiento: </b>{form.dateOfBirth}</Typography>
        <Typography variant='subtitle1'> <b>Estado civil: </b>{form.civilStatus}</Typography>
        <br />
        <Typography variant='h5'>Datos laborales</Typography>
        <Typography variant='subtitle1'> <b>Establecimiento donde trabaja: </b>{form.work}</Typography>
        <Typography variant='subtitle1'> <b>Profesión: </b>{form.profession}</Typography>
        <Typography variant='subtitle1'> <b>Número de legajo o agente: </b>{form.file}</Typography>
        <Typography variant='subtitle1'> <b>Teléfono: </b>{form.workPhone}</Typography>
        <Typography variant='subtitle1'> <b>Domicilio: </b>{form.workAddress}</Typography>
        <Typography variant='subtitle1'> <b>Localidad: </b>{form.workCity}</Typography>
        <Typography variant='subtitle1'> <b>Mes de ingreso: </b>{form.month}</Typography>
        <br />
        <Button variant='contained' color='primary' onClick={affiliateUser}>Affiliar usuario</Button>
      </Paper>
    </>
  )
}

export default AffiliationForm
