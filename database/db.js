import mongoose from "mongoose";

const connection = (URL) =>{
    mongoose.set('strictQuery', false);
    mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Database Connected Succesfully');
    }).catch((e)=>{
        console.log(`Error While Connecting to MongoDB ${e}`)
    })
}

export default connection