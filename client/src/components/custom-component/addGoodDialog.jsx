import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IconContext } from "react-icons";
import { IoIosAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '../ui/use-toast';
import axios from "axios";

export function AddGoodDialog({ id }) {
    const { toast } = useToast();
    const [quantity, setQuantity] = useState('');

    async function updateGoodHandler() {
        try {
            const res = await axios.post(`http://localhost:3000/goods/addgood/${id}`,
                {
                    quantity: parseInt(quantity)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(`Updated: ${res.data}`);
            if (res.status === 200) {
                toast({
                    title: "Add Good Status",
                    description: `Goods Added successfully. Please refresh the page to view the changes`,
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `Internal Server Error`,
            })
            console.error('Error updating good quantity:', error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <IconContext.Provider value={{ className: "Icon" }}>
                        <IoIosAdd size={20} />
                    </IconContext.Provider>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Goods</DialogTitle>
                    <DialogDescription>
                        Enter the number of goods to add
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                            Quantity
                        </Label>
                        <Input
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={updateGoodHandler}>Update Good</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
