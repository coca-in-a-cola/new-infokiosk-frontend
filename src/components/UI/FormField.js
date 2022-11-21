import React, { useRef, useState } from 'react'
import { Button } from './Button'

export const FormFieldArray = ({id, getInputValue, placeholder, onFocus, onChangeInput, type, name, required, className}) => {
  
  const [count, setCount] = useState(1)

  //const inputElement = useRef()

  const addField = (e) => {
    e.preventDefault()
    const newCount = count + 1;
    setCount(newCount)
  }

  const deleteField = (e) => {
    e.preventDefault()
    const newCount = count - 1;
    setCount(newCount)
  }

  return (
    <>
      
    {[...Array(count).keys()].map((n) => {
      const elId = id + "-" + n
      return(
        <div className='mt-2'>
          <textarea
            id={elId}
            value={getInputValue(elId)}
            placeholder={placeholder}
            onFocus={onFocus}
            onChange={onChangeInput}
            type={type}
            name={name}
            required={required && n === 0}
            className={"min-w-full border-solid bg-gray-200 h-20 shadow appearance-none rounded py-2 px-8"
            + " text-black text-4xl font-black leading-tight overflow-x-auto"
            + " tracking-widest focus:outline-none focus:shadow-outline "}
          />
        </div>
      )
      })}

    <div className='flex flex-row-reverse mt-4'>
    <Button className={'bg-blue-darker ml-4 w-12 h-12'} onClick={addField}>+</Button>
    {
      count < 2 || <Button className={'bg-red ml-4 w-12 h-12'} onClick={deleteField}>-</Button>
    }
    </div>

    </>
  )
}
  