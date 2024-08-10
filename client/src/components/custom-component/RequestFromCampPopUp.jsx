import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ListAddedGoods } from "./listAddedGoods"
import { useState } from "react";

export function RequestFromCampPopUp() {
    const [campName, setCampName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('');
    const [transportationMode, setTransportationMode] = useState('');
    const [operatorProvided, setOperatorProvided] = useState('');
    const [goods, setGoods] = useState({});

    const handleAddGood = () => {
        const newGoods = {
            ...goods,
            [Object.keys(goods).length + 1]: {
                "Item Code": itemCode,
                "Item Name": itemName,
                "Item Quantity and Unit": itemQuantity,
                "Specify Location": location,
                "Transportation Mode": transportationMode,
                "Operator Provided": operatorProvided
            }
        };
        setGoods(newGoods);
        // Clear the input fields
        setItemCode('');
        setItemName('');
        setItemQuantity('');
        setOperatorProvided('');
    };

    const handleSend = async () => {
        const finalObject = {
            "camp_name": campName,
            ...goods
        };
        console.log(JSON.stringify(finalObject))
        const res = await axios.post('http://192.168.137.163:5000/forms/create_forms', {
            finalObject
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
        console.log(res.data)
        if (res.data.file_url) {
            const link = document.createElement('a');
            link.href = res.data.file_url;
            link.download = res.data.file_url.split('/').pop(); // Extract the file name from the URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up and remove the link
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Goods to the Requested Camp</DialogTitle>
                    <DialogDescription>
                        Make sure to fill all the required details
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="campName" className="text-right">
                            Camp Name
                        </Label>
                        <Input
                            id="campName"
                            className="col-span-3"
                            value={campName}
                            onChange={(e) => setCampName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="itemName" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="itemName"
                            className="col-span-3"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="itemCode" className="text-right">
                            Item Code
                        </Label>
                        <Input
                            id="itemCode"
                            className="col-span-3"
                            value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="itemQuantity" className="text-right">
                            Quantity
                        </Label>
                        <Input
                            id="itemQuantity"
                            className="col-span-3"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input
                            id="address"
                            className="col-span-3"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="operatorProvided" className="text-right">
                            Operator Provided
                        </Label>
                        <Input
                            id="operatorProvided"
                            className="col-span-3"
                            value={operatorProvided}
                            onChange={(e) => setOperatorProvided(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="operatorProvided" className="text-right">
                            Transportation Mode
                        </Label>
                        <Input
                            id="operatorProvided"
                            className="col-span-3"
                            value={transportationMode}
                            onChange={(e) => setTransportationMode(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="addGood" onClick={handleAddGood}><FaPlus /></Button>
                    <ListAddedGoods goods={goods} />
                    <Button type="submit" onClick={handleSend}>Send</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
