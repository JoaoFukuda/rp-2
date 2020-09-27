import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#131419',
      paper: '#1C1C24',
    },
    primary: {
      main: '#a178ff',
      contrastText: '#FAFAFC',
    },
    secondary: {
      main: '#00873c',
      contrastText: '#FFFFFF',
    },
    type: 'dark',
  },
  typography: {
    fontFamily: 'Poppins, Archivo, Roboto, sans-serif',
    allVariants: {
      color: '#FAFAFC',
    },
  },
})

export default theme
