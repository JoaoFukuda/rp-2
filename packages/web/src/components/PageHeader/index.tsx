import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../Logo'
import backIcon from '../../assets/images/icons/back.svg'

type PageHeaderProps = {
  title: string
  description?: string
}

export default function PageHeader({
  children,
  title,
  description,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <header className='page-header'>
      <div className='top-bar-container'>
        <Link to='/'>
          <img src={backIcon} alt='Voltar' />
        </Link>
        <Logo />
      </div>

      <div className='header-content'>
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  )
}
