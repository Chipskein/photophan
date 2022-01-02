import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
console.log(process.env)
export const client = sanityClient({
    projectId:process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset:"production",
    useCdn:true,
    token:process.env.REACT_APP_SANITY_PROJECT_TOKEN
});
const builder = imageUrlBuilder(client);
const urlFor=(source)=> builder.image(source);