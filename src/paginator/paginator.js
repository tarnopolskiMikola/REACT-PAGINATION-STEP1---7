import React from 'react'

const Paginator = ({pages, currentPagef}) => {
    return(
        <nav aria-label="...">
  <ul className="pagination">
    <li className="page-item disabled">
      <a className="page-link" href="/#" tabIndex="-1">Previous</a>
    </li>
    {
        pages.map(p=>{
           return(
               
            <li key={p} className="page-item">
                <a className="page-link" href="/#"  onClick={()=>{currentPagef(p)}} >{p}</a>
            </li>
            
            )
        })
    }

  
    <li className="page-item">
      <a className="page-link" href="/#" >Next</a>
    </li>
  </ul>
</nav>
    )
}

export default Paginator