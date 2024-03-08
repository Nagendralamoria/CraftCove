import Details from "../../components/Details"
import {getProductBySlug} from "@/sanity/sanity-utils";


export default async function page({params}) {
  const {slug} = params;

  const product = await getProductBySlug(slug);

  return (
    <div>
            <Details product={product[0]}/>
    </div>
  )
}

