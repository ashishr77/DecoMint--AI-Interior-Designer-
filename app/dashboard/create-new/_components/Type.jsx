import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function Type({ selectedType }) {
  return (
    <div>
      <label className='text-slate-400'>Select Interior Type</label>
      <Select onValueChange={(value) => selectedType(value)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Interior Type' />
        </SelectTrigger>
        <SelectContent>
          <p className='text-primary'>Main Living Spaces</p>
          <SelectItem value='Living Room'>Living Room</SelectItem>
          <SelectItem value='Bedroom'>Bedroom</SelectItem>
          <SelectItem value='Kitchen'>Kitchen</SelectItem>
          <SelectItem value='Dining Room'>Dining Room</SelectItem>
          <SelectItem value='Bathroom'>Bathroom</SelectItem>
          <p className='text-primary'>Functional & Workspaces</p>
          <SelectItem value='Office/Workspace'>Office/Workspace</SelectItem>
          <SelectItem value='Laundry Room'>Laundry Room</SelectItem>
          <SelectItem value='Storage Room'>Storage Room</SelectItem>
          <p className='text-primary'>Specialized & Recreational Rooms</p>
          <SelectItem value='Home Theater'>Home Theater</SelectItem>
          <SelectItem value='Gym/Fitness Room'>Gym/Fitness Room</SelectItem>
          <SelectItem value='Video Game Room'>Video Game Room</SelectItem>
          <SelectItem value='Library/Reading Room'>Library/Reading Room</SelectItem>
          <p className='text-primary'>Kids & Guest Spaces</p>
          <SelectItem value='Kids Room/Nursery'>Kids Room/Nursery</SelectItem>
          <SelectItem value='Guest Room'>Guest Room</SelectItem>
          <p className='text-primary'>Outdoor & Miscellaneous Spaces</p>
          <SelectItem value='Patio/Balcony'>Patio/Balcony</SelectItem>
          <SelectItem value='Closet'>Closet</SelectItem>
          <SelectItem value='Sunroom'>Sunroom</SelectItem>
          <SelectItem value='Basement/Attic'>Basement/Attic</SelectItem>
        </SelectContent>
      </Select>

    </div>
  )
}

export default Type