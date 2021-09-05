const db = require('./db')

users = {
    1000: { uId: 1000, name: "jio", password: "jio", events: [] },
}


const login = (req, uId, pswd) => {
    return db.User.findOne({
        uId,
        password: pswd
    }).then(user => {
        if (user) {
            req.session.currentAcc = user.uId
            console.log(req.session.currentAcc);
            return {
                statuscode: 200,
                status: true,
                message: "login Successful",
                currentAcc: user.uId,
                userName: user.name
            }

        }
        else {
            return {
                statuscode: 422,
                status: false,
                message: "invalid account number"
            }
        }
    })

}

const register = (uId, name, password) => {
    return db.User.findOne({
        uId
    }).then(user => {
        if (user) {
            return {
                statuscode: 422,
                status: false,
                message: "user already exist"
            }
        }
        else {
            const newUser = new db.User({
                uId, name, password, events: []
            })
            newUser.save()
            return {
                statuscode: 200,
                status: true,
                message: "Register Successful"
            }
        }
    })


}
const saveEvent = (req, date, event) => {
    return db.User.findOne({
        uId: req.session.currentAcc
    })
        .then(user => {
            if (user) {
                user.events.push({
                    date, event
                })
                user.save()
                return {
                    statuscode: 200,
                    status: true,
                    events: user.events,
                    message: "event saved successfully"
                }
            }
        })
}

const viewEvents = (req, uId) => {
    return db.User.findOne({
        uId
    })
        .then(user => {
            if (user) {
                return {
                    statuscode: 200,
                    status: true,
                    events: user.events
                }
            }
            else {
                return {
                    statuscode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
        })

}
const deleteAcc = (acno) => {
    return db.User.deleteOne({
        uId: acno
    })
        .then(user => {
            if (user) {
                return {
                    statuscode: 200,
                    status: true,
                    message: "Account deleted successfully"
                }
            }
            else {
                return {
                    statuscode: 422,
                    status: false,
                    message: "invalid operation"
                }
            }
        })
}
const remind = (req, todayDate) => {
    return db.User.findOne({
        uId: req.session.currentAcc
    })
        .then(user => {
            TodayEvents = []
            if (user) {
                let events = user.events
                for (let event of events) {
                    console.log(event);
                    console.log(todayDate);
                    if (todayDate == event.date) {
                        TodayEvents.push(event)
                        console.log(event)
                        console.log(TodayEvents)
                    }

                }
                // tEvents=JSON.stringify(TodayEvents)
                return {
                    statuscode: 200,
                    status: true,
                    TodayEvents: TodayEvents,
                    message: "today events"
                }
            }
            else {
                return {
                    statuscode: 422,
                    status: false,
                    message: "invalid operation"
                }
            }
        })
}

// const deleteEvent= (req, eventName)=>{

//     return db.User.updateOne({

//     }, {$pull: {events: {event:eventName}}}, 
//         {multi: true})
//         .then(user => {
//             if (user) {
//                 console.log(user);
//                 return {
//                     statuscode: 200,
//                     status: true,
//                     events:user.events,
//                     message: "Event deleted successfully"
//                 }
//             }
//             else {
//                 return {
//                     statuscode: 422,
//                     status: false,
//                     message: "invalid operation"
//                 }
//             }
//         })
// }

const deleteEvent = (req, i) => {

    return db.User.findOne({
        uId: req.session.currentAcc
    })
        .then(user => {
            if (user) {
                console.log(user.events);
                let arr = user.events
                user.events.splice(i, 1)
                console.log(user.events);
                user.save()
                return {
                    statuscode: 200,
                    status: true,
                    events: user.events,
                    message: "Event deleted successfully"
                }
            }
            else {
                return {
                    statuscode: 422,
                    status: false,
                    message: "invalid operation"
                }
            }
        })
}

const editEvent = (req, i, date, event)=>{
    return db.User.findOne({
        uId: req.session.currentAcc
    })
        .then(user => {
            if (user) {
                console.log(user.events);
                let arr = user.events
                user.events.splice(i, 1, {
                    date, event
                })
                console.log(user.events);
                user.save()
                return {
                    statuscode: 200,
                    status: true,
                    events: user.events,
                    message: "Event updated successfully"
                }
            }
            else {
                return {
                    statuscode: 422,
                    status: false,
                    message: "invalid operation"
                }
            }
        })
}
module.exports = { viewEvents, saveEvent, login, register, deleteAcc, remind, deleteEvent, editEvent }