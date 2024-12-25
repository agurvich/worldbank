import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

const MANUAL_BUNDLES = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: mvp_worker,
    },
    eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: eh_worker,
    },
};

class DuckDBManager {
    constructor() {
        this.dbInstance = null;
        this.registeredFiles = new Map(); // Tracks registered files by file name
    }

    async initialize() {
        if (!this.dbInstance) {
            // Select the appropriate bundle for the environment
            const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
    
            // Create the worker and logger
            const worker = new Worker(bundle.mainWorker);
            const logger = new duckdb.ConsoleLogger();
    
            // Initialize the DuckDB instance
            const db = new duckdb.AsyncDuckDB(logger, worker);
            await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    
            this.dbInstance = db;
        }
        return this.dbInstance;
    }

    // Ensure a file is registered
    async ensureFileRegistered(filePath) {
        const db = await this.initialize();
        const fileName = filePath.split('/').pop();

        if (!this.registeredFiles.has(fileName)) {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch Parquet file from ${filePath}`);
            }
            const fileBuffer = await response.arrayBuffer();

            await db.registerFileBuffer(fileName, new Uint8Array(fileBuffer));
            this.registeredFiles.set(fileName, filePath);
        }

        return fileName; // Return the file name for querying
    }

    // Unregister a file
    async unregisterFile(fileName) {
        if (this.registeredFiles.has(fileName)) {
            const db = await this.initialize();
            await db.unregisterFile(fileName);
            this.registeredFiles.delete(fileName);
        }
    }

    // Cleanup all registered files
    async cleanup() {
        const db = await this.initialize();
        for (const fileName of this.registeredFiles.keys()) {
            await db.unregisterFile(fileName);
        }
        this.registeredFiles.clear();
    }
}

export const duckDBManager = new DuckDBManager();


export async function runThisQuery(filePath, queryFn) {
    // initialize or retrieve the duck db instance
    const db = await duckDBManager.initialize();
    // register the file if it hasn't been registered
    const fileName = await duckDBManager.ensureFileRegistered(filePath);

    // Execute the query logic with the DuckDB instance and registered file name
    try {
        return await queryFn(db, fileName);
    } catch (error) {
        console.error('Error running query:', error);
        throw error;
    }
}