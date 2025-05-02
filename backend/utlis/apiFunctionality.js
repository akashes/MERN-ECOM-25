class APIFunctionality{
    constructor(query,queryStr){
        this.query=query   //mongodb query
        this.queryStr=queryStr //query string
    }
    search(){
        const keyword = this.queryStr.keyword ?{
            name:{
                $regex: this.queryStr.keyword,
                $options:'i'
            }
        }: {}
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this
        // When a method inside a class returns this, it means it's returning the current instance of the class. 
        // This allows you to call another method on the same object immediately after.
    }
}

export default APIFunctionality