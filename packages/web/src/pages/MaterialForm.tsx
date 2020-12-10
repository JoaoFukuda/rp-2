import React, { useEffect, useState } from 'react'
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
import { DropzoneArea } from 'material-ui-dropzone'
import { useHistory, useLocation } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import api from '@rp-2/axios'
import { Material } from '../types'
import { AxiosResponse } from 'axios'

type MaterialFormState = {
  materialId?: string
}

export default function MaterialForm() {
  const { state } = useLocation<MaterialFormState>()
  const classes = useStyles()
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [file, setFile] = useState<File>()

  const materialId = state?.materialId

  useEffect(() => {
    if (materialId) {
      api.get(`material/${materialId}`).then(({ data }: AxiosResponse<Material>) => {
        const { author, subject, title } = data

        setTitle(title)
        setAuthor(author)
        setSubject(subject)
      }).catch(error => alert(error))
    }
  }, [materialId])

  const addMaterial = () => {
    const userId = localStorage.getItem('userId')

    if (!userId || !file) return

    const data = new FormData()

    data.append('file', file)
    data.append('title', title)
    data.append('author', author)
    data.append('subject', subject)
    data.append('userId', userId)

    api.post('materials', data).then(() => {
      history.push('/materiais-do-professor')
    }).catch(() => alert('Erro ao adicionar material!'))
  }

  const updateMaterial = () => {
    const userId = localStorage.getItem('userId')

    if (!userId || !materialId) return

    const data = new FormData()

    if (file) {
      data.append('file', file)
    }

    data.append('title', title)
    data.append('author', author)
    data.append('subject', subject)
    data.append('id', materialId)

    api.put('materials', data).then(() => {
      history.push('/materiais-do-professor')
    }).catch(() => alert('Erro ao adicionar material!'))
  }

  return (
    <>
      <PageHeader title={materialId ? 'Atualizar material' : 'Cadastrar material'}/>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant='h3' className={classes.sectionHeader}>Dados do material</Typography>
          <Divider />
          <TextField
            name='title'
            label='Título'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
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
            className={classes.marginBottom}
            name='subject'
            label='Categoria'
            value={subject}
            onChange={({ target }) => setSubject(target.value)}
            variant='outlined'
            margin='normal'
          />

          <Typography variant='h3' className={classes.sectionHeader}>Upload do material</Typography>
          <Divider className={classes.marginBottom} />
          <DropzoneArea
            dropzoneText='Arraste um arquivo ou clique aqui para fazer o upload'
            onChange={files => setFile(files[0])}
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
                Cuidado com erros de digitação
              </Typography>
            </div>
          </div>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            onClick={materialId ? updateMaterial : addMaterial}
          >
            {materialId ? 'Atualizar material' : 'Cadastrar material'}
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
  marginBottom: {
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
