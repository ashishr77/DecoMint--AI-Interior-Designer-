import React from 'react'
import { Textarea } from "@/components/ui/textarea"

function Additional({additionalInput}) {
  return (
    <div className='mt-5'>
        <label className='text-slate-400'>Enter Additional Requirements (Optional)</label>
        <Textarea className='mt-2' onChange={(e) => additionalInput(e.target.value)} />
    </div>
  )
}

export default Additional