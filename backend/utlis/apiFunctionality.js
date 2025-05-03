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

    filter(){

        const queryCopy ={...this.queryStr}
        const removeFields=['keyword','limit','page']
        removeFields.forEach(key=>delete queryCopy[key])
        console.log(queryCopy)
        //removed all other queries when filtering based on category
        // this.query = this.query.find({...queryCopy,...this.query.getFilter()})
        this.query = this.query.find(queryCopy)
        return this
    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resultPerPage*(currentPage-1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

export default APIFunctionality