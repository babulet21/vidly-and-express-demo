
// POST/api/returns {customerId, movieId}

//return 401 if client is not logged in
//return 400 if customerId is not provided
//return 400 if movieId is not provided
//return 404 if no rental found for this customer/movie
//return 400 if rental already processed
//Return 200 if valid process
//set the return date
//calculate the rental fee
//increase the stock
//Return the rental