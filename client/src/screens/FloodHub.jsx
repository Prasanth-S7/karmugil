import { Dashboard } from "@/components/custom-component/Dashboard"
import MapComponent from "@/components/custom-component/mapComponent"
import { useEffect, useState } from "react"
import axios from "axios"
export const Floodhub = (() => {
    const [locations, setLocations] = useState([])
    useEffect(()=>{
        const fetchLocations = (async ()=>{
            const res = await axios.get("http://localhost:3000/getmapdetails")
            setLocations(res.data)
        })
        fetchLocations();
    },[])
    return (
        <div>
            <Dashboard screenTitle="Disaster Navigator">
                <div className="w-full">
                    <MapComponent locations={locations} />
                </div>
            </Dashboard>

        </div>
    )
})