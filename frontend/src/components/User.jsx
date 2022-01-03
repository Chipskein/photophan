import React,{useState,useEffect} from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {MdOutlineLogout} from 'react-icons/md'
import {useParams,useNavigate} from 'react-router-dom'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import {client} from '../client'
import {getUser,savedPinQuery,userPinQuery} from '../utils/data'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
function User() {
    const navigate=useNavigate();
    const userid=useParams().userid;
    const [user, setuser] = useState(null);
    const [pins,setpins] = useState(null)
    const [text, setText] = useState('Created')
    const [activatebtn, setactivatebtn] = useState('Created')
    const randomImage="https://source.unsplash.com/1600x900/?nature"
    const activatebtnstyle="bg-secondaryColor text-white font-bold p-2 rounded-full w-20 outline-none"
    const notactivatebtnstyle="bg-primary mr-4 text-white font-bold p-2 rounded-full w-20 outline-none"
    const Logout=()=>{
        localStorage.clear();
        navigate("/login")
    }
    useEffect(() => {
        if(userid){
            const query=getUser(userid)
            client.fetch(query)
            .then((data)=>{
                setuser(data[0])
                console.log(user)
            })
        };
    }, [userid])
    useEffect(() => {
        if(text=='Created'){
            const createdquery=userPinQuery(userid);
            client.fetch(createdquery).then((data)=>{
                console.log(data)
                setpins(data)
            })
        }
        else{
            const savedquery=savedPinQuery(userid);
            client.fetch(savedquery).then((data)=>{
                console.log(data)
                setpins(data)
            })
        }
    }, [text,userid])
    if(!user){
        return (<Spinner message="Carregando usuario"/>)
    }
    return (
        <div className="relative pb-2 h-full justify-center items-center ">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img src={randomImage} alt="" className="w-full h-370 2x1:h-510 shadow-lg object-cover"/>
                        <img src={user?.userimage} className="rounded-full w-28 h-28 -mt-10 object-cover" alt="" />
                        <h1 className="font-bold text-3x1 text-center mb-5 text-white">{user?.username}</h1>
                        <div className="absolute top-2 z-0 right-2">
                            {userid===user._id &&(
                                <GoogleLogout
                                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                                render={(renderProps)=>(
                                    <button
                                        type='button'
                                        className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <MdOutlineLogout color={'#000000'} fontSize={40}/> 
                                    </button>
                                )}
                                onLogoutSuccess={Logout}
                                cookiePolicy="single_host_origin"
                            />
                            )}
                        </div>
                    </div>
                    <div className="text-center mb-7">
                        <button
                            type="button"
                            onClick={(e)=>{
                                setText(e.target.textContent)
                                setactivatebtn('Created')
                            }}
                            className={ activatebtn ==='Created' ? activatebtnstyle : notactivatebtnstyle}
                        >
                            Created
                        </button>
                        <button
                            type="button"
                            onClick={(e)=>{
                                setText(e.target.textContent)
                                setactivatebtn('Saved')
                            }}
                            className={ activatebtn ==='Saved' ? activatebtnstyle : notactivatebtnstyle}
                        >
                            Saved
                        </button>
                    </div>
                    {pins?.length ? 
                        (
                            <div className="px-2">
                                <MasonryLayout pins={pins}/>
                            </div>
                        ):(
                        <div className="flex justify-center font-bold items-center w-full mt-2">
                            No pins
                        </div> )
                    }
                </div>
            </div>
        </div>
    )
}

export default User
