const Yelp = require('yelp');
const rp = require('request-promise');

const yelp = new Yelp({
  consumer_key: process.env.Yelp_Consumer_Key,
  consumer_secret: process.env.Yelp_Consumer_Secret,
  token: process.env.Yelp_Token,
  token_secret: process.env.Yelp_Token_Secret,
});

// change image url string from ms.jpg to get original url image size
function _orginalImageUrl(image_url) {
	return image_url.slice(0,image_url.length - 6) + "o.jpg"
}

// find bars in yelp database
function _yelpDB(location){
  if(!location){
    return Promise.reject({ "message": "location required" });
  }

   return yelp.search({ term:'bar', location: location })
    .then(function (data) {

      var locations = data.businesses.map((business)=> {
        return {
          id: business.id,
          name: business.name,
          image: _orginalImageUrl(business.image_url),
          url: business.url,
          attendance: []
        }
      })

      return locations;
    })
    .catch(function (error) {
       return Promise.reject({"message": "error: " + error});
    });
}

// find bars in local database
function _localDB(){
  return rp('http://localhost:3000/api/bar',{ json: true })
    .then((bar)=>{
      return bar;
    })
    .catch((err)=>{
      return Promise.reject(err);
    })
}

async function getBarInfo(req,res){
  try {
     let yelpData = await _yelpDB(req.query.location);
     let localData = await _localDB();

     let barData = yelpData.map((yelp)=>{
        localData.forEach((local)=>{
          if(yelp.id === local.bar_id){
            yelp._id = local._id;
            yelp.attendance = [...local.attending];
          }
        })
       return yelp;
    })

    res.status(200).json(barData);

  } catch(err) {
    res.status(404).json(err);
  }
}

module.exports = { getBarInfo }
