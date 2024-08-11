import express from 'express';
const router = express.Router();
import { goods } from './routes/goods.js';
import { inventory } from './routes/inventory.js';
import { camp } from './routes/camp.js';
import axios from 'axios';
import { manager } from './routes/inventoryManager.js';
import { auth } from './middlewares/auth.js';
import cors from 'cors';
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
import { User } from './models/rainfall.js';
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;
const app = express()
app.use(express.json())
app.use(cors())
app.use('/inventory', inventory)
app.use('/goods', goods)
app.use('/manager', manager)
app.use('/camp', camp)
app.get('/api/v1/dashboard', auth, (req, res) => {
  res.json({ msg: "welcome to the dashboard" })
})
const connectToDB = (async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://sai:sai123Sai@cluster0.qcpd6.mongodb.net/Soonu");
    console.log("db connected successfully")
  }
  catch (error) {
    console.log("error happened while connecting to db")
  }
})
connectToDB();

app.get('/getrainfalldetails', async (req, res) => {
  try {
    const details = await User.find({});
    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.post('/getgraphdetails',(req,res)=>{
  const date = req.body['date'];
  const area = req.body['area'];
  let rain;
  console.log(date + area); 
  User.find({'Date':`${date}`+"T00:00:00" , 'Station' : `${area}`}).then(users => {
      if(!users){res.status(400).send("")}else{res.status(200).json({"data":users})}}).catch(error=>{res.status(400).send("")});
 
})

app.get('/fetchfloodper', async (req, res) => {
  const name = req.query.name;
  try {
    if (name === "Chennai Nungambakkam") {
      res.json({ message: "Specific handling for Chennai Nungambakkam" });
    } else {
      const details = await User.findOne({ Station: name });
      if (details) {
        res.json(details);
      } else {
        res.status(404).json({ message: 'No data found for the provided station name' });
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}
);

app.get('/getmapdetails', async (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9,en-IN;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
      'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"'
    }
  };

  axios.request(config)
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
});




const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})