import React,{useState} from 'react'
import { urlFor,client } from '../client'
import {Link,useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md' 
import {AiTwotoneDelete} from 'react-icons/ai' 
import {BsFillArrowRightCircleFill} from 'react-icons/bs' 
import { fetchUser,deletePin } from '../utils/data'
function Pin({pin:{postedby,pinimage,_id,destination,save}}) {
    const navigate=useNavigate();
    const user=fetchUser();
    const alreadysaved = !!(save?.filter((item)=>item.postedby._id ===user?.googleId))?.length
    const savePin=(id)=>{
        client
        .patch(id)
        .setIfMissing({save:[]})
        .insert('after','save[-1]',[{
            _key:uuidv4(),
            userid:user?.googleId,
            postedby:{
                _type:"postedby",
                _ref:user?.googleId
            }
        }])
        .commit()
        .then(()=>{
            window.location.reload();
        })
    }
    const deletePin=(id)=>{
        client.delete(id).then(()=>window.location.reload())
    }
    const [postHover, setPostHover] = useState(false)
    return (
        <div className="m-2">
            <div
                onMouseEnter={()=>{setPostHover(true)}}
                onMouseLeave={()=>{setPostHover(false)}}
                onClick={()=>navigate(`/pin-detail/${_id}`)}
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
                        {alreadysaved ? 
                        (<button type="button" className="bg-green-500 opacity-70 text-white hover:opaciry-100 font-bold text-base px-5 py-1 rounded-3x1 hover:shadow-md outlined-none">{save?.length} Saved</button>):
                        (<button className="bg-orange-500 opacity-70 text-white hover:opaciry-100 font-bold text-base px-5 py-1 rounded-3x1 hover:shadow-md outlined-none"
                            onClick={(e)=>{
                                e.stopPropagation()
                                savePin(_id);
                            }}>Save!</button>)
                        }
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                        {destination &&(
                            <a href={destination}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                            >
                                <BsFillArrowRightCircleFill/>
                                {destination.length > 20 ? destination.slice(8,20):destination.slice(8)}
                            </a>
                        )}
                        {postedby?._id ===user?.googleId && (
                            <button
                                type="button"
                                className="bg-red-500 opacity-70 text-white hover:opacity-100 font-bold text-base px-5 py-5 rounded-full hover:shadow-md outlined-none"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    deletePin(_id);
                                }}
                            >
                                <AiTwotoneDelete/>
                            </button>
                        )}
                    </div>
                </div>
            )}
            </div>
            <Link to={`/user-profile/${postedby?._id}`} className="flex gap-2 mt-2 items-center">
                <img src={postedby?.userimage} alt="user-profile" className="w-8 h-8 rounded-full object-cover"/>
                <p className="font-semibold capitalize text-primary">{postedby?.username}</p>
            </Link>
        </div>
    )
}

export default Pin
