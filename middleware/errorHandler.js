const {constants}=require('../errorConstants.js')
const errorHandler=(error, request,response,next)=>{
    const statusCode= response.statusCode?response.statusCode:500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            response.json({
                title:"Validation Error",
                message:error.message, 
                stackTrace:error.stack
            });
            break;
        case constants.UNAUTHORIZED:
            response.json({
                title:"Unauthorized Access",
                message:error.message, 
                stackTrace:error.stack
            });
            break;
        case constants.FORBIDDEN:
            response.json({
                title:"Forbidden Access",
                message:error.message, 
                stackTrace:error.stack
            });
            break;  
        case constants.NOT_FOUND:
            response.json({
                title:"Not Found",
                message:error.message, 
                stackTrace:error.stack
            });
            break;   
        default: console.log("No errors! Ok")
            break;
    }

    response.json({message:error.message , stackTrace:error.stack})
}

module.exports=errorHandler;