import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';

function InteriorDesignCard({ interior }) {
  const [openDialog, setOpenDialog] = useState(false);
  const onClickHandler = () => {
    if (!openDialog) {
      setOpenDialog(true);
    }
  };
  return (
    <div className='shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:scale-105'>
      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: interior?.aiImage
        }}
        secondImage={{
          imageUrl: interior?.orgImage
        }}
      />
      <div className='p-4 cursor-pointer' onClick={()=>onClickHandler()}>
        <h2>🏠 Interior Type : {interior.type}</h2>
        <h2>🎨 Style Type : {interior.style}</h2>
      </div>
      <AiOutputDialog aiImage={interior.aiImage} orgImage={interior.orgImage} closeDialog={()=>setOpenDialog(false)} openDialog={openDialog}/>
    </div>
  )
}

export default InteriorDesignCard