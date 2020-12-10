import React, { useEffect, useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import { useRouteMatch, useHistory } from 'react-router-dom'
import api from '@rp-2/axios'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function Material() {
  const history = useHistory()
  const { params: { filename } } = useRouteMatch<{ filename: string }>()
  const { container, textContainer } = useStyles()
  const [text, setText] = useState('')

  useEffect(() => {
    SpeechRecognition.startListening({ language: 'pt-BR', continuous: true })
  }, [])

  const commands = [
    {
      command: 'reproduz',
      callback: playTextAudio,
    },
    {
      command: 'reproduza',
      callback: playTextAudio,
    },
    {
      command: 'comece',
      callback: playTextAudio,
    },
    {
      command: 'play',
      callback: playTextAudio,
    },
    {
      command: 'continue',
      callback: playTextAudio,
    },
    {
      command: 'continua',
      callback: playTextAudio,
    },
    {
      command: 'pause',
      callback: pauseTextAudio,
    },
    {
      command: 'pausa',
      callback: pauseTextAudio,
    },
    {
      command: 'pare',
      callback: pauseTextAudio,
    },
    {
      command: 'para',
      callback: pauseTextAudio,
    },
    {
      command: 'espere',
      callback: pauseTextAudio,
    },
    {
      command: 'espera',
      callback: pauseTextAudio,
    },
    {
      command: 'voltar',
      callback: () => history.goBack(),
    },
  ]

  useSpeechRecognition({ commands })

  useEffect(() => {
    api.get(`/material/${filename}`).then(({ data }) => {
      setText(data)
    })
  }, [filename])

  return (
    <Container className={container}>
      <audio controls id='textAudio'>
        <source src={`http://localhost:8080/audios/${filename.replace('.txt', '.wav')}`} type='audio/ogg' />
      </audio>

      <div className={textContainer}>
        {text}
      </div>

    </Container>
  )
}

function playTextAudio() {
  const audio = document.getElementById('textAudio') as HTMLAudioElement

  audio.play()
}

function pauseTextAudio() {
  const audio = document.getElementById('textAudio') as HTMLAudioElement

  audio.pause()
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '2rem',
  },
  textContainer: {
    color: '#000',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
  },
}))
