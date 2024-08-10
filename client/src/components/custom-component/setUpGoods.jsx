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
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
async function addGoods(goods) {
    try {
      for (let good of goods) {
        const res = await axios.post('http://localhost:3000/goods/addgood', 
          {
            name: good.name,
            quantity: parseInt(good.quantity),
            type: good.type
          }, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        console.log(`Added: ${res.data}`);
      }
    } catch (error) {
      console.error('Error adding goods:', error);
    }
  }
  const goods = [
    {
      "name": "Water Bottles",
      "quantity": 100,
      "type": "Essential"
    },
    {
      "name": "Canned Food",
      "quantity": 200,
      "type": "Essential"
    },
    {
      "name": "Blankets",
      "quantity": 50,
      "type": "Comfort"
    },
    {
      "name": "First Aid Kits",
      "quantity": 30,
      "type": "Medical"
    },
    {
      "name": "Flashlights",
      "quantity": 70,
      "type": "Tools"
    },
    {
      "name": "Batteries",
      "quantity": 120,
      "type": "Tools"
    },
    {
      "name": "Sanitary Napkins",
      "quantity": 90,
      "type": "Hygiene"
    },
    {
      "name": "Tents",
      "quantity": 20,
      "type": "Shelter"
    },
    {
      "name": "Soap",
      "quantity": 60,
      "type": "Hygiene"
    },
    {
      "name": "Tarpaulins",
      "quantity": 40,
      "type": "Shelter"
    },
    {
      "name": "Medical Gloves",
      "quantity": 150,
      "type": "Medical"
    },
    {
      "name": "Masks",
      "quantity": 200,
      "type": "Medical"
    },
    {
      "name": "Portable Stoves",
      "quantity": 25,
      "type": "Tools"
    },
    {
      "name": "Sleeping Bags",
      "quantity": 35,
      "type": "Comfort"
    },
    {
      "name": "Diapers",
      "quantity": 60,
      "type": "Hygiene"
    }
  ];
  
//   addGoods(goods);

export function SetupGoods({onClickHandler}) {
    const { toast } = useToast();
    const [goodName, setGoodName] = useState("")
    const [goodQuantity, setGoodQuantity] = useState("")
    const [goodType, setGoodType] = useState("")
    const [addGoodClicked, setAddGoodClicked] = useState(false)
    const addGoodHandler = async () => {
        try {
            const res = await axios.post('http://localhost:3000/goods/addgood', {
                "name": goodName,
                "quantity": parseInt(goodQuantity),
                "type": goodType,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
            if (res.statusText === 'OK') {
                toast({
                    title: "Good Added",
                    description: `${goodQuantity} ${goodName} has been added to the inventory`,
                })
                setAddGoodClicked(!addGoodClicked)
            } else {
                toast({
                    title: "Failed to add Good",
                    description: `The specified good cannot be added due to some reason`,
                })
            }
        }
        catch (error) {
            console.log(error)
            toast({
                title: "Failed to add Good",
                description: `Internal Server Error`,
            })
        }
        finally{
            setGoodName("")
            setGoodQuantity("")
            setGoodType("")
        }
    }
    return (
        <Dialog className="w-[400px]">
            <DialogTrigger className="text-md font-semibold">
                <CardTitle> Setup Goods</CardTitle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Setup Goods</DialogTitle>
                    <DialogDescription>
                        Make sure to fill all the required details
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Good Name
                        </Label>
                        <Input
                            value={goodName}
                            onChange={(e) => setGoodName(e.target.value)}
                            id="goodName"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Type
                        </Label>
                        <Input
                            value={goodType}
                            onChange={(e) => setGoodType(e.target.value)}
                            id="type"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Quantity
                        </Label>
                        <Input
                            value={goodQuantity}
                            onChange={(e) => setGoodQuantity(e.target.value)}
                            id="quantity"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => {addGoodHandler()
                        onClickHandler()
                    }} type="submit">Add Good</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>)
}
