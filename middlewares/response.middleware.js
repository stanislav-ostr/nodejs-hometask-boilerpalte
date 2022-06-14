const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    if (res.data){
        res.status(200);
        res.json(res.data);
    } else if (res.err) {
        res.status(400);
        res.json({error: true, message: res.err.message});
    } else {
        res.status(404);
        res.json({error: true, message: 'Data not found'});
    }

    next();
}

exports.responseMiddleware = responseMiddleware;