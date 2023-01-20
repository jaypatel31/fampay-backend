import React,{useState} from 'react'
import './SearchBar.css'

const SearchBar = ({callApi}) => {
    const [api, setApi] = useState("")
  return (
    <div className='search_bar_container d-flex flex-column mx-auto' style={{marginTop:"40px",width:"90%"}}>
        <div className='d-flex justify-content-center'>
            <div style={{paddingRight:"20px"}}>
                <span className="badge rounded-pill bg-dark fs-3 p-3">Get/</span>
            </div>
            <div className='input_container d-flex flex-column flex-md-row' style={{width:"100%"}}>
                <input type="text" value="http://localhost:4000/" className='search_bar border-none fs-4 fw-bold p-2' disabled/>
                <input type="text" placeholder='Search' value={api} onChange={(e)=>setApi(e.target.value)} className='search_bar rounded fs-4 fw-bold p-2' style={{width:"100%"}}/>
            </div>
        </div>
        <div className='d-flex justify-content-end'>
            <button className='btn btn-outline-primary fs-4 fw-bold p-3 rounded' style={{marginTop:"20px"}} onClick={()=>callApi(api)}>Search</button>
        </div>
    </div>
  )
}

export default SearchBar