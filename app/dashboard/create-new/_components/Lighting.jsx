import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

function Lighting({ selectedLighting }) {
    const Lightings = [
        { name: 'No Preference', image: '/Lighting/none.png' },
        { name: 'Bright & Natural', image: '/Lighting/brights.jpg' },
        { name: 'Warm & Cozy', image: '/Lighting/warm.jpg' },
        { name: 'Dramatic & Focused', image: '/Lighting/dramatic.jpg' },
    ]
    const [selectedOption, setSelectedOption] = useState();
    const [api, setApi] = useState()
    useEffect(() => {
        if (!api) return
        const handleSelect = () => {
            const index = api.selectedScrollSnap()
            const selectedName = Lightings[index].name
            setSelectedOption(selectedName)
            selectedLighting(selectedName)
        }
        handleSelect()
        api.on('select', handleSelect)
        return () => api.off('select', handleSelect)
    }, [api])
    return (
        <div className='mt-5'>
            <label className='text-slate-400 block'>Lighting Preference</label>
            <div className='relative flex items-left justify-left'>
                <Carousel className='relative w-[150px]' setApi={setApi}>
                    <CarouselContent className='mt-3'>
                        {Lightings.map((lighting, index) => (
                            <CarouselItem key={index} className={`flex flex-col items-center justify-center ${selectedOption === lighting.name ? '' : ''}`}>
                                <Image src={lighting.image} width={50} height={50} className='h-[80px] w-[90px] rounded-md'/>
                                <p className='text-center mt-2'>{lighting.name}</p>
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

export default Lighting