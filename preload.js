const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  fetchMessaggio: async () => {
    const res = await fetch('http://localhost:3001/api/messaggio');
    const data = await res.json();
    return data.messaggio;
  }
});
