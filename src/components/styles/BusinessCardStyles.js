import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  businessCard: {
    display: 'flex',
    marginBottom: '12px'
  },
  businessImage: {
    width: '80px',
    height: '80px',
    border: '1px solid #2196f3',
    margin: '12px'
  },
  businessActions: {
    display: 'flex',
    flexDirection: 'column'
  },
  businessInfo: {
    width: '-webkit-fill-available',
    margin: '12px 12px 12px 0px'
  },
  divDiscount: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 12px'
  }
}))
