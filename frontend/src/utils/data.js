export const getUser=(userId)=>{
    const query=`*[_type=="user" && _id=='${userId}']`
    return query
}
export const searchQuery=(searchTerm)=>{
    const query=`*[ _type == "pin" ] && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*'
    {
        pinimage {
            asset->{url}
        },
        _id,
        detination,
        postedby->{
            _id,username,userimage
        },
        save[]{
            _key,
            postedby->{
                _id,username,userimage
            }
        }
    }
    `;
    return query
}
export const feedQuery=`*[_type=="pin" ]| order(_createAt desc)
    {
        pinimage {
            asset->{url}
        },
        _id,
        detination,
        postedby->{
            _id,username,userimage
        },
        save[]{
            _key,
            postedby->{
                _id,username,userimage
            }
        }
    }
`;