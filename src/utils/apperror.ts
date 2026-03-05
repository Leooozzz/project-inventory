export class AppError extends Error {
    constructor(
        public message:string,
        public statuscCode:number = 400
    ){
        super(message)
        this.name = 'AppError'
        Object.setPrototypeOf(this,AppError.prototype)
    }
}