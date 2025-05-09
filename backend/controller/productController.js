import Product from "../models/productModel.js";
import handleError from "../utlis/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utlis/apiFunctionality.js";
import User from "../models/userModel.js";
//create product
export const createProduct = handleAsyncError(async (req, res, next) => {
   req.body.user = req.user.id
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
 

//get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage=5
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
  console.log(apiFeatures.query)
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


//create and update user review
export const createProductReview=handleAsyncError(async(req,res,next)=>{
  const{comment,rating,productId}=req.body

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
  const product = await Product.findById(req.query.id)
  if(!product){

      return next(new handleError('Product not found',404))

  }

  res.status(200).json({
    success:true,
    reviews : product.reviews
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