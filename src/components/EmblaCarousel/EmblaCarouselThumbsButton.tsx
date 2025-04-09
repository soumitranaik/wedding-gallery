"use client"

import React from 'react'
import Image from 'next/image'

type PropType = {
  selected: boolean
  index: number
  onClick: () => void
  imgUrl: string
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
         <Image
          src={`https://res.cloudinary.com/dkqe85r8b/image/upload/c_thumb,w_200,h_200/${props.imgUrl}`}
          alt={`Thumbnail ${index + 1}`}
          width={200}
          height={200}
          className="embla-thumbs__slide__img"
        />
      </button>
    </div>
  )
}
