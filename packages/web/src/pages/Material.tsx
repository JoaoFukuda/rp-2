import React, { useEffect, useState } from 'react'
import { Container, makeStyles, Theme } from '@material-ui/core'
import { useRouteMatch } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import api from '@rp-2/axios'
// eslint-disable-next-line
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit'
// eslint-disable-next-line
// @ts-ignore
import FileViewer from 'react-file-viewer'

export default function Material() {
  const { params: { filename } } = useRouteMatch<{ filename: string }>()
  const { container, textContainer } = useStyles()
  const [text, setText] = useState('')
  const [markdown, setMarkdown] = useState('')
  const { speak, voices, speaking } = useSpeechSynthesis()

  useEffect(() => {
    fetch(`http://localhost:8080/${filename}`)
      .then(r => r.text())
      .then(mdText => {
        setMarkdown(mdText)
      })

    api.get(`/material/${filename}`).then(({ data }) => {
      setText(data)
    })
  }, [])

  return (
    <Container >
      <div className={textContainer}>
        {text}
      </div>

    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
  },
  textContainer: {
    color: '#000',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
  },
}))
