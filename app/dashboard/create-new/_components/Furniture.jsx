import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

function Furniture({ selectedFurniture }) {
    const Furnitures = [
        { name: 'No Preference', image: '/Furniture/none.png' },
        { name: 'Minimal', image: '/Furniture/minimal.jpg' },
        { name: 'Cozy', image: '/Furniture/cozy.jpg' },
        { name: 'Elegant', image: '/Furniture/elegant.jpg' },
        { name: 'Space-Saving & Smart', image: '/Furniture/spacesaving.jpg' },
    ]
    const [selectedOption, setSelectedOption] = useState();
    const [api, setApi] = useState()
    useEffect(() => {
        if (!api) return
        const handleSelect = () => {
            const index = api.selectedScrollSnap()
            const selectedName = Furnitures[index].name
            setSelectedOption(selectedName)
            selectedFurniture(selectedName)
        }
        handleSelect()
        api.on('select', handleSelect)
        return () => api.off('select', handleSelect)
    }, [api])
    return (
        <div className='mt-5'>
            <label className='text-slate-400 block'>Furniture Preference</label>
            <div className='relative flex items-left justify-left'>
                <Carousel className='relative w-[150px]' setApi={setApi}>
                    <CarouselContent className='mt-3'>
                        {Furnitures.map((furniture, index) => (
                            <CarouselItem key={index} className={`flex flex-col items-center justify-center ${selectedOption === furniture.name ? '' : ''}`}>
                                <Image src={furniture.image} width={50} height={50} className='h-[80px] w-[90px] rounded-md'/>
                                <p className='text-center mt-2'>{furniture.name}</p>
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

export default Furniture