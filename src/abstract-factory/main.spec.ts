import { describe, beforeEach, it, expect } from "bun:test";

import {
    CloudProviderManager,
    CloudProviderNotSupportException,
    AWSCloudService,
    AWSNetwork,
    AWSStorage,
    AWSVirtualMachine,
    AzureCloudService,
    AzureNetwork,
    AzureStorage,
    AzureVirtualMachine,
    GoogleCloudService,
    GoogleNetwork,
    GoogleStorage,
    GoogleVirtualMachine,
} from './main'

describe('CloudProviderManager', () => {
    let manager: CloudProviderManager;

    beforeEach(() => {
        manager = new CloudProviderManager();
    });

    it('should launch the app without crashing', () => {
        expect(manager).toBeInstanceOf(CloudProviderManager);
    })

    describe('createCloudProvider', () => {
        it('should throw a CloudProviderNotSupportException if the type is not supported', () => {
            expect(() => manager.createCloudProvider('not-supported')).toThrow(new CloudProviderNotSupportException());
        });

        it('should return an AWSCloudService instance if the type is "aws"', () => {
            const result = manager.createCloudProvider('aws');
            expect(result).toBeInstanceOf(AWSCloudService);
            expect(result.createVirtualMachine()).toBeInstanceOf(AWSVirtualMachine);
            expect(result.createNetwork()).toBeInstanceOf(AWSNetwork);
            expect(result.createStorage()).toBeInstanceOf(AWSStorage);
        });

        it('should return an AzureCloudService instance if the type is "azure"', () => {
            const result = manager.createCloudProvider('azure');
            expect(result).toBeInstanceOf(AzureCloudService);
            expect(result.createVirtualMachine()).toBeInstanceOf(AzureVirtualMachine);
            expect(result.createNetwork()).toBeInstanceOf(AzureNetwork);
            expect(result.createStorage()).toBeInstanceOf(AzureStorage);
        });

        it('should return a GoogleCloudService instance if the type is "google"', () => {
            const result = manager.createCloudProvider('google');
            expect(result).toBeInstanceOf(GoogleCloudService);
            expect(result.createVirtualMachine()).toBeInstanceOf(GoogleVirtualMachine);
            expect(result.createNetwork()).toBeInstanceOf(GoogleNetwork);
            expect(result.createStorage()).toBeInstanceOf(GoogleStorage);
        });
    });
});