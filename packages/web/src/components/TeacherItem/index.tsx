import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

export type Teacher = {
  avatar: string
  bio: string
  material: string
  name: string
  phone: string
  subject: string
  userId: string
}

type TeacherItemProps = {
  teacher: Teacher
}

export default function TeacherItem({ teacher }: TeacherItemProps) {
  const { avatar, bio, material, name, phone, subject } = teacher

  return (
    <article className='techer-item'>
      <header>
        <img src={avatar} alt='Avatar' />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>
      <p>{bio}</p>

      <footer>
        <p>
          Material
          <strong>{material}</strong>
        </p>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href={`https://wa.me/${phone}`}
        >
          <img src={whatsappIcon} alt='Whatsapp' />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}
