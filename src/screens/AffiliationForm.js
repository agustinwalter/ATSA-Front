import React from 'react'
import SimpleAppBar from '../components/SimpleAppBar'
import Paper from '@material-ui/core/Paper'
import styles from './styles/AffiliationFormStyles'

function AffiliationForm() {
  const c = styles()

  return (
    <>
      <SimpleAppBar title='Formulario de afiliación' />
      <Paper elevation={1} className={c.formCard}>
        <h2>ok</h2>
      </Paper>
    </>
  )
}

export default AffiliationForm
