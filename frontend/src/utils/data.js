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
        destination,
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
        destination,
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
export const categories = [
    {
      name: 'carros',
      image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
    },
    {
      name: 'websites',
      image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
    },
    {
      name: 'fotos',
      image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
    },
    {
      name: 'comida',
      image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
    },
    {
      name: 'natureza',
      image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
    },
    {
      name: 'arte',
      image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
    },
    {
      name: 'viagem',
      image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
    },
    {
      name: 'anime',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Wikipe-tan_Birthday.png',
    },
    {
      name: 'desenhos',
      image: 'https://www.superprof.com.au/blog/wp-content/uploads/2020/02/learn-to-draw-for-free-1060x750.jpg',
    }
  ];
export const fetchUser=()=>{
    const userInfo= localStorage.getItem("user")!=='undefined' ? JSON.parse(localStorage.getItem("user")):localStorage.clear()
    return userInfo;
}
export const deletePin=(id)=>{
    
}
export const PinDetailQuery=(id)=>{
  const query=`*[_type == "pin" && _id == '${id}'] 
  {
    pinimage{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedby->{
      _id,
      username,
      userimage
    },
   save[]{
      postedby->{
        _id,
        username,
        userimage
      },
    },
    comments[]{
      comment,
      _key,
      postedby->{
        _id,
        username,
        userimage
      },
    }
  }`;
  return query;
}
export const pindetailMoreQuery=(pin)=>{
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    pinimage{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedby->{
      _id,
      username,
      userimage
    },
    save[]{
      _key,
      postedby->{
        _id,
        username,
        userimage
      },
    },
  }`;
  return query;
}


export const userPinQuery = (userId) => {
  const query = `*[ _type == 'pin' && userid == '${userId}'] | order(_createdAt desc){
    pinimage{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedby->{
      _id,
      username,
      userimage
    },
    save[]{
      postedby->{
        _id,
        username,
        userimage
      },
    },
  }`;
  return query;
};

export const savedPinQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userid ] | order(_createdAt desc) {
    pinimage{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedby->{
      _id,
      username,
      userimage
    },
    save[]{
      postedby->{
        _id,
        username,
        userimage
      },
    },
  }`;
  return query;
};