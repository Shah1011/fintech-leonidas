import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const SignUp = async () => {
  const loggedInUser = await getLoggedInUser();
  console.log(loggedInUser);

  return (
    <section className='flex justify-center items-center w-1/2 p-10 max-sm:w-full'>
      <AuthForm type="sign-up"/>
    </section>
  )
}

export default SignUp