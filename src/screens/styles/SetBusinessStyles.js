import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  formCard: {
    width: '600px',
    position: 'relative',
    margin: '130px auto 30px',
    padding: '130px 30px 30px'
  },
  businessImage: {
    margin: 'auto',
    position: 'absolute',
    top: '-100px',
    width: '200px',
    height: '200px',
    zIndex: '10',
    left: '0',
    right: '0',
    cursor: 'pointer',
    transition: '.2s',
    border: '1px solid #2196f3',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
    }
  },
  inputImage: {
    display: 'none'
  }
}))
