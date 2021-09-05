const mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/reminderAppOne',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const User= mongoose.model('User',{
    uId: Number,
    name:String ,
    password:String,
    events: []
})


module.exports={User}