export interface VirtualMachine {}
export interface Storage {}
export interface Network {}
export interface CloudServiceFactory {
    createVirtualMachine: () => VirtualMachine;
    createStorage: () => Storage;
    createNetwork: () => Network;
}
export interface CloudProviderFactory {
    createCloudProvider: (type: string) => CloudServiceFactory;
}


export class CloudProviderNotSupportException extends Error {}

export class AzureVirtualMachine implements VirtualMachine {}
export class GoogleVirtualMachine implements VirtualMachine {}
export class AWSVirtualMachine implements VirtualMachine {}

export class AzureStorage implements Storage {}
export class GoogleStorage implements Storage {}
export class AWSStorage implements Storage {}

export class AzureNetwork implements Network {}
export class GoogleNetwork implements Network {}
export class AWSNetwork implements Network {}

export class AzureCloudService implements CloudServiceFactory {
    createVirtualMachine() {
        return new AzureVirtualMachine();
    }

    createNetwork() {
        return new AzureNetwork();
    }

    createStorage() {
        return new AzureStorage();
    }
}


export class GoogleCloudService implements CloudServiceFactory {
    createVirtualMachine() {
        return new GoogleVirtualMachine();
    }

    createNetwork() {
        return new GoogleNetwork();
    }

    createStorage() {
        return new GoogleStorage();
    }
}


export class AWSCloudService implements CloudServiceFactory {
    createVirtualMachine() {
        return new AWSVirtualMachine();
    }

    createNetwork() {
        return new AWSNetwork();
    }

    createStorage() {
        return new AWSStorage();
    }
}


export class CloudProviderManager implements CloudProviderFactory {
    createCloudProvider (type: string) {
        switch (type) {
            case 'azure':
                return new AzureCloudService();
            case 'google':
                return new GoogleCloudService();
            case 'aws':
                return new AWSCloudService();
            default:
                throw new CloudProviderNotSupportException
        }
    }
}