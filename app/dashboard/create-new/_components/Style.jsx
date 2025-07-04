import Image from 'next/image'
import React, { useState } from 'react'

function Style({ selectedStyle }) {
    const Styles = [
        {
            name: 'Modern',
            image: '/IntStyles/modern.jpg',
        },
        {
            name: 'Minimalist',
            image: '/IntStyles/minimalist.jpg',
        },
        {
            name: 'Bohemian',
            image: '/IntStyles/bohemian.jpg',
        },
        {
            name: 'Industrial',
            image: '/IntStyles/industrial.jpg',
        },
        {
            name: 'Rustic',
            image: '/IntStyles/rustic.jpg',
        },
        {
            name: 'Scandinavian',
            image: '/IntStyles/scandinavian.jpg',
        },
        {
            name: 'Traditional',
            image: '/IntStyles/traditional.jpg',
        },
        {
            name: 'Art Deco',
            image: '/IntStyles/artdeco.jpg',
        },
        {
            name: 'Mid-Century',
            image: '/IntStyles/midcenturymodern.jpg',
        },
        {
            name: 'Coastal',
            image: '/IntStyles/coastal.jpg',
        },
    ]
    const [selectedOption, setSelectedOption] = useState();
    return (
        <div className='mt-5'>
            <label className='text-slate-400'>Interior Design Style</label>
            <div className='grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {Styles.map((style, index) => (
                    <div key={index} onClick={() => { setSelectedOption(style.name); selectedStyle(style.name) }}>
                        <Image src={style.image} width={100} height={100} className={`h-[70px] rounded-md hover:scale-105 transition-all cursor-pointer ${style.name == selectedOption && 'border-2 border-primary rounded-md p-1'}`} />
                        <h2>{style.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Style