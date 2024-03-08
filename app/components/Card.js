import Image from "next/image";
import Link from 'next/link'

function Card({product}) {
  return (
    <Link href={`/details/${product?.slug}`}>
    <div className="relative shadow-md max-w-sm cursor-pointer rounded-xl">
      <div className="relative h-96 rounded-xl">
       
        <Image
          src={product?.image}
          layout="fill"
          objectFit="cover"
          alt="art"
        />
      </div>

      <div className="p-4 space-y-2">
        <h1 className="text-xl font-semibold">{product?.name}</h1>
       
        <p className="text-lg text-gray-500 truncate">{product?.description}</p>
       
      </div>

      {/* Sticky Price Tag - Outside the Card Container */}
      <div className="absolute  right-0 top-0 p-2 bg-gray-300 shadow-md">
        <span className=" text-lg font-semibold">${product?.price}</span>
      </div>
    </div>
    </Link>
  );
}

export default Card;
