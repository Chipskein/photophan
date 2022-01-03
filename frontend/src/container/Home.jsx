import React from 'react';
import {useState,useRef,useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link,Route,Routes,useNavigate} from 'react-router-dom'
import { Sidebar,User } from '../components';
import { client } from '../client';
import logo from '../assets/logo.png';
import Pins from './Pins';
import { getUser } from '../utils/data';
const Home = () => {
    const [toggle, settoggle] = useState(false)
    const [user, setUser] = useState(null)
    const userInfo= localStorage.getItem("user")!=='undefined' ? JSON.parse(localStorage.getItem("user")):localStorage.clear()
    const scrollRef=useRef(null);
    const navigate=useNavigate();
    if(!userInfo){
        navigate("login")
    }
    useEffect(() => {
        const query=getUser(userInfo?.googleId)
        client.fetch(query).then((data)=>{setUser(data[0]);console.log(user)});

    }, [])
    useEffect(() => {
        scrollRef.current.scrollTo(0,0)
    }, [])
    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out ">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={user && user}/>
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={()=>settoggle(true)}/>
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28"/>
                    </Link>
                    <Link to={`/user-profile/${user?._id}`}>
                        <img src={user?.userimage} alt="logo" className="w-14 rounded-full object-cover"/>
                    </Link>
                </div>
                {toggle && (
                <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=>{settoggle(false)}}/>
                    </div>
                    <Sidebar user={user && user} closeToggle={settoggle}/>
                </div>
                )}
            </div>

            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userid" element={<User/>}></Route>
                    <Route path="/*" element={<Pins user={user && user}/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Home
