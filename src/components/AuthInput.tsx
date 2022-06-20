import React from 'react'

interface AuthInputProps {
  innerRef?: React.LegacyRef<HTMLInputElement> | undefined | null
}

const AuthInput: React.FC<AuthInputProps &
  React.HTMLProps<HTMLInputElement>> = ({ innerRef, children, ...rest }) => {
  return (
    <label className='block'>
      <span className='block text-sm font-medium text-gray-300'>{children}</span>
      <input className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-gray-900 text-sm shadow-sm placeholder-slate-400 mb-4
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-gray-700 invalid:text-gray-800
      focus:invalid:border-gray-700 focus:invalid:ring-gray-700' ref={innerRef} {...rest} />
    </label>
  )
}

export default AuthInput
