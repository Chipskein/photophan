import React,{useState} from 'react'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {MdDelete, MdPlace} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import {client}from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'
function CreatePin({user}) {
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [destination, setDestination] = useState('')
    const [loading, setloading] = useState(false)
    const [fields, setFields] = useState(false)
    const [category, setCategory] = useState(false)
    const [imageasset, setimageasset] = useState(null)
    const [wrongimagetype, setWrongimagetype] = useState(false)
    
    const navigate=useNavigate();
    const uploadImage=(e)=>{
        const {name,type}=e.target.files[0]
        const types=[
            "image/png",
            "image/gif",
            "image/jpg",
            "image/jpeg",
            "image/gif",
            "image/tiff",
            "image/svg"
        ]
        if(types.includes(type)){
            setWrongimagetype(false)
            setloading(true)
            client.assets
            .upload("image",e.target.files[0],{contentType:type,filename:name})
            .then((doc)=>{
                setimageasset(doc)
                setloading(false)
            })
            .catch((err)=>{
                console.log("ERROR:"+err)
            })
        }
        else setWrongimagetype(true)
    }
    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4">
            {fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">Preencha todos os campos</p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4 w-full">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                    <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        {loading && <Spinner/>}
                        {wrongimagetype && <p>Tipo Errado</p>}
                        {!imageasset ? (
                            <label>
                                <div className="flex flex-col items-center justify-center w-full">
                                    <div className="flex flec-col items-center justify-center">
                                        <p className="font-bold text-4x2">
                                            <AiOutlineCloudUpload/>
                                        </p>
                                        <p className="text-lg">Upload</p> 
                                    </div>
                                </div>
                                <div>
                                    <input type="file" name="upload-image" onChange={uploadImage} className="w-0 h-0"/>
                                </div>
                            </label>
                        ):(
                            <div className="relative h-full">
                                <img src={imageasset?.url} alt="uploaded-image" className="w-full h-full"/>
                                <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out" onClick={()=>setimageasset(null)}>
                                    <MdDelete/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full ">
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Adicione seu titulo" className="outline-none text-2x1 sm:text-3x1 font-bold border-b-2 border-gray-200 p-2"/>

                </div>
            </div>
        </div>
    )
}

export default CreatePin
