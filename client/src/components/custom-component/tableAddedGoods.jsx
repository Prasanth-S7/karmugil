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
  
  export function TableAddedGoods({goods}) {
    goods = Object.values(goods)
    console.log(goods)
      return (
      <Table>
        <TableCaption>A list of goods that has been added</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SNO</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Item Code</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goods.map((good,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index+1}</TableCell>
              <TableCell>{good['Item Name']}</TableCell>
              <TableCell>{good['Item Code']}</TableCell>
              <TableCell className="text-right">{good['Item Quantity and Unit']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  