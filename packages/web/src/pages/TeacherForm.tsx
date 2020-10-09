import React, { useState } from 'react'
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

export default function TeacherForm() {
  const classes = useStyles()

  const [avatar, setAvatar] = useState('')
  const [bio, setBio] = useState('')
  const [material, setMaterial] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleCreateClass = () => {
    api.post('classes', {
      avatar,
      bio,
      material,
      name,
      phone,
      subject: material,
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
    }).catch(() => alert('Erro no cadastro!'))
  }

  return (
    <>
      <PageHeader title='Cadastrar materiais de aula'/>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant='h3' className={classes.sectionHeader}>Seus dados</Typography>
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
            name='avatar'
            label='Avatar'
            value={avatar}
            onChange={({ target }) => setAvatar(target.value)}
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
          <TextField
            className={classes.bio}
            multiline
            name='bio'
            label='Biografia'
            value={bio}
            onChange={({ target }) => setBio(target.value)}
            variant='outlined'
            margin='normal'
          />

          <Typography variant='h3' className={classes.sectionHeader}>Material</Typography>
          <Divider />

          <TextField
            name='material'
            label='Material de aula'
            value={material}
            onChange={({ target }) => setMaterial(target.value)}
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
              Salvar cadastro
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
