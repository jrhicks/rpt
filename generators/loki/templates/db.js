import LokiJS from 'lokijs';
// import lokiIndexedAdapter from 'lokiIndexedAdapter';
// let idbAdapter = new lokiIndexedAdapter('idb');

const loki = new LokiJS('LokiJSDB',
  {
    autosave: true,
    autosaveInterval: 1000,
    persistenceMethod: 'localStorage',
    env: 'BROWSER',
  });

loki.loadDatabase({}, (result) => {
  console.log('Done Loading Data From Local Storage');
});


const db = {
  loki,
};

export default db;
