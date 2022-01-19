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

}

module.exports = ApiFeatures;