import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../assets/logo.png'
import { categories } from '../utils/data'
const NotActiveStyle="flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const ActiveStyle="flex items-center px-5 gap-3 font-extrabold border-r-2 border-black text-gray-500 transition-all duration-200 ease-in-out capitalize"

function Sidebar({user,closeToggle}) {
    const handleCloseToggle=()=>{
        if(closeToggle) closeToggle(false);
    }
    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseToggle}>
                    <img src={logo} alt="logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({isActive}) => isActive ? ActiveStyle:NotActiveStyle}
                        onClick={handleCloseToggle}
                    >
                    <RiHomeFill/>
                    Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2x1:text-x1">Categories</h3>
                {categories.slice(0,categories.length-1).map((category)=>(
                    <NavLink
                        to={`/category/${category.name}`}
                        className={({isActive}) => isActive ? ActiveStyle:NotActiveStyle}
                        onClick={handleCloseToggle}
                        key={category.name}
                    >
                    <img src={category.image} alt="category-image" className="w-10 h-10 rounded-full"/>
                    {category.name}
                    </NavLink>
                ))}
                </div>
            </div>

        </div>
    )
}

export default Sidebar
