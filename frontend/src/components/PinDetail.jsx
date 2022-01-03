import React,{useState,useEffect} from 'react'
import {MdDownloadForOffline} from 'react-icons/md'
import {Link,useParams} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {client,urlFor} from '../client'
import Masonrylayout from './MasonryLayout'
import {PinDetailQuery,pindetailMoreQuery} from '../utils/data'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
function PinDetail({user}) {
    const [pins, setPins] = useState(false)
    const [pindetail, setPindetail] = useState(false)
    const [comment, setComment] = useState([])
    const [addingcomment, setAddingcomment] = useState(false)
    const { pinId }=useParams()
    const addcomment=()=>{
        if(comment){
            setAddingcomment(true);
            client
            .patch(pinId)
            .setIfMissing({comments:[]})
            .insert('after','comments[-1]',[{comment,_key:uuidv4(),postedby:{
                _type:"postedby",
                _ref:user.user._id
            }}])
            .commit()
            .then(()=>{
                getPinDetails(pinId)
                setComment('')
                setAddingcomment(false)
            })
        }
    };
    const getPinDetails=(pin)=>{
        let query=PinDetailQuery(pin)
        if(query){
            client.fetch(query)
            .then((data)=>{
                setPindetail(data[0]);
                if(data[0]){
                    query=pindetailMoreQuery(data[0]);
                    client.fetch(query)
                    .then((res)=>setPins(res))
                }
            })
        }
    }
    useEffect(() => {
        getPinDetails(pinId);
    },[])
    if(!pindetail) return <Spinner message="Carregando Detalhes"/>
    else{
        return (
            <>
            <div className="flex xl-flex-row flex-col m-auto bg-white" styles={{maxWidth:"1500px",borderRadius:"32px"}}>
                <div className="flex justify-center items-center md:items-start flex-initial">
                    <img src={pindetail?.pinimage && urlFor(pindetail.pinimage).url()} alt="" className="rounded-t-3x1 rounded-b-lg"/>
                </div>
                <div className="w-full p-5 flex-1 xl:min-w-20">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <a 
                                href={`${pindetail?.pinimage?.asset?.url}?dl=`}
                                download
                                onClick={(e)=>e.stopPropagation()}
                                className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75"
                            > 
                            <MdDownloadForOffline/>
                            </a>
                        </div>
                        <div>
                            <a href={pindetail?.destination} target="_blank" rel="noreferrer">
                                {pindetail?.destination}
                            </a>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4x1 font-bold break-words mt-3">
                            {pindetail?.title}
                        </h1>
                        <p className="mt-3">{pindetail?.about}</p>
                    </div>
                    <Link to={`/user-profile/${pindetail?.postedby?._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                        <img src={pindetail?.postedby?.userimage} alt="user-profile" className="w-8 h-8 rounded-full object-cover"/>
                        <p className="font-semibold capitalize">{pindetail?.postedby?.username}</p>
                    </Link>
                    <h2 className="mt-5 text-2x1">Comentarios</h2>
                    <div className="max-h-370 overflow-y-auto">
                        {pindetail?.comments?.map((comment)=>(
                            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={comment?._id}>
                                <img src={comment?.postedby.userimage} alt="user-profile" className="w-10 h-10 rounded-full cursor-pointer"/>
                                <div className="flex flex-col">
                                <p className="font-bold">{comment.postedby.username}</p>
                                <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap mt-6 gap-3">
                        <Link to={`/user-profile/${user?.user?._id}`}>
                            <img src={user?.user?.userimage} alt="user-profile" className="w-10 h-10 rounded-full cursor-pointer"/>
                        </Link>
                            <input type="text" className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2x1 focus:border-gray-300" placeholder="Adicione um comentário" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                            <button type="button" className="bg-secondaryColor text-white rounded-full px-6 py-2 font-semibold text-base outline-none" onClick={addcomment}>
                            {addingcomment ? "Comentando...":"Comentar"}
                            </button>
                    </div>
                </div>
            </div>
            {pins?.length>0 ? (
                <>
                    <div className="bg-secondaryColor">
                    <h2 className="text-center text-white font-bold text-2x mt-8 mb-4">
                        Mais Pins
                    </h2>
                    <MasonryLayout pins={pins}/>
                    </div>
                </>
            ):(<Spinner message="Carregando Pins"/>)}
            </>
        )
    }
}

export default PinDetail
