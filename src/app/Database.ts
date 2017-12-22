import { DataSet } from './DataComponent'

export class Database
{
    private static readonly DATASTORE_NAME = "datasets";

    private static db;
    private static queue: any[] = [];
    
    constructor()
    {
        let openRequest = indexedDB.open("bs-dashboard-data-v0", 1);
        openRequest.onupgradeneeded = this.onUpgradeNeeded.bind(this);
        
        openRequest.onsuccess = this.onSuccess.bind(this);
        openRequest.onerror = this.onError;

    }

    public static readDataSet(query: string, callback)
    {
        if(Database.db == undefined)
        {    
            Database.queue.push({'query': query, 'callback': callback});
            return;
        }
        
        let transaction = Database.db.transaction([Database.DATASTORE_NAME], "readwrite");
        let store = transaction.objectStore(Database.DATASTORE_NAME);
        let request = store.get(query);

        request.onsuccess = function(event)
        {
            //TODO: Test!
            // If a key is not found in the database the result will be undefined
            if(event.target.result != undefined)
            {
                callback(event.target.result);
            }
            else
            {
                console.warn("No result returned from the database with key: " + query);
            }
            
        }
    }

    public static storeDataSet(query: string, dataSet: DataSet)
    {
        let transaction = Database.db.transaction([Database.DATASTORE_NAME], "readwrite");
        let store = transaction.objectStore(Database.DATASTORE_NAME);
        let request = store.put(dataSet, query);
    }

    private onUpgradeNeeded(event: any) {
            console.log("Upgrading...");
            let db = event.target.result;

            if(!db.objectStoreNames.contains(Database.DATASTORE_NAME)) {
                db.createObjectStore(Database.DATASTORE_NAME);
            }
        }
    
    private onSuccess(event)
    {
        Database.db = event.target.result;

        for(let item of Database.queue)
        {
            Database.readDataSet(item.query, item.callback);
        }
    }

    private onError(event)
    {
        console.log("Error");
        console.dir(event);
    };
}
