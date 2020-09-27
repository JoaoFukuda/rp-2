import React, { InputHTMLAttributes } from 'react'

type InputProps = {
  name: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className='input-block'>
      <label htmlFor={name}>{label}</label>
      <input type='text' id={name} {...rest} />
    </div>
  )
}
