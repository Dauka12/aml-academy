import React from 'react'
import NumberedDots from '../NumberedDots'
const NumberedDotsAndImage = ({imageUrl,list, dotsColor, color, header, gap=20 }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ flex: '2' }}>
              <NumberedDots
                  list={list}
                  dotsColor={dotsColor}
                  color={color}
                  header={header}
                  gap={gap}
              ></NumberedDots>
      </div>
      <div style={{ flex: '1' }}>
        <img src={imageUrl} alt="Image" style={{ width: '80%', height: 'auto' }} />
      </div>
    </div>
  )
}

export default NumberedDotsAndImage
