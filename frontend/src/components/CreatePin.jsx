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
    const [category, setCategory] = useState(null)
    const [imageasset, setimageasset] = useState(null)
    const [wrongimagetype, setWrongimagetype] = useState(false)
    const userinfo=user.user;
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
    const savePin=()=>{
        if(title && about && destination && imageasset?._id && category){
            const doc={
                _type:"pin",
                title,
                about,
                destination,
                pinimage:{
                    _type:"image",
                    asset:{
                        _type:"reference",
                        _ref:imageasset?._id
                    }
                },
                userid:userinfo._id,
                postedby:{
                    _type:"postedby",
                    _ref:userinfo._id
                },
                category
            }
            client.create(doc)
            .then(()=>{navigate("/")})
        }
        else {
            setFields(true)
            setTimeout(()=>setFields(false),2000)
        }
    }
    return (
        <div className="flex flex-col justify-center items-center mt-5 ">
            {fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">Preencha todos os campos</p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-secondaryColor lg:p-5 p-3  w-full">
                <div className="bg-white p-3 flex flex-0.7 w-full">
                    <div className="flex justify-center items-center flex-col border-2 border-solid border-gray-500 p-3 w-full h-420">
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
                <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} placeholder="Adicione uma descrição" className="outline-none text-2x1 sm:text-lg  border-b-2 border-gray-200 p-2"/>
                <input type="text" value={destination} onChange={(e)=>setDestination(e.target.value)} placeholder="Adicione um url" className="outline-none text-2x1 sm:text-lg  border-b-2 border-gray-200 p-2"/>
                <div className="flex flex-col">
                    <div>
                        <p className="mb-2 font-semibold text-lg sm:text-xl text-white">Escolha uma categoria</p>
                        <select className="outline-none w-4/5 text-base border-b-2 bor-der-gray-200 p-2 rounded-md cursor-pointer" onChange={(e)=>setCategory(e.target.value)}>
                            <option value="Other" className="bg-white">Selecione uma categoria</option>
                            {categories.map((category)=><option value={category.name} className="text-base border-0 outline-none capitalize bg-white text-black">{category.name}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end items-end mt-5">
                        <button
                            type="button"
                            onClick={savePin}
                            className="bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                        >
                            Create Pin
                        </button>
                    </div>
                </div>            
                </div>
            </div>
        </div>
    )
}

export default CreatePin
