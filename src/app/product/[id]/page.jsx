import { getSingleTileData } from "@/actions/getTilesData";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;
  const data = await getSingleTileData(id);
  return (
    <div>
      <p>{id}</p>
      {JSON.stringify(data)}
    </div>
  );
}
