import React,{useState,useEffect} from 'react'
import {client} from '../client'
import {feedQuery,searchQuery} from '../utils/data'
import Spinner from './Spinner' 
import MasonryLayout from './MasonryLayout'
function Search({searchTerm,setSearch}) {
    const [loading, setLoading] = useState(true)
    const [pins, setPins] = useState(null)
    useEffect(() => {
        if(searchTerm){
            setLoading(true)
            const query=searchQuery(searchTerm);
            client.fetch(query).then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
        else{
            setLoading(true)
            client.fetch(feedQuery).then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
    }, [searchTerm])
    
    if(loading) return <Spinner message={`Procurando Pins relacionados com ${searchTerm}`}/>
    
    return (
        <div>
            {pins?.length>0 ? (<MasonryLayout pins={pins}/>):(
                <h2 className="text-center font-extrabold text-white">Nenhum pin relacionado a {searchTerm} encontrado</h2>
            )}
        </div>
    )
    
}

export default Search
