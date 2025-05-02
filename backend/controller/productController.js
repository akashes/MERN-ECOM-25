import Product from "../models/productModel.js"

export const createProduct =async(req,res)=>{
    try {
   
      const product=  await Product.create(req.body)
      res.status(201).json({
        success:true,
        product
      })
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }

}

export const getAllProducts =async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
        
    }
    
}

