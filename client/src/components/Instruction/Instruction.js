import React from 'react'

const Instruction = () => {
  return (
    <div className='instruction_container p-2 shadow-sm rounded mx-auto' style={{backgroundColor:"#f1f1f1",marginTop:"40px",width:"90%"}}>
        <h1>Instructions</h1>
        <div className='mt-1'>
            <h3 className='text-decoration-underline'>1{')'}Get All Videos</h3>
            <div className='body ps-4 pt-2 fs-4'>
                <div>Method: GET</div>
                <div>Route: api/v1/video?page=int&size=int</div>
                <div>Query: page=int {'(optional)'} | size=int {'(optional)'}</div>
            </div>
        </div>
        <div className='mt-3'>
            <h3 className='text-decoration-underline'>2{')'}Get Searched Videos</h3>
            <div className='body ps-4 pt-2 fs-4'>
                <div>Method: GET</div>
                <div style={{wordBreak:"break-all"}}>Route: api/v1/video/search?title=string&description=string&page=int&size=int</div>
                <div>Query: title=string {'(required)'} | description=string {'(required)'} | page=int {'(optional)'} | size=int {'(optional)'}</div>
            </div>
        </div>
    </div>
  )
}

export default Instruction