import express from 'express';
import { generatePassword } from '../utils/generatePassoword.js';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middlewares/auth.js';
import nodemailer from 'nodemailer'
export const inventory = express.Router();
const prisma = new PrismaClient()
inventory.get('/getinventories', async (req, res) => {
    try {
        const inventories = await prisma.inventory.findMany({
            select: {
                id: true,
                inventoryName:true,
                inventoryAddress: true,
                authorityIncharge: true,
                inventoryManager: true
            }
        })
        res.status(200).json(inventories)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})

inventory.get('/getinventory/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const inventory = await prisma.inventory.findFirst({
            where: {
                id: parseInt(id)
            },
            select: {
                inventoryName:true,
                inventoryAddress: true,
                authorityIncharge: true,
                inventoryManager: true,
                setUpInventoryAccess: true,
                contact: true,
                mailId: true,
                createdAt: true,
                goods: true
            }
        })
    res.json(inventory)
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})
inventory.post('/addinventory', auth, async (req, res) => {
    const { inventoryName, inventoryAddress, authorityIncharge, inventoryManager, managerAddress, contact, mailId } = req.body;
    let password = generatePassword(8);
    let transporter = nodemailer.createTransport({
        service: 'localhost',
        port: 1025,
        secure: false
    });

    let mailOptions = {
        from: 'karmugil@example.com',
        to: `${mailId}`,
        subject: 'Your Inventory Details',
        text: `Hello!
    
    Here are your inventory details:
    
    Username: ${inventoryManager}
    Password: ${password}
    
    Please change your password after logging in.
    
    Best regards,
    Karmugil`,
        html: `<h1>Hi there!</h1>
    <p>Here are your inventory details:</p>
    <ul>
        <li><strong>Username:</strong> ${inventoryManager}</li>
        <li><strong>Password:</strong> ${password}</li>
    </ul>
    <p>Please change your password after logging in.</p>
    <p>Best regards,<br>Karmugil</p>`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return console.log(error);
        }
        else {
            try {
                const inventory = await prisma.inventory.create({
                    data: {
                        inventoryName: inventoryName,
                        inventoryAddress: inventoryAddress,
                        authorityIncharge: authorityIncharge.toUpperCase(),
                        inventoryManager: inventoryManager,
                        Manageraddress: managerAddress,
                        contact: contact,
                        mailId: mailId,
                        password: password
                    }
                })
                res.json({
                    msg: inventory.id
                })
            }
            catch (error) {
                console.log(error)
            }

        }
    });
})

