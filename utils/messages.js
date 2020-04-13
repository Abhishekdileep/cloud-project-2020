const moment = require('moment');
const dbConnection = require('../config/cassandra/index');
function formatMessage(username, text) {
  let query = 'INSERT INTO chatMessages (name , time , message ) values ( ? , ? , ? )  ';
  let time = moment().format('DD-MM-YYYY:h:mm a');
  dbConnection.execute(query , [ username , text,  time.toString()])
  return {
    username,
    text,
    time: time
  };
}

module.exports = formatMessage;