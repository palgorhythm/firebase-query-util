const util = require('util');
const Database = require('./databaseInit');
const { errorMonitor } = require('stream');

const log = (myObject) => {
  console.log(util.inspect(myObject, false, null, true /* enable colors */));
};

const dictionaryToArray = (dictionary) => {
  const keys = Object.keys(dictionary);
  const results = [];
  for (const key of keys) {
    const currentResult = { key, data: dictionary[key] };
    results.push(currentResult);
  }
  return results;
};

const fetchBatchFromTable = async (tableName, batchSize) => {
  const query = Database(tableName)
    .orderByKey()
    .limitToFirst(batchSize)
    .once('value');
  const resultDict = (await query).val();
  return dictionaryToArray(resultDict);
};

const query = async (tableName, batchSize, filterFunc, stringToLog) => {
  if(batchSize > 5000){
    throw Error('max batch size 5000!!')
  }
  const results = await fetchBatchFromTable(tableName, batchSize);
  const filteredResults = filterFunc(results);

  console.log(
    `~~~~~~~~~~~~~~~~~${filteredResults.length} RESULTS RETURNED FOR QUERY: ${stringToLog}~~~~~~~~~~~~~~~~~~~~`
  );
  return filteredResults;
};

const genericFilter = (condition) => {
  return (results) =>
    results.filter((result) => {
      return condition(result);
    });
};

module.exports = { query, genericFilter, log, dictionaryToArray };
