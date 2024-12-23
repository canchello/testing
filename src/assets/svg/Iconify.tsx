import React from 'react'
import type { SVGProps } from 'react'

export function LocationFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.262 22.134S4 16.018 4 10a8 8 0 1 1 16 0c0 6.018-7.262 12.134-7.262 12.134c-.404.372-1.069.368-1.476 0M12 13.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7'
      ></path>
    </svg>
  )
}

export function ArrowRightFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='0.5em' height='1em' viewBox='0 0 12 24' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414'
      ></path>
    </svg>
  )
}

export function RiArrowLeftSLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='m10.828 12l4.95 4.95l-1.414 1.415L8 12l6.364-6.364l1.414 1.414z'></path>
    </svg>
  )
}

export function RiArrowRightSLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z'></path>
    </svg>
  )
}
