const Database = require('./databaseInit');

const fetch = async () => {
  const query = Database('/shipment').limitToFirst(10).once('value');
  console.log('query', Database('/shipment').limitToFirst(10).once('value'));
  const results = (await query).val();
  console.log(results);
  return;
};

fetch();
