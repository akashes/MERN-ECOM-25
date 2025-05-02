import Product from "../models/productModel.js";
import handleError from "../utlis/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utlis/apiFunctionality.js";
//create product
export const createProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  
  // console.log(req.query)
  const apiFunctionality=  new APIFunctionality(Product.find(), req.query).search().filter()
  
    const products = await apiFunctionality.query
    res.status(200).json({
      success: true,
      products,
    });
 
});

//update product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return next(new handleError("product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
    // let  product = await Product.findById(req.params.id)
  } catch (error) {
    console.log(error);
    // res.status(500).json({error})
    next(error);
  }
});

//delete product
export const deleteProduct = handleAsyncError( async (req, res, next) => {
  
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new handleError("product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
 
})

//get single product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new handleError("product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  
});


export const searchProduct=handleAsyncError(async(req,res,next)=>{
  console.log('inside search')
  const search = req.query.search
  console.log(search)
  const result = await Product.find({
    name:{$regex:search,$options:'i'}
})
res.status(200).json({
  success:true,
  product:result
})


})