import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

function Mood({ selectedMood }) {
    const Moods = [
        { name: 'Happy', image: '/Moods/happy.png' },   
        { name: 'Calm', image: '/Moods/calm.png' },
        { name: 'Sad', image: '/Moods/sad.png' },
        { name: 'Angry', image: '/Moods/angry.png' },
        { name: 'Anxious', image: '/Moods/anxious.png' },
    ]
    const [selectedOption, setSelectedOption] = useState();
    const [api, setApi] = useState()
    useEffect(() => {
        if (!api) return
        const handleSelect = () => {
            const index = api.selectedScrollSnap()
            const selectedName = Moods[index].name
            setSelectedOption(selectedName)
            selectedMood(selectedName)
        }
        handleSelect()
        api.on('select', handleSelect)
        return () => api.off('select', handleSelect)
    }, [api])
    return (
        <div className='mt-5'>
            <label className='text-slate-400 block'>Mood Preference</label>
            <div className='relative flex items-left justify-left'>
                <Carousel className='relative w-[150px]' setApi={setApi}>
                    <CarouselContent className='mt-3'>
                        {Moods.map((mood, index) => (
                            <CarouselItem key={index} className={`flex flex-col items-center justify-center ${selectedOption === mood.name ? '' : ''}`}>
                                <Image src={mood.image} width={50} height={50} className='h-[80px] w-[80px]'/>
                                <p className='text-center mt-2'>{mood.name}</p>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='absolute left-[-5px] z-10 pointer-events-auto top-[50px]'/>
                    <CarouselNext className='absolute right-[-5px] top-[50px]'/>
                </Carousel>
            </div>
        </div>
    )
}

export default Mood