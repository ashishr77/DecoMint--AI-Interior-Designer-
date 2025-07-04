import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

function Storage({ selectedStorage }) {
    const Storages = [
        { name: 'Minimal', image: '/Storage/minimal.jpg' },
        { name: 'Moderate', image: '/Storage/moderate.jpg' },
        { name: 'High', image: '/Storage/high.jpg' },
    ]
    const [selectedOption, setSelectedOption] = useState();
    const [api, setApi] = useState()
    useEffect(() => {
        if (!api) return
        const handleSelect = () => {
            const index = api.selectedScrollSnap()
            const selectedName = Storages[index].name
            setSelectedOption(selectedName)
            selectedStorage(selectedName)
        }
        handleSelect()
        api.on('select', handleSelect)
        return () => api.off('select', handleSelect)
    }, [api])
    return (
        <div className='mt-5'>
            <label className='text-slate-400 block'>Storage Preference</label>
            <div className='relative flex items-left justify-left'>
                <Carousel className='relative w-[150px]' setApi={setApi}>
                    <CarouselContent className='mt-3'>
                        {Storages.map((storage, index) => (
                            <CarouselItem key={index} className={`flex flex-col items-center justify-center ${selectedOption === storage.name ? '' : ''}`}>
                                <Image src={storage.image} width={50} height={50} className='h-[80px] w-[80px] rounded-md'/>
                                <p className='text-center mt-2'>{storage.name}</p>
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

export default Storage