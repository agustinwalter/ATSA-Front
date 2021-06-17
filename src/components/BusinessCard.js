import React, { useState } from 'react'
import styles from './styles/BusinessCardStyles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

function BusinessCard({ business }) {
  const c = styles()

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteBusiness = async () => {
    if (!loading) {
      setLoading(true)
      const { docId, image } = business
      await firebase.firestore().doc(`business/${docId}`).delete()
      await firebase.storage().refFromURL(image).delete()
      window.location.reload(false)
    }
  }

  return (
    <React.Fragment>
      <Paper elevation={1} className={c.businessCard}>
        <Avatar
          alt='Foto del negocio'
          src={business.image}
          className={c.businessImage}
        >
          <CameraAltOutlinedIcon style={{ fontSize: 30 }} />
        </Avatar>
        <div className={c.businessInfo}>
          <Typography variant='h6'>{business.name}</Typography>
          <Typography variant='body1'>{business.type}</Typography>
          <Typography variant='body1'>{business.address}</Typography>
        </div>
        <Divider orientation='vertical' flexItem />
        <div className={c.divDiscount}>
          <Typography variant='caption'>Descuento</Typography>
          <Typography variant='h4'>{business.discount}</Typography>
        </div>
        <Divider orientation='vertical' flexItem />
        <div className={c.businessActions}>
          <Link
            to={`/editar-negocio/${business.docId}`}
            className={c.noUnderline}
          >
            <IconButton color='primary' component='span'>
              <EditOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton
            color='secondary'
            component='span'
            onClick={() => setShowDeleteDialog(true)}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
      </Paper>
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>{'Eliminar negocio'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas eliminar este negocio? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)} color='primary'>
            Cancelar
          </Button>
          <Button onClick={deleteBusiness} color='secondary'>
            {loading ? (
              <CircularProgress size={16} color='secondary' />
            ) : (
              'Si, eliminar'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default BusinessCard
