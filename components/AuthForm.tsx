'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const authformSchema = (type: string) => z.object({
    // sign-up validaiton
    firstName: type === 'sign-in' ? z.string().optional() :  z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() :  z.string().min(3),
    address1: type === 'sign-in' ? z.string().optional() :  z.string().max(50), 
    city: type === 'sign-in' ? z.string().optional() :  z.string().max(15), 
    state: type === 'sign-in' ? z.string().optional() :  z.string().max(2).min(2),
    postalCode: type === 'sign-in' ? z.string().optional() :  z.string().min(5),
    dateOfBirth: type === 'sign-in' ? z.string().optional() :  z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() :  z.string().min(4), 
    // both sign in and sign up validation
    email: z.string().email(),
    password: z.string().min(8),
  })

  
  const AuthForm = ({ type }: { type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

      const formSchema = authformSchema(type);
      
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try{
        console.log(data)
        // Sign up with Appwrite & create plaid token
        if (type === 'sign-up') {
            const userData = {
                firstName: data.firstName!,
                lastName: data.lastName!,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: data.dateOfBirth!,
                ssn: data.ssn!,
                email: data.email,
                password: data.password
            }
            const newUser = await signUp(userData);

            setUser(newUser);
        } else {
            const response = await signIn({
                email: data.email,
                password: data.password,
            })

            if(response) router.push("/")
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='flex cursor-pointer items-center gap-1'>
                <Image 
                    src="/icons/logo.png" 
                    width={34} 
                    height={34} 
                    alt='Leonidas-logo'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Leonidas</h1>   
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user
                        ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Sign In'
                            : 'Sign Up'}
                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    {user 
                        ? 'Link your account to get started'
                        : 'Please enter your details'
                    }
                </p>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                <PlaidLink user={user} variant="primary" />
            </div>
        ) : ( 
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                            <div className='flex gap-4'>
                                <CustomInput
                                    name='firstName'
                                    placeholder='Enter your first name'
                                    label='First Name'
                                    form={form}
                                />
                                <CustomInput
                                    name='lastName'
                                    placeholder='Enter your last name'
                                    label='Last Name'
                                    form={form}
                                />
                            </div>
                                <CustomInput
                                    name='address1'
                                    placeholder='Enter your specific address'
                                    label='Address'
                                    form={form}
                                />
                                <CustomInput
                                    name='city'
                                    placeholder='e.g. New York'
                                    label='City'
                                    form={form}
                                />
                            <div className='flex gap-4'>
                                <CustomInput
                                    name='state'
                                    placeholder='e.g. NY'
                                    label='State'
                                    form={form}
                                />
                                <CustomInput
                                    name='postalCode'
                                    placeholder='e.g. 12345'
                                    label='Postal Code'
                                    form={form}
                                />
                            </div>
                            <div className='flex gap-4'>
                                <CustomInput
                                    name='dateOfBirth'
                                    placeholder='YYYY-MM-DD'
                                    label='Date of Birth'
                                    form={form}
                                />
                                <CustomInput
                                    name='ssn'
                                    placeholder='e.g. 1234'
                                    label='SSN'
                                    form={form}
                                />
                            </div>
                            </>
                        )}
                        <CustomInput
                            name='email'
                            placeholder='Enter your Email'
                            label='Email'
                            form={form}
                        />
                        <CustomInput
                            name='password'
                            placeholder='Enter your password'
                            label='Password'
                            form={form}
                        />
                        <div className='flex flex-col gap-4'>
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className='form-btn'
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20}
                                            className='animate-spin'/> &nbsp; Loading...
                                        </>
                                    ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </Form>

                <footer className='flex justify-center items-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>
                        {type === 'sign-in'
                            ? "Don't have an account?"
                            : 'Already have an account?'}
                    </p> 
                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                        {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                    </Link>               
                </footer>
            </>
        )} 
    </section>
  )
}

export default AuthForm