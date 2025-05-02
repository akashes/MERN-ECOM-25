import handleError from "../utlis/handleError.js"



export default (err,req,res,next)=>{
    //castError
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new handleError(message,404)
    }
    res.status(err.statusCode||500).json({
        success:false,
        message:err.message || 'Internal Server Error'
    })
}
  

