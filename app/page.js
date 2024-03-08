import {getUserByEmail, createUser,getProducts} from "@/sanity/sanity-utils";
import Card from "./components/Card";
import Image from "next/image";
import { currentUser } from '@clerk/nextjs';
import hero from "@/public/hero.jpg"
export default async function Home() {
  const user = await currentUser();
 
  if (!user) return <div>Not logged in</div>;

  // Check if the user with the current email already exists in Sanity
  const existingUser = await getUserByEmail(user?.emailAddresses[0]?.emailAddress);

  // If the user with the email doesn't exist, create the user in Sanity
  if (existingUser.length === 0) {
    const newUserResult = await createUser({
      name: user?.firstName,
      email: user?.emailAddresses[0]?.emailAddress,
      user:user
    });
  }

  const products = await getProducts();
  
  return (
    <div>


<section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 relative h-96 overflow-hidden rounded-xl ">
      <Image alt="https://www.freepik.com/free-photo/ceramic-pottery-tools-still-life_38687796.htm#query=handicraft&position=0&from_view=keyword&track=sph&uuid=aa94b96d-33b5-4bb2-b11e-b8d89e2e6b3c" layout="fill" objectFit="cover"  src={hero}/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
      Crafted Creations
      </h1>
      <p className="mb-8 leading-relaxed">Discover a world of meticulously crafted treasures, where every stitch, every brushstroke, and every detail is infused with passion and artistry. From hand-carved wooden sculptures to intricately woven textiles, our collection of handmade items celebrates the skill and creativity of artisans around the globe. Each piece tells a story, reflecting the unique cultural heritage and craftsmanship that goes into its creation. Embrace the beauty of handmade with our curated selection of artisanal treasures.</p>
    
    </div>
  </div>
</section>



      <div className='flex p-10'>
      <div className='mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16'>
        {
          products.map((product)=>(
            <Card key={product._id} product={product}/>
          ))
        }
      </div>
      </div>

   

    </div>
  )
}
