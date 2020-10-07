import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

import Routes from './Routes'
import theme from './assets/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}
