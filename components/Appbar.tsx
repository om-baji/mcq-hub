'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

const Appbar = () => {
  const { data: session } = useSession()

  const router = useRouter()

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-zinc-300 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-light tracking-widest text-zinc-700 uppercase">
          <Link href={"/home"}>MCQ Hub</Link>
        </h1>
        <div className="flex items-center space-x-6">
          {session ? (
            <>
              <span className="text-sm font-light text-zinc-600">
                Hi, {session.user?.username}
              </span>
              <button 
              onClick={ async () => {
                await signOut();
                toast({
                  title : "Logout successfully!"
                })

                router.push("/sign-up")
              }}
              className="border border-zinc-400 hover:border-zinc-600 px-5 py-2 rounded-lg text-sm font-light text-zinc-700 hover:bg-zinc-200 transition-all duration-300">
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-4">
              <button onClick={() => router.replace("/sign-in")}
              className="border border-zinc-400 hover:border-zinc-600 px-5 py-2 rounded-lg text-sm font-light text-zinc-700 hover:bg-zinc-200 transition-all duration-300">
                Login
              </button>
              <button onClick={() => router.replace("/sign-up")}
              className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-lg text-sm font-light text-white transition-all duration-300">
                Register
              </button>
            </div>
          )}
          {/* <ModeToggle /> */}
        </div>
      </nav>
    </header>
  )
}

export default Appbar
