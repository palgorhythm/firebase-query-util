const Database = require('./databaseInit');
const tableName = '';

const fetch = async () => {
  const query = Database(tableName).limitToFirst(10).once('value');
  const results = (await query).val();
  console.log(results);
  return;
};

fetch();
