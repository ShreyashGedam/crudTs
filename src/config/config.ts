import mongoose, { connect } from "mongoose";

function connects() {
    // return connect('mongodb+srv://Shreyash:shreyash1234@cluster0.eyxgk.mongodb.net/?retryWrites=true&w=majority')
    return connect('mongodb://localhost:27017/typescript')
        .then(() => {
            console.log("Connected to the Database")

        })  
        .catch((err) => {
            console.log(err)
        })
}

export { connects }