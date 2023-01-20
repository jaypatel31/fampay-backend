import React from 'react'
import './YoutubeCard.css'
import { AiFillYoutube } from "react-icons/ai";

const YoutubeCard = ({data}) => {
  return (
    <div className='card_container text-black align-self-stretch m-2'>
        <div className="card mb-3" style={{height:"100%"}}>
        <h4 className="card-header"><AiFillYoutube color='red' size={30}/> {data.channelTitle}</h4>
        <img src={data.thumbnails.medium.url} width={"100%"} alt={data.title}/>
        <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
        </div>
        <div className="card-footer text-muted">
            {new Date(data.postedOn).toLocaleDateString()}
        </div>
        </div>
    </div>
  )
}

export default YoutubeCard