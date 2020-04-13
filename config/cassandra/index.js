const cassandra = require('cassandra-driver');
 
const client = new cassandra.Client({
  cloud: { secureConnectBundle: './config/cassandra/secure-connect-test-db.zip' },
  keyspace: 'packt',
  credentials : {
        username : 'abhishekdileep99' ,
        password : 'as192sbv'
    }
});
 
 client.connect().then(()=> {
  console.log('Connected to  Cassandra ')
});
module.exports = client;