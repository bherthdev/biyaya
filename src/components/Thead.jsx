import React from 'react'

const Thead = (props) => {

  const content = (
    <th className={`mx-auto text-start px-8 py-3 bg-[#F1F1F1] dark:bg-gray-700  text-xs font-normal text-gray-500 dark:text-gray-400 uppercase tracking-wider` }>
      {props.thName}
    </th>
  )

  return content
}

export default Thead