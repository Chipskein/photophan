import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { feedQuery,searchQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
function Feed() {
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState(null)
    const {category}=useParams();
    console.log(category);
    useEffect(()=>{
        setLoading(true)
        if(category){
            const query=searchQuery(category);
            client.fetch(query).then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
        else{
            client.fetch(feedQuery).then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
    },[category])
    if(loading) return <Spinner message="Carregando..." />
    return (
        <div>
            {pins && <MasonryLayout pins={pins}/> }
        </div>
    )
}

export default Feed
