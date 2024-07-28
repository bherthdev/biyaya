import React from 'react'

const Thead = (props) => {

  const content = (
    <th className=" mx-auto text-start  px-4 py-3 border-b-2 border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-700  text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      {props.thName}
    </th>
  )

  return content
}

export default Thead