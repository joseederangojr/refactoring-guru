import { Database } from "~/main"


export class AzureDatabase  {
    private static instance: Database

    private constructor() {}

    static create(): Database {
        if (!AzureDatabase.instance) {
            AzureDatabase.instance = new AzureDatabase()
        }

        return AzureDatabase.instance
    }
}