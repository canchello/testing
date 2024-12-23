import React from 'react'
import { cn } from '@/libs/tailwind'

export default function Modal({ id = '', className = '', modalClass = '', body }) {
  // return (
  //   <dialog id={id} className={cn('modal', className)}>
  //     <div className={cn('modal-box', modalClass)}>{body}</div>
  //     <form method='dialog' className='modal-backdrop'>
  //       <button type='button'>Close</button>
  //     </form>
  //   </dialog>
  // )
  return (
    <div>
      <input type='checkbox' id={id} className='modal-toggle' />
      <div className={cn('modal', className)} role='dialog'>
        {body && <div className={cn('modal-box', modalClass)}>{body}</div>}
        <label className='modal-backdrop' htmlFor={id}>
          Close
        </label>
      </div>
    </div>
  )
}
export function closeModal(id = '') {
  const modalCheckbox = document.getElementById(id)
  if (modalCheckbox) {
    modalCheckbox.checked = false // Close modal
  } else {
    console.warn(`Modal with ID '${id}' not found.`)
  }
}

export function openModal(id = '') {
  const modal = document.getElementById(id)
  if (modal) {
    console.log('modal', modal)
    modal.showModal?.()
    modal.checked = true
  } else {
    console.warn(`Modal with ID '${id}' not found.`)
  }
}
