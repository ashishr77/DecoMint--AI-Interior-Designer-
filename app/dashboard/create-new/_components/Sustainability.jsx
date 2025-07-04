import React, { useState, useEffect } from 'react'
import { Switch } from "@/components/ui/switch"

function Sustainability({ selectedSustainability }) {
  const [isChecked, setIsChecked] = useState(false)
  useEffect(() => {
    selectedSustainability(false)
  }, [])
  const handleChange = (value) => {
    setIsChecked(value)
    selectedSustainability(value)
  }
  return (
    <div className='mt-5'>
      <label className='text-slate-400 block mb-2'>Sustainability Integration?</label>
      <div className="flex items-center gap-2">
        <span>No</span>
        <Switch checked={isChecked} onCheckedChange={handleChange}/>
        <span>Yes</span>
      </div>
    </div>
  )
}

export default Sustainability