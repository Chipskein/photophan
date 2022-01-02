import React from 'react';
import {useState} from 'react';
import {Routes,Route} from 'react-router-dom';
import {Navbar,Feed,PinDetail,CreatePin,Search} from '../components'
function Pins(user) {
    const [searchTerm, setSearch] = useState('')
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearch={setSearch} user={user}/>
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed/>}></Route>
                    <Route path="/category/:category:id" element={<Feed/>}></Route>
                    <Route path="/pin-detail/:pinId" element={<PinDetail user={user}/>}></Route>
                    <Route path="/create-pin" element={<CreatePin user={user}/>}></Route>
                    <Route path="/search" element={<Search searchTerm={searchTerm} setSearch={setSearch}/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Pins
