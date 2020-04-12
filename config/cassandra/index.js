const cassandra = require('cassandra-driver');
 
const client = new cassandra.Client({
  cloud: { secureConnectBundle: './secure-connect-test-db.zip' },
  keyspace: 'packt',
  credentials : {
        username : 'abhishekdileep99' ,
        password : 'as192sbv'
    }
});
 
const cassandra = await client.connect();
module.exports = cassandra;