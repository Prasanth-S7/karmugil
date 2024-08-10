import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IconContext } from "react-icons"
import { MdDelete } from "react-icons/md"
import { useState } from "react"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function DeleteGoodDialog({ id }) {
    const { toast} = useToast()
    const [quantity, setQuantity] = useState('');
    async function updateGoodHandler() {
        try {
            const res = await axios.post(`http://localhost:3000/goods/deletegood/${id}`,
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
                    title: "Update Good Status",
                    description: `Goods Updated successfully. Please refresh the page to view the changes`,
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
                        <MdDelete size={20} />
                    </IconContext.Provider></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Goods</DialogTitle>
                    <DialogDescription>
                        Enter the number of goods to delete
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Quantity
                        </Label>
                        <Input
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            id="quantity"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={updateGoodHandler}>Update Good</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
