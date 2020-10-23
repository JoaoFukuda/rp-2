import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Icon,
  TextField,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core'

import PageHeader from '../components/PageHeader'
import api from '@rp-2/axios'

export default function Login() {
  const classes = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateClass = () => {
    // api.post('classes', {
    //   avatar,
    //   bio,
    //   material,
    //   name,
    //   phone,
    //   subject: material,
    // }).then(() => {
    //   alert('Cadastro realizado com sucesso!')
    // }).catch(() => alert('Erro no cadastro!'))

    history.push('/usermaterials')
  }

  return (
    <>
      <PageHeader title='Login'/>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant='h3' className={classes.sectionHeader}>Seus dados</Typography>
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
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            variant='outlined'
            margin='normal'
          />
        </CardContent>

        <CardActions className={classes.cardActions}>
          <div className={classes.actionsContainer}>
            <Icon fontSize='large' color='primary' className={classes.actionsIcon}>report</Icon>
            <div className={classes.actionsText}>
              <Typography color='primary'>
                Importante!
              </Typography>
              <Typography>
                Preencha todos os dados
              </Typography>
            </div>
          </div>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            onClick={handleCreateClass}
          >
              Cadastrar
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionsIcon: {
    marginRight: '1rem',
    alignSelf: 'center',
  },
  actionsText: {
    display: 'flex',
    flexDirection: 'column',
  },
  bio: {
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
    justifyContent: 'space-between',
    paddingRight: '3rem',
    paddingLeft: '3rem',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    marginBottom: '1rem',
  },
}))
