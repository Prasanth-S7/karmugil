import express from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library"
export const camp = express.Router()
const prisma = new PrismaClient()
camp.get('/getcampdetails', async (req, res)=>{
    try{
        const camp = await prisma.camp.findMany({
            select:{
                id:true,
                name:true,
                latitude:true,
                longitude:true,
                totalCapacity:true,
                currentCapacity:true,
                address:true,
                createdAt:true,
                updatedAt:true,
                Good:true
            }
        });
        res.status(200).json(camp);
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})

camp.post('/addgoods', async (req, res)=>{
    const { id, goods } = req.body;
    try{
        const res = await prisma.camp.update({
            where:{
                id:id
            },
            data:{
                Good:goods
            }
        })
        res.status(200).json({
            msg:"goods added successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})

camp.post('/requestcamp', async(req, res)=>{
    const {campName, requiredAmount} = req.body;
    const camp = await prisma.campRequests.create({
        data:{
            campName:campName,
            requiredAmount:requiredAmount,
        }
    })
    res.status(200).json({
        msg:"request has been received"
    })
})
camp.get('/getallrequestsfromcamp', async(req, res)=>{
    try{
    const requests = await prisma.campRequests.findMany()
    res.status(200).json(requests)
    }
    catch(error){
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})
camp.post('/goodrequestfromcamp', async(req, res)=>{
    const { campName, goodsNeeded, quantity} = req.body;
    try{
        const request = await prisma.campGoodRequests.create({
            data:{
                campName:campName,
                goodsNeeded:goodsNeeded,
                quantity:quantity
            }
        })
        res.status(200).json({
            msg:"goods request sent"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})

camp.get('/getrequestsfromcamps', async (req, res)=>{
    try{
        const requests = await prisma.campGoodRequests.findMany()
        res.status(200).json(requests)
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})

camp.post('/adddonationsfrompublic', async(req, res)=>{
    const { name, goodsDonated, quantity} = req.body;
    try{
        const request = await prisma.donationsFromPublic.create({
            data:{
                name:name,
                goodsNeeded:goodsDonated,
                quantity:quantity
            }
        })
        res.status(200).json({
            msg:"received your donation"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})

camp.get('/getdonationfrompublic', async (req, res)=>{
    try{
        const requests = await prisma.donationsFromPublic.findMany()
        res.status(200).json(requests)
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})