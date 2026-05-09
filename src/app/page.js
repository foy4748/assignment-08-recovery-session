import { getAllTilesData, getFilteredTilesData } from "@/actions/getTilesData";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data = await getAllTilesData()
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section className="grid lg:grid-cols-4">
        {data.map(d => {
          return (
            <Link key={d.id} href={`/product/${d.id}`}>
              <Image className="w-full col-span-4" width={400} height={250} src={d.image} alt={d.title} />
            </Link>
          )
        })}</section>
    </div>
  );
}
