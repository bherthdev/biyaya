import React from 'react'

const Tbody = (props) => {
    const content = (
        <tbody  className="divide-y dark:bg-slate-800 divide-gray-200 dark:divide-gray-700 ">{props.tbName}</tbody>
    )
  return content
}

export default Tbody