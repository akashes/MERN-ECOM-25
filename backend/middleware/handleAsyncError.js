export default(myErrorFunc)=>(req,res,next)=>{


    Promise.resolve(myErrorFunc(req,res,next)).catch(next)

    
}
//wrapping the controller/myErrorFunc function and returing a 
// new function 