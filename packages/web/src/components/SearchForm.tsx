/* eslint-disable react/no-unescaped-entities */
import { Typography, TextField, Button, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function SearchForm() {
  const history = useHistory()

  const [title, setTitle] = useState('')

  const speak = () => {
    const textToSpeak = new SpeechSynthesisUtterance(
      'Me dá uma mamada gostosa aqui, bem delicinha heuheuheueh',
    )
    textToSpeak.lang = 'pt-BR'
    speechSynthesis.speak(textToSpeak)
  }

  useEffect(() => {
    SpeechRecognition.startListening({ language: 'pt-BR', continuous: true })
    setTimeout(speak, 3000)
  }, [])

  const commands = [
    {
      command: 'pesquisar (sobre) (a ) (o ) *',
      callback: (matchTitle: string) => history.push('/materiais', { query: matchTitle }),
    },
    {
      command: 'voltar',
      callback: () => history.goBack(),
    },
  ]

  const { transcript } = useSpeechRecognition({ commands })

  const { input, button, head } = useStyles()

  const onSearch = () => {
    history.push('/materiais', { query: title })
  }

  return (
    <>
      <Typography variant='h3' className={head}>
        Fale "Pesquisar sobre" seguido do título do material que deseja encontrar
      </Typography>
      <button onClick={() => speak()}>Testar</button>
      <TextField
        className={input}
        label='Digite aqui o título do material'
        margin='normal'
        onChange={({ target }) => setTitle(target.value)}
        value={title}
        variant='outlined'
      />
      <Button
        className={button}
        color='secondary'
        onClick={onSearch}
        variant='contained'
      >
        Pesquisar
      </Button>
      <p>{transcript}</p>
    </>
  )
}

const useStyles = makeStyles(() => ({
  head: {
    textAlign: 'center',
  },
  input: {
    margin: '3rem 3rem 1rem 3rem',
    width: '30rem',
  },
  button: {
    width: '30rem',
    height: '3rem',
    fontSize: '1.4rem',
  },
}))
