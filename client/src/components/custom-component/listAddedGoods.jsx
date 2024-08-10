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
import { TableAddedGoods } from "./tableAddedGoods"
export function ListAddedGoods({ goods }) {
    console.log(goods)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View Added Goods</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Edit profile</DialogTitle>
                <TableAddedGoods goods={goods}></TableAddedGoods>
            </DialogContent>
        </Dialog>
    )
}
