import AuthForm from '@/components/AuthForm'
import React from 'react'

const SignIn = () => {
  return (
    <section className='flex justify-center items-center w-1/2 p-10 h-screen max-sm:w-full'>
      <AuthForm type="sign-in"/>
    </section>
  )
}

export default SignIn