import React from 'react'
import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import SearchForm from '../components/SearchForm'

export default function TeacherList() {
  const { container, link } = useStyles()

  return (
    <Container className={container}>
      <SearchForm />
      <Typography variant='body1'>
        Deseja adicionar um material? <Link className={link} to='/cadastrar'>Cadastre-se</Link>
      </Typography>
      <Typography variant='body1'>
        Já possui conta? <Link className={link} to='/entrar'>Entre</Link>
      </Typography>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
    maxWidth: 'none',
    height: '100vh',
  },
  link: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}))
