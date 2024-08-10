import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middlewares/auth.js';
export const goods = express.Router();
const prisma = new PrismaClient();
goods.post('/addgood', auth, async (req, res) => {
    const { name, type, quantity } = req.body;
    try {
        const inventoryId = await prisma.inventory.findFirst({
            where: {
                inventoryManager: req.userDetails.username,
            },
            select: {
                id: true
            }
        })
        const good = await prisma.good.create({
            data: {
                name: name,
                quantity: quantity,
                type: type,
                inventoryId: inventoryId.id
            }
        })
        res.json({
            id: good.id
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})

goods.get('/getgoods', auth, async (req, res) => {
    try {
        const inventoryId = await prisma.inventory.findFirst({
            where: {
                inventoryManager: req.userDetails.username,
            },
            select: {
                id: true
            }
        })
        const good = await prisma.good.findMany({
            where: {
                inventoryId: inventoryId.id
            }, select: {
                id: true,
                name: true,
                type: true,
                quantity: true,

            }
        })
        res.status(200).json({
            goods: good
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})

goods.post('/addgood/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const quantity = req.body.quantity;

        // Fetch the current good from the database
        const good = await prisma.good.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!good) {
            return res.status(404).json({
                msg: "Good not found"
            });
        }
        const updatedGood = await prisma.good.update({
            where: {
                id: parseInt(id)
            },
            data: {
                quantity: good.quantity + quantity
            }
        });

        res.status(200).json({
            msg: "Good updated successfully",
            updatedGood
        });
    } catch (error) {
        console.error("Error updating good:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

goods.post('/deletegood/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const quantity = req.body.quantity;

        // Fetch the current good from the database
        const good = await prisma.good.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!good) {
            return res.status(404).json({
                msg: "Good not found"
            });
        }
        const updatedGood = await prisma.good.update({
            where: {
                id: parseInt(id)
            },
            data: {
                quantity: good.quantity - quantity
            }
        });

        res.status(200).json({
            msg: "Good updated successfully",
            updatedGood
        });
    } catch (error) {
        console.error("Error updating good:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

