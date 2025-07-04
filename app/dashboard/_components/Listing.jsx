// "use client"
// import { Button } from '@/components/ui/button';
// import { useUser } from '@clerk/nextjs'
// import React, { useEffect, useState } from 'react'
// import EmptyState from './EmptyState';
// import Link from 'next/link';
// import { db } from '@/config/db';
// import { AiGeneratedImage } from '@/config/schema';
// import { eq } from 'drizzle-orm';
// import InteriorDesignCard from './InteriorDesignCard';

// function Listing() {
//   const { user } = useUser();
//   const [userInteriorList, setUserInteriorList] = useState([]);
//   useEffect(() => {
//     user && GetUserInteriorList();
//   }, [user])

//   const GetUserInteriorList = async() => {
//     const result = await db.select().from(AiGeneratedImage).where(eq(AiGeneratedImage.userEmail,user?.primaryEmailAddress?.emailAddress));
//     setUserInteriorList(result);
    
//   }
//   return (
//     <div>
//       <div className='flex items-center justify-between'>
//         <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
//         <Link href={'/dashboard/create-new'}>
//           <Button>+ Redesign Interior</Button>
//         </Link>
//       </div>
//       {userInteriorList?.length == 0 ? <EmptyState /> : <div className='mt-10'> <h2 className='font-medium text-primary text-xl mb-10'>AI Interior Studio</h2> <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'> {userInteriorList.map((interior, index) => (<InteriorDesignCard key={index} interior={interior}/>))} </div> </div>}
//     </div>
//   )
// }

// export default Listing

"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import EmptyState from './EmptyState';
import Link from 'next/link';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import InteriorDesignCard from './InteriorDesignCard';
import { 
  Plus, 
  Sparkles, 
  Home, 
  Palette, 
  Crown,
  Grid3X3,
  LayoutGrid,
  Star,
  Wand2,
  ArrowRight,
  Calendar,
  Eye
} from 'lucide-react';

function Listing() {
  const { user } = useUser();
  const [userInteriorList, setUserInteriorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user && GetUserInteriorList();
  }, [user])

  const GetUserInteriorList = async() => {
    setIsLoading(true);
    const result = await db.select().from(AiGeneratedImage).where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress));
    setUserInteriorList(result);
    setIsLoading(false);
  }

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Hey ";
    if (hour < 17) return "Hello";
    return "Good Evening";
  }

  const getPersonalizedMessage = () => {
    const designCount = userInteriorList.length;
    if (designCount === 0) return "Ready to transform your space?";
    if (designCount < 5) return "Your design journey is just beginning!";
    if (designCount < 10) return "You're becoming a design pro!";
    return "Design master at work!";
  }

  return (
    <div className='min-h-screen  dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10'>
  
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        {/* Header Section */}
        <div className='mb-12'>
          {/* Welcome Message */}
          <div className='bg-white/80  rounded-3xl p-8 shadow-xl border  mb-8'>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg'>
                    <Home className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                      {getTimeBasedGreeting()}
                    </p>
                    <h1 className='text-3xl md:text-4xl font-bold'>
                      <span className='bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
                        {user?.firstName || 'Designer'}
                      </span>
                     
                    </h1>
                  </div>
                </div>
                
                <p className='text-lg text-gray-600 dark:text-gray-300 mb-4'>
                  {getPersonalizedMessage()}
                </p>
                
                {/* Stats */}
                <div className='flex items-center gap-6 text-sm'>
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center'>
                      <Star className='w-4 h-4 text-white' />
                    </div>
                    <div>
                      <p className='font-bold text-gray-800 dark:text-white'>{userInteriorList.length}</p>
                      <p className='text-gray-600 dark:text-gray-400'>Designs Created</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                      <Wand2 className='w-4 h-4 text-white' />
                    </div>
                    <div>
                      <p className='font-bold text-gray-800 dark:text-white'>AI Powered</p>
                      <p className='text-gray-600 dark:text-gray-400'>Technology</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className='flex flex-col gap-3'>
                <Link href={'/dashboard/create-new'}>
                  <Button className='bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg'>
                    <Plus className='w-5 h-5 mr-2' />
                    Create New Design
                    <ArrowRight className='w-5 h-5 ml-2' />
                  </Button>
                </Link>
                
                <p className='text-xs text-gray-500 dark:text-gray-400 text-center'>
                  Transform any room in seconds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          // Loading State
          <div className='flex items-center justify-center py-20'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse'>
                <Sparkles className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>
                Loading your designs...
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Preparing your creative workspace
              </p>
            </div>
          </div>
        ) : userInteriorList?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className='space-y-8'>
            {/* Gallery Header */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                  <Palette className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
                    Your Design Gallery
                  </h2>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {userInteriorList.length} amazing {userInteriorList.length === 1 ? 'design' : 'designs'} created
                  </p>
                </div>
              </div>
            </div>

            {/* Design Grid */}
            <div className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {userInteriorList.map((interior, index) => (
                  <div key={index} className='group'>
                    <InteriorDesignCard interior={interior} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listing