const meets = require('../models/meets');

exports.getMeets = async (req, res) => {
    try {
      let gotMeet = await meets.find();
       res.json(gotMeet);
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  };
  
  
  exports.postMeets = async (req, res) => {
    try {
      console.log('reached server')
       const meet = await meets.create(req.body)
       console.log("body: ", req.body)
       res.send(meet);
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  };
  
  
  exports.deleteMeet = async (req, res) => {
    try {
        await meets.deleteOne({_id : req.params['id']})
        res.sendStatus(204);
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }


  exports.addAttendant = async (req, res) => {
    try {
      const { id, username } = req.body;
      await meets.updateOne({ _id: id }, { $addToSet: { attendants: username } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }

  exports.deleteAttendant = async (req, res) => {
    try {
      const { id, username } = req.body;
        await meets.updateOne({ _id: id }, { $pull: { attendants: username } });
        res.sendStatus(200);
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
      
    }
  }