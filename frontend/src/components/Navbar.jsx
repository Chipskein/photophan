import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {IoMdAdd,IoMdSearch} from 'react-icons/io'
function Navbar({searchTerm,setSearch,user}) {
    const navigate=useNavigate();
    if(!user) return null;
    else 
    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white -border-none outline-none focus-within:shadow-sm">
                <IoMdSearch color={"#0369A1"} fontSize={21} className='ml-1'/>
                <input 
                    type="text" 
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={()=>navigate('/search')}
                    className="p-2 w-full bg-white outline-none"
                />
            </div>
            <div className="flex gap-3">
                <Link to={`user-profile/${user?.user?._id}`} className="hidden md:block">
                    <img src={user?.user?.userimage} alt="" className="w-14 h-12 rounded-lg" />
                </Link>
                <Link to="create-pin" className="bg-secondaryColor text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
