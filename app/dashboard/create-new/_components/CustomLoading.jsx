import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

function CustomLoading({loading}) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent className='bg-transparent border-none shadow-none'>
                <div className='bg-transparent flex flex-col items-center my-10 justify-center'>
                    <Image src={'/loading.gif'} alt='loading' width={100} height={100} />
                    <h2 className='text-slate-300 font-bold'>Redesigning your Interior...  Do not Refresh</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoading