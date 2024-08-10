import { Dashboard } from "@/components/custom-component/Dashboard";
import { RequestFromCampPopUp } from "@/components/custom-component/RequestFromCampPopUp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { DonationFromPublicPopUp } from "@/components/custom-component/DonationFromPublicPopUp";
import { TailSpin } from "react-loader-spinner";
// const goods = [
//     {
//         SNO: "1",
//         Name: "Camp 1",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "2",
//         Name: "Camp 1",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "3",
//         Name: "Camp 1",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "4",
//         Name: "Camp 1",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "5",
//         Name: "Camp 1",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "6",
//         Name: "Camp 1",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "7",
//         Name: "Camp 1",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
// ]

// const goodsReceived = [
//     {
//         SNO: "1",
//         Name: "Prasanth",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "2",
//         Name: "Prasanth",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "3",
//         Name: "Prasanth",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "4",
//         Name: "Prasanth",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "5",
//         Name: "Prasanth",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "6",
//         Name: "Prasanth",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
//     {
//         SNO: "7",
//         Name: "Prasanth",
//         GoodsNeeded: "apples",
//         Quantity: 10,
//     },
// ]

export function Tracking() {
    const [goods, setGoods] = useState([]);
    const [goodsReceived, setGoodsReceived] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoodsRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3000/camp/getrequestsfromcamps', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setGoods(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching goods requests:', error);
                setLoading(false);
            }
        };
        const fetchDonations = async () => {
            try {
                const response = await axios.get('http://localhost:3000/camp/getdonationfrompublic', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setGoodsReceived(response.data);
            } catch (error) {
                console.error('Error fetching donations from public data :', error);
            }
        };
        fetchDonations();
        fetchGoodsRequests();
    }, []);
    const navigate = useNavigate()
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
    return (
        <div>
            <Dashboard screenTitle="Tracking">
                <div className="w-full">
                    <div className="flex px-5 mt-5">
                        <h2 className=" font-semibold text-xl">Requests from Camps</h2>
                    </div>
                    <div className="px-10 w-full mt-4 h-[220px] overflow-y-auto scrollBar">
                        {
                            loading ? (
                                <div className="flex h-full flex-col items-center justify-center">
                                    <div className="flex items-center justify-center">
                                        <TailSpin height="20" width="20" color="#4fa94d" ariaLabel="tail-spin-loading"></TailSpin>
                                    </div>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">SNO</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Goods Needed</TableHead>
                                            <TableHead >Quantity</TableHead>
                                            <TableHead className="text-right">Review</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {goods.map((item, index) => (
                                            <TableRow key={item.SNO}>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell>{item.campName}</TableCell>
                                                <TableCell>{item.goodsNeeded}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell className="text-right"><RequestFromCampPopUp /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )
                        }

                    </div >
                    <div className="flex px-5 mt-5">
                        <h2 className=" font-semibold text-xl">Donations from Public</h2>
                    </div>
                    <div className="px-10 w-full mt-4 h-[220px] overflow-y-auto scrollBar">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">SNO</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Goods Received</TableHead>
                                    <TableHead >Quantity</TableHead>
                                    <TableHead className="text-right">Review</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {goodsReceived.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.goodsNeeded}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell className="text-right"><DonationFromPublicPopUp /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div >

            </Dashboard >
        </div >
    )
}