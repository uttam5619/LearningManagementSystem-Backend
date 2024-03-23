

const errorMiddleware =(err, req, res, next)=>{

    res.status(err.statusCode||500).json(
        { 
            sucess: false,
            message : err.message || ' Something went wrong',
            stack: err.stack
        } 
    );
    next()
}

export default errorMiddleware