import React,{useState} from 'react'
import { urlFor,client } from '../client'
import {Link,useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md' 
import {AiTwotoneDelete} from 'react-icons/ai' 
import {BsFillArrowRightCircleFill} from 'react-icons/bs' 
function Pin({pin:{postedby,pinimage,_id,destination}}) {
    const navigate=useNavigate();
    const [postHover, setPostHover] = useState(false)
    const [savingPost, setsavingPost] = useState(false)
    return (
        <div className="m-2">
            <div
                onMouseEnter={()=>{setPostHover(true)}}
                onMouseLeave={()=>{setPostHover(false)}}
                onClick={()=>navigate(`pin-detail/${_id}`)}
                className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"    
            >
            <img className="rounded-lg w-full" alt="user-post" src={urlFor(pinimage).width(250).url()} alt="" />
            {postHover && (
                <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <a 
                                href={`${pinimage?.asset?.url}?dl=`}
                                download
                                onClick={(e)=>e.stopPropagation()}
                                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75"
                            >
                            <MdDownloadForOffline/>
                            </a>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Pin
