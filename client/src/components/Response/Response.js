import React from 'react'
import YoutubeCard from '../YoutubeCard/YoutubeCard'

const Response = ({responesData}) => {
    
  return (
    <div className='response_container bg-dark mx-auto text-white p-2' style={{marginTop:"40px",width:"90%"}}>
        <div className='heading'>
            <h1 className='text-center text-white'>Response</h1>
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
            {
                responesData.length > 0 ? responesData.map((data,index)=>{
                    return <YoutubeCard key={index} data={data}/>
                }
                ) : <h1 className='text-center text-white'>No Data Found</h1>
            }
        </div>
    </div>
  )
}

export default Response