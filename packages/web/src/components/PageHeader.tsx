import React, { PropsWithChildren } from 'react'

import { Container, makeStyles, Theme, Typography } from '@material-ui/core'

type PageHeaderProps = {
  title: string
  description?: string
}

export default function PageHeader({
  children,
  title,
  description,
}: PropsWithChildren<PageHeaderProps>) {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Typography variant='h5' className={classes.text}>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </Typography>
      {children}
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    maxWidth: 'none',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '-6rem',
  },
  text: {
    marginBottom: '1rem',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}))
