'use client'
import { SessionProvider } from 'next-auth/react'
import React, {ReactNode} from 'react'

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthProvider = ({children}:AuthProviderProps) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider