import Product from "../models/productModel.js"


//create product
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


//get all products
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

//update product
export const updateProduct=async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }
        res.status(200).json({
            success:true,
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}