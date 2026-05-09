"use server"

export const getAllTilesData = async () => {

    const res = await fetch("https://a08-recovery.vercel.app/tiles-data.json")
    const data = await res.json()
    // console.log(data.tiles)
    // console.log(typeof data.tiles, Array.isArray(data.tiles))
    return data.tiles
}

export const getSingleTileData = async (id) => {

    const res = await fetch("https://a08-recovery.vercel.app/tiles-data.json", {
        next: {
            revalidate: 1000 * 30
        }
    })
    const data = await res.json()
    // console.log(data.tiles)
    // console.log(typeof data.tiles, Array.isArray(data.tiles))
    // const data = await getAllTilesData()
    const foundTileData = data.tiles.find((singleTile) => singleTile.id == id)
    console.log("getSingleTileData", id, foundTileData)
    return foundTileData
}

export const getFilteredTilesData = async (keyword) => {

    const res = await fetch("https://a08-recovery.vercel.app/tiles-data.json")
    const data = await res.json()
    // console.log(data.tiles)
    // console.log(typeof data.tiles, Array.isArray(data.tiles))
    const foundData = data.tiles.filter((singleData) => {

        if (singleData.title.toLowerCase().includes(keyword.toLowerCase())) {
            return true
        }
        else {
            return false
        }
    })

    return foundData
}