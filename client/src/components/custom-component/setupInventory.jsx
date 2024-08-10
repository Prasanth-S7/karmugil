import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "../ui/use-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from "axios"

export function SetupInventory() {
    const { toast } = useToast();
    const [inventoryName, setInventoryName] = useState("")
    const [inventoryAddress, setInventoryAddress] = useState("")
    const [authorityIncharge, setAuthorityIncharge] = useState("")
    const [inventoryManager, setInventoryManager] = useState("")
    const [managerAddress, setManagerAddress] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const addInventoryHandler = async () => {
        try {
            console.log(authorityIncharge)
            const res = await axios.post('http://localhost:3000/inventory/addinventory', {
                "inventoryName": inventoryName,
                "inventoryAddress": inventoryAddress,
                "authorityIncharge": authorityIncharge,
                "inventoryManager": inventoryManager,
                "managerAddress": managerAddress,
                "mailId": email,
                "contact": contact
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.statusText === 'OK') {
                toast({
                    title: "Inventory Created",
                    description: `${inventoryName} has been created`,
                })
            } else {
                toast({
                    title: "Failed to create inventory",
                    description: `The inventory cannot be created due to some specific errors`,
                })
            }
        }
        catch (error) {
            toast({
                title: "Failed to create inventory",
                description: `Internal Server Error`,
            })
        }
    }
    return (
        <Dialog className="w-[600px]">
            <DialogTrigger className="text-md font-semibold">
                <CardTitle> Setup Inventory </CardTitle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Setup Inventory</DialogTitle>
                    <DialogDescription>
                        Make sure to fill all the required details
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Inventory Name
                        </Label>
                        <Input
                            onChange={(e) => setInventoryName(e.target.value)}
                            id="inventoryName"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Inventory Address
                        </Label>
                        <Input
                            onChange={(e) => setInventoryAddress(e.target.value)}
                            id="inventoryAddress"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="username" className="text-right">
                            Authority Incharge
                        </Label>
                        {/* <Input
                            onChange={(e) => setAuthorityIncharge(e.target.value)}
                            id="authorityIncharge"
                            className="col-span-3"
                        /> */}
                        <RadioGroup defaultValue = "" onValueChange={(option)=>{
                            console.log(option)
                            setAuthorityIncharge(option)}
                        }>
                            <div className="flex space-x-4 w-full my-2">
                                <div className="flex items-center space-x-2 w-32">
                                    <RadioGroupItem value="govt" id="govt"/>
                                    <Label htmlFor="govt" >Government</Label>
                                </div>
                                <div className="flex items-center space-x-2 w-32">
                                    <RadioGroupItem value="ngo" id="ngo"/>
                                    <Label htmlFor="ngo">NGO</Label>
                                </div>
                                <div className="flex items-center space-x-2 w-32">
                                    <RadioGroupItem value="private" id="private"/>
                                    <Label htmlFor="private">Private</Label>
                                </div>
                            </div>
                        </RadioGroup>

                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Inventory Manager
                        </Label>
                        <Input
                            onChange={(e) => setInventoryManager(e.target.value)}
                            id="InvenoryManager"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Manager Address
                        </Label>
                        <Input
                            onChange={(e) => setManagerAddress(e.target.value)}
                            id="managerAddress"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right" >
                            Contact
                        </Label>
                        <Input
                            onChange={(e) => setContact(e.target.value)}
                            id="contact"
                            type="tel"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Email
                        </Label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => addInventoryHandler()} type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>)
}
