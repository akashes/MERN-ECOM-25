import handleError from "../utlis/handleError.js"



export default (err,req,res,next)=>{
    console.log(err)
    //castError
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new handleError(message,404)
    }
    //duplicate error
    if(err.code ===11000){
        const message = `This ${Object.keys(err.keyValue)} already registered . Please login to continue`
        err = new handleError(message,400)
    }
    res.status(err.statusCode||500).json({
        success:false,
        message:err.message || 'Internal Server Error'
    })
}
  

