class ApiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    //search products
    search(){
        const name  = this.queryString.name
                        ? { name: {$regex: this.queryString.name, 
                            $options: "i",},
                        } : {}; //if name is not empty then search by name
        this.query = this.query.find({...name}); //search by name
        return this;
    }

    filter(){
        const queryObj = {...this.queryString}; //get all query string not by reference but by value
        const excludedFields = ['name','page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);//Advanced filtering
        //filtering for price
        let queryStr = JSON.stringify(queryObj); //convert queryObj to string 
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); //replace gte, gt, lte, lt with $gte, $gt, $lte, $lt
        this.query = this.query.find(JSON.parse(queryStr)); //convert string to object
        return this;
    }
    paginate(limit = 15){
        //multplying by number converts string to number
        const page = this.queryString.page * 1 || 1; //if page is not empty then get page number else get 1
        limit = this.queryString.limit * 1 || limit; //if limit is not empty then get limit number else get limit
        if(limit>50) limit = 50; //if limit is more than 100 then limit is 100
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

}

module.exports = ApiFeatures;