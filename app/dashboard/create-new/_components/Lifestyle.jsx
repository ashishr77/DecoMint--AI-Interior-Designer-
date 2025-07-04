import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function Lifestyle({ selectedLifestyle }) {
  return (
    <div className='mt-5'>
      <label className='text-slate-400'>Select Space Usage & Lifestyle</label>
      <Select onValueChange={(value) => selectedLifestyle(value)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Space Usage & Lifestyle' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Relaxation & Comfort'>Relaxation & Comfort</SelectItem>
          <SelectItem value='Productivity'>Productivity</SelectItem>
          <SelectItem value='Entertainment'>Entertainment</SelectItem>
          <SelectItem value='Kid-Friendly & Safe'>Kid-Friendly & Safe</SelectItem>
          <SelectItem value='Pet-Friendly'>Pet-Friendly</SelectItem>
          <SelectItem value='Multi-Purpose'>Multi-Purpose</SelectItem>
        </SelectContent>
      </Select>

    </div>
  )
}

export default Lifestyle