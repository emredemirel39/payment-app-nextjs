// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../lib/mongo"
import Payment from "../../models/Payment";

export default async function handler(req: NextApiRequest , res: NextApiResponse) {

  const { method } = req;
  dbConnect()
  
  switch (method) {
    case 'GET':

      try {
        
        const payments = await Payment.find();
        res.status(200).json(payments)
      } catch (error: any) {
        res.status(500).json({message: error.message})
      }
      
      break;

    case 'POST':
    try {

    const payment = await Payment.create(req.body)

    res
    .status(201)
    .json({
      ReqId: payment._id,
      Amount: payment.Amount
    })
      
    } catch (error) {
      res.status(500).json(error);
      console.error(error)
    }
  }

}



/*
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
*/