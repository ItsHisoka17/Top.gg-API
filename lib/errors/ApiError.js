class APIError extends Error{
    constructor(errM){
        super(errM)
        this.errM = errM;
    }
}
APIError.prototype.name = 'APIError'
module.exports = APIError;