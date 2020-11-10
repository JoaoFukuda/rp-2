import React, { useState, useEffect } from 'react'
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

export default function SignIn() {
  const { card, cardContent, sectionHeader, cardActions, link, linkText } = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('userId')

    if (user) {
      history.push('/materiais-do-professor')
    }
  }, [history])

  const signin = () => {
    api.post('signin', {
      email,
      password,
    }).then(response => {
      localStorage.setItem('userId', response.data.id)
      alert('Você entrou!')
      history.push('/materiais-do-professor')
    }).catch(() => alert('Erro ao tentar entrar!'))
  }

  return (
    <>
      <PageHeader title='Entre'/>
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
            name='password'
            label='Senha'
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
            variant='outlined'
            margin='normal'
          />
        </CardContent>

        <CardActions className={cardActions}>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            onClick={signin}
          >
              Entrar
          </Button>
          <Typography className={linkText} variant='body1'>
            Não possui uma conta? <Link className={link} to='/cadastrar'>Cadastre-se</Link>
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
