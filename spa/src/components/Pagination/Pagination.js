import React from 'react'

const Pagination = ({page, currentPage, onPageChanged}) => {
  return(
    <div className='pagination'>
      <ul>
        {
          page.map((item, index) => <li key={`${item}-${index}`} onClick={() => {onPageChanged(item)}} className={currentPage === item ? 'selected' : ''}>{item}</li>)
        }
      </ul>
    </div>
  )
}

export default Pagination