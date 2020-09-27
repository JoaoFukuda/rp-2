import React, { TextareaHTMLAttributes } from 'react'

type TextareaProps = {
  name: string
  label: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea({ label, name, ...rest }: TextareaProps) {
  return (
    <div className='textarea-block'>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  )
}
