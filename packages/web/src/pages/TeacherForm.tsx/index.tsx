import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'
import api from '@rp-2/axios'

import PageHeader from '../../components/PageHeader'

export default function TeacherForm() {
  const classes = useStyles()
  const history = useHistory()

  const [avatar, setAvatar] = useState('')
  const [bio, setBio] = useState('')
  const [material, setMaterial] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')

  const handleCreateClass = () => {
    api.post('classes', {
      avatar,
      bio,
      material,
      name,
      phone,
      subject,
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push('/')
    }).catch(error => alert(error.message || 'Erro no cadastro!'))
  }

  return (
    <>
      <PageHeader
        title='Que incrível que você quer cadastrar seu material de aula.'
        description='O primeiro passo é preencher esse formulário de inscrição'
      />

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

          <Typography variant='h3' className={classes.sectionHeader}>Sobre a aula</Typography>
          <Divider />

          <FormControl variant='outlined' margin='normal'>
            <InputLabel>Matéria</InputLabel>
            <Select
              name='subject'
              label='Matéria'
              value={subject}
              onChange={({ target }) => setSubject(target.value as string)}
            >
              <MenuItem value='Artes'>Artes</MenuItem>
              <MenuItem value='História'>História</MenuItem>
              <MenuItem value='Matemática'>Matemática</MenuItem>
              <MenuItem value='Cubo Mágico'>Cubo Mágico</MenuItem>
            </Select>
          </FormControl>
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
            onClick={handleCreateClass}
            color='secondary'
            variant='contained'
            size='large'
          >
              Salvar cadastro
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

const useStyles = makeStyles({
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
    margin: '4rem',
    padding: '2rem',
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
})
