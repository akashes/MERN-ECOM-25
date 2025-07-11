import Product from "../models/productModel.js";
import handleError from "../utlis/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utlis/apiFunctionality.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
// import products from "razorpay/dist/types/products.js";
//create product
export const createProduct = handleAsyncError(async (req, res, next) => {
  console.log('inside create product')
  let images=[]
  if(Array.isArray(req.files.image)){

    images = req.files.image
  }else{
    images.push(req.files.image)
  }

  const imageLinks = [];

  for(let i=0;i<images.length;i++){
    const result = await cloudinary.uploader.upload(images[i].tempFilePath,{
      folder: "products",
      // width: 150,
      // crop: "scale",
    })
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }
  req.body.image = imageLinks;

  req.body.user = req.user.id; 
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
 

//get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage=4
  // console.log(req.query)
  const apiFeatures=  new APIFunctionality(Product.find(), req.query).search().filter()
  
  //getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone()
  const totalProducts = await filteredQuery.countDocuments()
  const totalPages = Math.ceil(totalProducts/resultsPerPage)
  const page = Number(req.query.page) || 1
  if(page>totalPages && totalProducts >0){
    //if the product is available but the requested page doesnt exists
    return next(new handleError('This page does not exist',404))
  }
  //applying pagination
  apiFeatures.pagination(resultsPerPage)
  // console.log(apiFeatures.query)
    const products = await apiFeatures.query
    if(!products || products.length===0){
      return next(new handleError('No products found',404))
    }
    res.status(200).json({
      success: true,
      products,
      productCount:totalProducts,
      resultsPerPage,
      totalPages,
      currentPage:page
    });
 
});

//update product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  try {

    let product = await Product.findById(req.params.id);

    if(!product){
      return next(new handleError('Product Not Found',404))
    }

   let  images = Array.isArray(req.files?.image)?
    req.files.image:
    req.files?.image?
    [req.files.image]:
    [];

    if(images.length>0){
      for(let i=0;i<product.image.length;i++){
        await cloudinary.uploader.destroy(product.image[i].public_id)
      }
      const imageLinks = []
      for(let i=0;i<images.length;i++){
        const result = await cloudinary.uploader.upload(images[i].tempFilePath,{
          folder:'products'
        })
        imageLinks.push({
         public_id: result.public_id,
         url: result.secure_url
        })
      }
      console.log(imageLinks)
      req.body = req.body || {};
      req.body.image=imageLinks
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    })

    res.status(200).json({
    success:true,
    product
    })


  //   const product = await Product.findById(req.params.id)
  //   const images = []
  //   if(Array.isArray(req.files.image)){

  //     images=req.files
  //   }else{
  //     images.push(req.files.image)

  //   }
  //   const imageLinks = []
  //   for(let i=0;i<images.length;i++){
  //     const result = await cloudinary.uploader.upload(images[i].tempFilePath,{
  //       folder:'products'
  //     })
  //     imageLinks.push({
  //       public_id:result.public_id,
  //       url:result.secure_url
  //     })
  //   }
  //   const allImageLinks=[...imageLinks,...product.image]

  // let  updateBody ={...req.body,image:allImageLinks}
  //   const updatedProduct = await Product.findByIdAndUpdate(req.params.id,updateBody,{
  //     new:true,
  //     runValidators:true
  //   })
 

    
    // const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!product) {
    //   return next(new handleError("product not found", 404));
    // }
 





    // let  product = await Product.findById(req.params.id)
  } catch (error) {
    console.log(error);
    // res.status(500).json({error})
    next(error);
  }
});

//delete product
export const deleteProduct = handleAsyncError( async (req, res, next) => {


  
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new handleError("product not found", 404));
    }

    for(let i=0;i<product.image.length;i++){
      await cloudinary.uploader.destroy(product.image[i].public_id)
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


//create and update user review
export const createProductReview=handleAsyncError(async(req,res,next)=>{
  console.log('inside create product review')
  const{comment,rating,productId}=req.body
  console.log(comment,rating,productId)

  const reviewObject={
    user:req.user.id,
      name:req.user.name,
      rating:Number(rating),
      comment,
  }
  //check if product exists
  const product = await Product.findById(productId)
  if(!product){

      return next(new handleError('Product does not exist',404))

  }

  //check if user has already reviewed the product
  let reviewExists = product.reviews.find(
    (review) => review.user.toString() === req.user.id.toString()
  )
  if(reviewExists){

    product.reviews.forEach((review)=>{
      if(review.user.toString() === req.user.id.toString()){
        review.comment = comment
        review.rating = rating
      }
    })
  }else{
    product.reviews.push(reviewObject)

  }
  //calculating no of reviews to update and ratings
  product.numOfReviews = product.reviews.length
  
  const totalRatings = product.reviews.reduce((acc, item) => acc + item.rating, 0);
  product.ratings = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;
  

  await product.save({validateBeforeSave:false})



  res.status(200).json({
      success:true,
      message:reviewExists ? 'Review updated successfully' : 'Review added successfully'
})})

export const getProductReviews=handleAsyncError(async(req,res,next)=>{
  console.log('fetching product reviews')
  const product = await Product.findById(req.query.id)
  if(!product){

      return next(new handleError('Product not found',404))

  }
  console.log('successfully fetched product reviews')
  console.log(product.reviews)

  res.status(200).json({
    success:true,
    reviews : product.reviews
  })

})

export const deleteReview=handleAsyncError(async(req,res,next)=>{
  const userId = req.user.id
  const product = await Product.findById(req.query.productId)
  if(!product){

    return next(new handleError('Product not found',404))
  }
  //THIS APPROACH HAS A SLIGHT DISADVANTAGE BECAUSE WE CANT VALIDATE NEW USER REVIEWS SO  USING FINDBYIDANDUPDATE
  //filtering out the review to be deleted
//  product.reviews= product.reviews.filter(review=>review._id.toString()!==req.query.id.toString())
//  //re-calculating review related fields
//  product.numOfReviews=product.reviews.length
//  const totalRatings = product.reviews.reduce((acc, item) => acc + item.rating, 0);
//  product.ratings = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;
//  await product.save({validateBeforeSave:false})

let productReviews = product.reviews.filter(review=>review._id.toString()!==req.query.id.toString())
let numOfReviews=productReviews.length
let totalRatings = productReviews.reduce((acc, item) => acc + item.rating, 0);
let ratings = productReviews.length > 0 ? totalRatings / productReviews.length : 0;
await Product.findByIdAndUpdate(req.query.productId,{reviews:productReviews,numOfReviews,ratings},{new:true,runValidators:true})
 res.status(200).json({
  success:true,
  message:'Review deleted successfully',


})

})
  

//admin getting all products
//separate controller from normal getAllProducts controller because filtering is not needed
export const getAdminProducts = handleAsyncError(async(req,res,next)=>{
  const products = await Product.find()
  res.status(200).json({
    success:true,
    products
  })

})