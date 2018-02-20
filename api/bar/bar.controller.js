const Bar = require('./bar.model');

// get all bars in database
function getAllBars(req,res){
   Bar.find({}).then((data)=>{
    res.status(200).json(data)
  })
  .catch((err)=> {
    res.status(400).json({
      "message": "unable to get bars"
    })
  })
}

// Create new bar in database
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

module.exports = { getAllBars, createBar }
