import React, { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"

function Budget({ selectedBudget }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    selectedBudget(0)
  }, [])
  const formatCurrency = (num) => {
    if (num >= 10020) {
      return "$10,000+"
    }
    return `$${num.toLocaleString()}`
  }
  return (
    <div className='mt-5'>
      <label className='text-slate-400 block mb-2'>Set your Budget</label>
      <Slider
        value={[value]}
        onValueChange={(val) => {
          setValue(val[0])
          selectedBudget(val[0])
        }}
        min={0}
        max={10020}
        step={5}
      />
      <div className='mt-2'>
        {formatCurrency(value)}
      </div>
    </div>
  )
}

export default Budget
