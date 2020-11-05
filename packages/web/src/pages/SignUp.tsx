import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core'

import PageHeader from '../components/PageHeader'
import api from '@rp-2/axios'
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {
  const history = useHistory()
  const { card, cardContent, sectionHeader, cardActions, lastSectionField, link, linkText } = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('userId')

    if (user) {
      history.push('/materiais-do-professor')
    }
  }, [history])

  const signup = () => {
    api.post('signup', {
      email,
      password,
      name,
      phone,
    }).then(response => {
      localStorage.setItem('userId', response.data.id)
      alert('Cadastro realizado com sucesso!')
    }).catch(() => alert('Erro no cadastro!'))
  }

  return (
    <>
      <PageHeader title='Cadastre-se'/>
      <Card className={card}>
        <CardContent className={cardContent}>
          <Typography variant='h3' className={sectionHeader}>Sua conta</Typography>
          <Divider />
          <TextField
            name='email'
            label='Email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            variant='outlined'
            margin='normal'
          />
          <TextField
            className={lastSectionField}
            name='password'
            label='Senha'
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
            variant='outlined'
            margin='normal'
          />

          <Typography variant='h3' className={sectionHeader}>Seus dados</Typography>
          <Divider />

          <TextField
            name='name'
            label='Nome completo'
            value={name}
            onChange={({ target }) => setName(target.value)}
            variant='outlined'
            margin='normal'
          />
          <TextField
            name='phone'
            label='Celular'
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            variant='outlined'
            margin='normal'
          />
        </CardContent>

        <CardActions className={cardActions}>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            onClick={signup}
          >
              Salvar cadastro
          </Button>
          <Typography className={linkText} variant='body1'>
            Já possui conta? <Link className={link} to='/entrar'>Entre</Link>
          </Typography>
        </CardActions>
      </Card>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  lastSectionField: {
    marginBottom: '2rem',
  },
  card: {
    marginTop: '2rem',
    marginLeft: '6rem',
    marginRight: '6rem',
    marginBottom: '3rem',
    padding: '2rem',
    border: '1px solid',
    borderRadius: '1rem',
    borderColor: theme.palette.primary.dark,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    marginBottom: '1rem',
  },
  linkText: {
    marginTop: '2rem',
  },
  link: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}))
