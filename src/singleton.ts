import { Database } from "~/main"


/**
 * @description Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.
 * @see https://refactoring.guru/design-patterns/singleton
 */
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