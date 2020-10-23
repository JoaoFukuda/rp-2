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

import '../styles/material.css'

export default function Material() {
  const classes = useStyles()

  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')

  // const handleCreateClass = () => {
  //   api.post('classes', {
  //     avatar,
  //     bio,
  //     material,
  //     name,
  //     phone,
  //     subject: material,
  //   }).then(() => {
  //     alert('Cadastro realizado com sucesso!')
  //   }).catch(() => alert('Erro no cadastro!'))
  // }

  return (
    <>
      <PageHeader title='Cadastrar/Editar Documento'/>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant='h3' className={classes.sectionHeader}>Dados do Documento</Typography>
          <Divider />
          <TextField
            name='name'
            label='Nome do documento'
            value={name}
            onChange={({ target }) => setName(target.value)}
            variant='outlined'
            margin='normal'
          />
          <TextField
            name='author'
            label='Autor'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            variant='outlined'
            margin='normal'
          />
          <TextField
            name='category'
            label='Categoria'
            value={category}
            onChange={({ target }) => setCategory(target.value)}
            variant='outlined'
            margin='normal'
          />

          <label className='custom-file-upload'>
              <input type='file'/>
              Upload do documento
          </label>
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
            // onClick={handleCreateClass}
          >
              Salvar
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
