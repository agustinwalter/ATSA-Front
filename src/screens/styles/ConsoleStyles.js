import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  console: {
    display: 'flex',
    padding: theme.spacing(2),
    minHeight: 'calc(100vh - 64px)',
    boxSizing: 'border-box'
  },
  leftArea: {
    width: '50%',
    padding: theme.spacing(1),
    height: 'fit-content',
    marginRight: theme.spacing(2)
  },
  rightArea: {
    width: '50%',
    padding: theme.spacing(1),
    height: 'fit-content'
  },
  divBusinessTitle: {
    display: 'flex',
    margin: '0px 14px 10px',
    justifyContent: 'space-between'
  },
  usersTitle: {
    margin: '0pc 14px 14px'
  },
  noUnderline: {
    textDecoration: 'none'
  },
  centerLoading: {
    textAlign: 'center'
  },
  infoCard: {
    padding: '16px',
    marginBottom: '16px',
    background: 'rgba(255, 229, 100, 0.2)',
    borderLeft: '5px solid #ffe564',
  }
}))
