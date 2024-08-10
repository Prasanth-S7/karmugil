import { Dashboard } from "@/components/custom-component/Dashboard";
import { useContext, useEffect } from "react";
import { SetupInventory } from "@/components/custom-component/setupInventory";
import { DeleteGoodDialog } from "@/components/custom-component/deleteGoodDialog";
import { AddGoodDialog } from "@/components/custom-component/addGoodDialog";
import { useState } from "react";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Component } from "@/components/custom-component/pieChart";
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
import { SetupGoods } from "@/components/custom-component/setUpGoods";
import axios from "axios";

export function Home() {
    const navigate = useNavigate()
    const [inventoryAccess, setInventoryAccess] = useState(false)
    const [addGoodClicked, setAddGoodClicked] = useState(false);
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const onClickHandler = () => {
        setAddGoodClicked(!addGoodClicked);
    }
    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                console.log('token not found')
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

    useEffect(() => {
        const checkInventoryAccess = async () => {
            const res = await axios.get(`http://localhost:3000/manager/inventoryaccess/${token}`)
            if (res.data.access) {
                setInventoryAccess(true)
            }
            else {
                setInventoryAccess(false)
            }
        }
        checkInventoryAccess();
    }, [token])

    useEffect(() => {
        const getGoods = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/goods/getgoods`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data) {
                    setLoading(false)
                    setGoods(res.data.goods)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        getGoods();
    }, [addGoodClicked])

    return (
        <div>
            <Dashboard screenTitle="Home">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-around w-full ">
                        <div className="h-[200px] mt-3  ">
                            <Component goodsTitle="Camp Needs" className=""></Component>
                        </div>
                        <div className="h-[200px] mt-3 ">
                            <Component goodsTitle="Critical Updates" className=""></Component>
                        </div>
                        <div className="h-[200px] mt-3 ">
                            <Card className="flex items-center justify-evenly h-full">
                                <CardHeader>
                                    <SetupGoods></SetupGoods>
                                </CardHeader>
                                <CardContent className="px-4 py-0  flex items-center justify-center">
                                    <MdInventory size={70} />
                                </CardContent>
                            </Card>
                        </div>
                        {inventoryAccess && (
                            <div className="h-[200px] mt-3 ">
                                <Card className="flex items-center justify-evenly h-full">
                                    <CardHeader>
                                        <SetupInventory></SetupInventory>
                                    </CardHeader>
                                    <CardContent className="px-4 py-0  flex items-center justify-center">
                                        <MdInventory size={70} />
                                    </CardContent>
                                </Card>
                            </div>
                        )
                        }

                    </div>
                    <div className="px-10 mt-4 h-[350px] overflow-y-auto scrollBar">
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
                                            <TableHead className="w-[100px]">ItemId</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead >Quantity</TableHead>
                                            <TableHead className="text-right">Edit</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {goods.map((item, index) => (
                                            <TableRow className="h-[50px]" key={item.id}>
                                                <TableCell className="font-medium ">{item.id}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.type}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell className="flex gap-x-2 justify-end items-center h-[50px] ">
                                                    <AddGoodDialog id={item.id}></AddGoodDialog>
                                                    <DeleteGoodDialog id={item.id}></DeleteGoodDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )
                        }
                    </div>
                </div>
            </Dashboard >
        </div >
    )
}