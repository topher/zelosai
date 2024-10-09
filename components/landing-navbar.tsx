'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Custom navigation handler
  const handleNavigation = (href: string) => {
    if (window.location.pathname === '/') {
      document
        .getElementById(href.substring(1))
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/${href}`)
    }
  }

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbar for WebKit browsers */
        ::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }

        /* Optional: Add custom styles for the scrollbar */
        ::-webkit-scrollbar-thumb {
          background-color: rgba(
            255,
            255,
            255,
            0.2
          ); /* Adjust color to blend */
          border-radius: 10px;
          border: 3px solid transparent; /* Makes the thumb narrower */
        }

        /* For Firefox */
        body {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full py-4 px-6 lg:py-6 lg:px-8 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg rounded-b-md shadow-md flex items-center justify-between z-50 transition-all border-b border-white/20',
          font.className
        )}
      >
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10 lg:h-12 lg:w-12 mr-4">
            <Image fill alt="Logo" src="/zlogo.png" />
          </div>
          <h1
            className={cn(
              'text-2xl lg:text-4xl font-bold text-white',
              font.className,
            )}
          >
            Zelos
          </h1>
        </Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="text-white h-8 w-8" />
            ) : (
              <Menu className="text-white h-8 w-8" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <div className={cn('hidden lg:flex lg:space-x-4 lg:items-center')}>
          <Button
            className="px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105"
            onClick={() => handleNavigation('#features')}
          >
            Features
          </Button>
          <Button
            className="px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105 whitespace-nowrap"
            onClick={() => handleNavigation('#process')}
          >
            How It Works
          </Button>
          <Button
            className="px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105 whitespace-nowrap"
            onClick={() => handleNavigation('#testimonials')}
          >
            Testimonials
          </Button>
          <Link href="/pricing">
            <Button className="px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
              Pricing
            </Button>
          </Link>
          <Link href="/blog">
            <Button className="px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
              Blog
            </Button>
          </Link>
          <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
            <Button className="px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl font-semibold text-white bg-transparent border border-indigo-500 rounded-lg transition-transform transform hover:scale-105 hover:border-indigo-700 whitespace-nowrap">
              Log In
            </Button>
          </Link>
          <Link href="/connect-form">
            <Button className="px-4 py-2 lg:px-6 lg:py-3 text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 rounded-lg transition-transform transform hover:scale-105 whitespace-nowrap">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 right-0 w-full bg-darkGray backdrop-blur-lg rounded-b-3xl shadow-md p-6 flex flex-col space-y-4 z-50">
            <Button
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105"
              onClick={() => handleNavigation('#features')}
            >
              Features
            </Button>
            <Button
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105"
              onClick={() => handleNavigation('#process')}
            >
              How It Works
            </Button>
            <Button
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105"
              onClick={() => handleNavigation('#testimonials')}
            >
              Testimonials
            </Button>
            <Link href="/pricing">
              <Button className="w-full px-4 py-2 text-lg font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
                Pricing
              </Button>
            </Link>
            <Link href="/blog">
              <Button className="w-full px-4 py-2 text-lg font-semibold text-white bg-transparent border border-transparent rounded-lg transition-transform transform hover:scale-105">
                Blog
              </Button>
            </Link>
            <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
              <Button className="w-full px-4 py-2 text-lg font-semibold text-white bg-transparent border border-indigo-500 rounded-lg transition-transform transform hover:scale-105 hover:border-indigo-700">
                Log In
              </Button>
            </Link>
            <Link href="/connect-form">
              <Button className="w-full px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 rounded-lg transition-transform transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
