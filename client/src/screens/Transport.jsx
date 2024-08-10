import { Dashboard } from "@/components/custom-component/Dashboard";
import { Button } from "@/components/ui/button";
import { TransportPopUp } from "@/components/custom-component/TransportPopUp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function Transport() {
    const navigate = useNavigate()
    const [campDetails, setCampDetails] = useState([])
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            } else {
                try {
                    await axios.get('http://localhost:3000/api/v1/dashboard', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (err) {
                    navigate('/login');
                }
            }
        };
        checkAuth();
    }, [navigate]);
    useEffect(()=>{
        const fetchCampDetails = (async ()=>{
            const res = await axios.get("http://localhost:3000/camp/getcampdetails")
            setCampDetails(res.data)
        })
        fetchCampDetails();
    },[])
    return (
        <div>
            <Dashboard screenTitle="Transport">
                <div className="px-10 w-full h-[520px] mt-4 overflow-y-auto scrollBar">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">SNO</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Goods</TableHead>
                                <TableHead >Capacity</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {campDetails.map((camp, index) => (
                                
                                <TableRow key={camp.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{camp.name}</TableCell>
                                    <TableCell>{}/{}</TableCell>
                                    <TableCell>{camp.currentCapacity}/{camp.totalCapacity}</TableCell>
                                    <TableCell className="text-right">
                                        {/* <Button className = {`${item.status==='Onprocess' ? 'bg-green-600 hover:bg-green-700'  : '' }`}>{item.status}</Button> */}
                                        {/* {
                                            item.status === 'Transport' ? (
                                                <TransportPopUp status={item.status}></TransportPopUp>
                                            ) :
                                                (<Button className="bg-green-600 hover:bg-green-700">{item.status}</Button>)

                                        } */}
                                        {/* <Button className="bg-green-600 hover:bg-green-700">Transport</Button> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/* <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">$2,500.00</TableCell>
                                </TableRow>
                            </TableFooter> */}
                    </Table>
                </div>
            </Dashboard>
        </div>
    )
}