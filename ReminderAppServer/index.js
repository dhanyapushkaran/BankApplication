const express = require('express')
const session = require('express-session')
const dataservice= require('./services/data.services')
const app = express()
const cors= require('cors')

app.use(cors({
    origin: 'http://localhost:4200',
    credentials:true
}))
app.use(session({
    secret: "randomsecurestring",
    resave: false,
    saveUninitialized: false
}))

const autMiddleWare= (req,res,next)=> {
    if(!req.session.currentAcc){
        return {
            statuscode: 422,
          status: false,
          message: "Please LogIn"
        }
    }
    else{
        next()
    }
}

app.use(express.json())

app.post('/register', (req,res)=>{
   dataservice.register(req.body.uId, req.body.name,req.body.password).then(result=>{
    res.status(result.statuscode).json(result)
   })
   
})
app.post('/login', (req,res)=>{
    dataservice.login(req,req.body.uId, req.body.pswd).then(result=>{
        res.status(result.statuscode).json(result)
    })
    
})

app.post('/saveEvent', autMiddleWare, (req,res)=>{
    dataservice.saveEvent( req, req.body.date, req.body.event)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    
})

app.post('/viewEvents', autMiddleWare, (req,res)=>{
    dataservice.viewEvents(req, req.body.uId)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    
})
app.delete('/deleteAcc/:acno',autMiddleWare, (req,res)=>{
    dataservice.deleteAcc(req.params.acno).then(result=>{
     res.status(result.statuscode).json(result)
    })
    
 })
 app.post('/remind', autMiddleWare, (req,res)=>{
      dataservice.remind(req, req.body.todayDate)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    
})

app.post('/deleteEvent', autMiddleWare, (req,res)=>{
    dataservice.deleteEvent(req, req.body.i)
  .then(result=>{
      res.status(result.statuscode).json(result)
  })
  
})

app.post('/editEvent', autMiddleWare, (req,res)=>{
    dataservice.editEvent(req, req.body.i, req.body.date, req.body.event)
  .then(result=>{
      res.status(result.statuscode).json(result)
  })
  
})
app.listen(3000, ()=>{
    console.log("reminderApp uses port:3000");
})