const Bar = require('./bar.model');

// get all bars
function getAllBars(req,res){
   Bar.find({}).then((data)=>{
    res.status(200).json(data)
  })
  .catch((err)=>{
    res.status(400).json({
      "message": "unable to get bars"
    })
  })
}

// Create new bar with intital attendee
function createBar(req,res){
  Bar.create({
    bar_id: req.body.bar_id,
    attending: [{
      uid: req.body.uid,
      name: req.body.name
    }]
  }).then((bar)=> {
    res.status(201).json(bar)
  }).catch((err)=> {
    res.status(400).json({
      "message": "unable to create new bar"
    })
  })
}

// add new attendee going to a bar
function addBarAttendee(req,res){
  if(!req.params.barid){
    res.status(404).json({
      "message": "bar id required"
    })
    return
  }
  Bar.findById(req.params.barid)
     .select('attending')
     .exec()
     .then((bar) => {
       bar.attending.push({
         uid: req.body.uid,
         name: req.body.name
       })
       return bar.save();
     })
     .then((bar)=>{
       var attendee = bar.attending[bar.attending.length - 1];
       res.status(201).json(attendee);
     })
     .catch((err)=>{
       res.status(400).json({
         "message": "unable to add new attendee"
       })
     })
}

// delete attendee going to bar
function deleteBarAttendee(req,res){
  if(!req.params.barid && !req.params.attendeeid ){
    res.status(404).json({
      "message" : "bar id and attendee id required"
    })
    return;
  }

  Bar.findById(req.params.barid)
     .select('attending')
     .exec()
     .then((bar)=>{
       if(!(bar.attending.length > 0) || !bar.attending.id(req.params.attendeeid)) {
         res.status(404).json({
           "message" : "no attendee found"
         })
         return
       }

       bar.attending.id(req.params.attendeeid).remove();
       return bar.save();
     })
     .then((bar)=>{
       res.status(204).json(null)
     })
     .catch((err)=>{
       res.status(404).json({
         "message" : "unable to delete attendee"
       })
     })
}

module.exports = { getAllBars, createBar, addBarAttendee, deleteBarAttendee }
