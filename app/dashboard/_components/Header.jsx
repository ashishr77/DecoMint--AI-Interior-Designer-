"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { 
  Menu, 
  X, 
  Coins, 
  LayoutDashboard, 
  CreditCard, 
  Sparkles,
  Home
} from 'lucide-react'

function Header() {
    const { userDetail } = useContext(UserDetailContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className='sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo and Title */}
                    <Link href={'/'} className='flex gap-3 items-center flex-shrink-0 group'>
                        <div className='relative'>
                            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300'>
                                <Home className='w-5 h-5 text-white' />
                            </div>
                            {/* <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full animate-pulse'></div> */}
                        </div>
                        <h2 className='font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
                            DecoMint
                        </h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-6'>
                        <Link href={'/dashboard/buy-credits'} className='group'>
                            <Button variant='ghost' className='rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group-hover:scale-105'>
                                <CreditCard className='w-4 h-4 mr-2 text-blue-500' />
                                Buy More Credits
                            </Button>
                        </Link>
                    </div>

                    {/* Desktop Right Side */}
                    <div className='hidden md:flex gap-4 items-center'>
                        {userDetail?.credits && (
                            <div className='flex gap-2 p-2 items-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 px-4 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm'>
                                <div className='w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center'>
                                    <Coins className='w-3 h-3 text-white' />
                                </div>
                                <h2 className='font-semibold text-blue-700 dark:text-blue-300'>{userDetail?.credits}</h2>
                            </div>
                        )}
                        
                        <div className='flex items-center gap-3'>
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 rounded-full ring-2 ring-blue-200 dark:ring-blue-700 hover:ring-blue-300 dark:hover:ring-blue-600 transition-all duration-300"
                                    }
                                }}
                            />
                            <Link href={'/dashboard'}>
                                <Button className='bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                                    <LayoutDashboard className='w-4 h-4 mr-2' />
                                    Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden flex items-center gap-3'>
                        {userDetail?.credits && (
                            <div className='flex gap-2 p-1.5 items-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 px-3 rounded-full border border-blue-200 dark:border-blue-700'>
                                <div className='w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center'>
                                    <Coins className='w-2.5 h-2.5 text-white' />
                                </div>
                                <h2 className='font-semibold text-blue-700 dark:text-blue-300 text-sm'>{userDetail?.credits}</h2>
                            </div>
                        )}
                        
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-blue-200 dark:ring-blue-700"
                                }
                            }}
                        />
                        
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full'
                        >
                            {isMobileMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className='md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md'>
                        <div className='px-4 py-6 space-y-4'>
                            <Link 
                                href={'/dashboard'} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='block'
                            >
                                <Button className='w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-full py-3 shadow-lg'>
                                    <LayoutDashboard className='w-4 h-4 mr-2' />
                                    Dashboard
                                </Button>
                            </Link>
                            
                            <Link 
                                href={'/dashboard/buy-credits'}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className='block'
                            >
                                <Button 
                                    variant='outline' 
                                    className='w-full rounded-full py-3 border-blue-200 dark:border-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300'
                                >
                                    <CreditCard className='w-4 h-4 mr-2 text-blue-500' />
                                    Buy More Credits
                                </Button>
                            </Link>

                            {/* Mobile Credit Display */}
                            {userDetail?.credits && (
                                <div className='flex justify-center'>
                                    <div className='flex gap-3 p-3 items-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 px-6 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm'>
                                        <div className='w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center'>
                                            <Coins className='w-4 h-4 text-white' />
                                        </div>
                                        <div className='text-center'>
                                            <p className='text-xs text-blue-600 dark:text-blue-400 font-medium'>Available Credits</p>
                                            <h2 className='font-bold text-blue-700 dark:text-blue-300 text-lg'>{userDetail?.credits}</h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header