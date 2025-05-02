import Product from "../models/productModel.js"
import handleError from "../utlis/handleError.js"


//create product
export const createProduct =async(req,res,next)=>{
    try {
   
      const product=  await Product.create(req.body)
      res.status(201).json({
        success:true,
        product
      })
    } catch (error) {
        console.log(error)
        next(error)
    }

}


//get all products
export const getAllProducts =async(req,res,next)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
       next(error)
        
    }
    
}

//update product
export const updateProduct=async(req,res,next)=>{
    console.log('inside')
    try {
        
        const product =await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!product){
         
            return next(new handleError('product not found',404))
      
        }
        res.status(200).json({
            success:true,
            product
        })
        // let  product = await Product.findById(req.params.id)
        
    } catch (error) {
        console.log(error)
        // res.status(500).json({error})
        next(error)
    }
}

//delete product
export const deleteProduct = async(req,res,next)=>{
    try {
        const  product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
           return next(new handleError('product not found',404))
            
        }
       
        res.status(200).json({
            success:true,
            message:"product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


//get single product
export const getSingleProduct = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            return next(new handleError('product not found',404))
        }
    
        res.status(200).json({ 
            success:true, 
            product
        })
        
    } catch (error) {
        console.log(error)
       next(error)
        
    }
}