import React from 'react'

const Image = ({ data, size , rounded }) => {

  return (
    <>
          <img src={`data:image/jpeg;base64,${data}`} alt="uploaded" className={` ${size} ${rounded} border dark:border-slate-500 border-slate-300  object-cover`} />

    </>
  )
}

export default Image