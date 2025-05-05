const sendResponse = (res, status, result, message, data = null)=>{
    const obj = {result, message}

    if(data){
        obj.data = data
    }

    res.status(status).json(obj)
}

module.exports = {sendResponse}