import React, { useEffect, useState } from 'react'
import SimpleAppBar from '../components/SimpleAppBar'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import styles from './styles/SetBusinessStyles'
import Avatar from '@material-ui/core/Avatar'
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined'
import Button from '@material-ui/core/Button'
import { useParams, useHistory } from 'react-router-dom'
import uuid from 'react-uuid'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const SetBusiness = () => {
  const c = styles()

  const { businessId } = useParams()
  const history = useHistory()

  const title = businessId !== undefined ? 'Editar negocio' : 'Agregar negocio'
  const btnText = businessId !== undefined ? 'Guardar' : 'Agregar'

  const [localImage, setLocalImage] = useState()
  const [localImageExt, setLocalImageExt] = useState()
  const [loading, setLoading] = useState(false)
  const [business, setBusiness] = useState({
    image: '',
    name: '',
    type: '',
    address: '',
    discount: '',
    details: ''
  })

  useEffect(() => {
    if (businessId !== undefined) {
      firebase
        .firestore()
        .doc(`business/${businessId}`)
        .get()
        .then(doc => {
          setBusiness(doc.data())
        })
    }
  }, [businessId])

  const manageImage = input => {
    var reader = new FileReader()
    reader.onload = e => {
      setLocalImage(e.target.result)
    }
    const file = input.target.files[0]
    reader.readAsDataURL(file)
    setLocalImageExt(getImageExt(file.name))
  }

  const getImageExt = name => {
    const lastDot = name.lastIndexOf('.')
    return '.' + name.substring(lastDot + 1)
  }

  const setBusinessDB = async e => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      if (businessId !== undefined) {
        if (localImage !== undefined) {
          // Edit and upload image.
          const imgToDelete = business.image
          await firebase
            .firestore()
            .doc(`business/${businessId}`)
            .update({ ...business, image: '' })
          await uploadImage(businessId)
          await deleteImage(imgToDelete)
        } else {
          // Just edit data.
          await firebase
            .firestore()
            .doc(`business/${businessId}`)
            .update(business)
        }
      } else {
        // Add.
        const doc = await firebase
          .firestore()
          .collection('business')
          .add({ ...business, image: '' })
        // Upload image.
        if (localImage !== undefined) {
          await uploadImage(doc.id)
        }
      }
      setLoading(false)
      history.push('/')
    }
  }

  const uploadImage = async docId => {
    const imageName = uuid() + localImageExt
    const snap = await firebase
      .storage()
      .ref()
      .child(imageName)
      .putString(localImage, 'data_url')
    const downloadURL = await snap.ref.getDownloadURL()
    await firebase.firestore().doc(`business/${docId}`).update({
      image: downloadURL
    })
  }

  const deleteImage = async urlImage => {
    await firebase.storage().refFromURL(urlImage).delete()
  }

  return (
    <React.Fragment>
      <SimpleAppBar title={title} />
      <Paper elevation={1} className={c.formCard}>
        <form onSubmit={setBusinessDB}>
          <input
            accept='.jpg, .jpeg, .png'
            className={c.inputImage}
            id='input-image'
            type='file'
            onChange={manageImage}
          />
          <label htmlFor='input-image'>
            <Avatar
              alt='Foto del negocio'
              className={c.businessImage}
              src={localImage !== undefined ? localImage : business.image}
            >
              <CameraAltOutlinedIcon style={{ fontSize: 100 }} />
            </Avatar>
          </label>
          <TextField
            value={business.name}
            onChange={e => setBusiness({ ...business, name: e.target.value })}
            fullWidth
            label='Nombre del negocio'
            variant='outlined'
          />
          <br></br>
          <br></br>
          <TextField
            value={business.type}
            onChange={e => setBusiness({ ...business, type: e.target.value })}
            fullWidth
            label='Tipo de negocio'
            variant='outlined'
          />
          <br></br>
          <br></br>
          <TextField
            value={business.address}
            onChange={e =>
              setBusiness({ ...business, address: e.target.value })
            }
            fullWidth
            label='Dirección'
            variant='outlined'
          />
          <br></br>
          <br></br>
          <TextField
            value={business.discount}
            onChange={e =>
              setBusiness({ ...business, discount: e.target.value })
            }
            fullWidth
            label='Descuento máximo'
            variant='outlined'
          />
          <br></br>
          <br></br>
          <TextField
            value={business.details}
            onChange={e =>
              setBusiness({ ...business, details: e.target.value })
            }
            fullWidth
            label='Detalles'
            variant='outlined'
            multiline
          />
          <br></br>
          <br></br>
          <Button variant='contained' color='primary' type='submit' fullWidth>
            {loading ? (
              <CircularProgress size={24} style={{ color: 'white' }} />
            ) : (
              btnText
            )}
          </Button>
        </form>
      </Paper>
    </React.Fragment>
  )
}

export default SetBusiness
