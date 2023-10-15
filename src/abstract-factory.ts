
import {
    Network,
    Storage,
    VirtualMachine,
    AzureNetwork,
    AWSNetwork,
    GoogleNetwork,
    AWSStorage,
    AzureStorage,
    GoogleStorage,
    AzureVirtualMachine,
    AWSVirtualMachine,
    GoogleVirtualMachine,
    CloudProviderNotSupportException,
    CloudProvider
  } from "~/main";
  
  export interface CloudServiceFactory {
    createVirtualMachine: () => VirtualMachine;
    createStorage: () => Storage;
    createNetwork: () => Network;
  }
  
  export interface CloudProviderFactory {
    createCloudProvider: (type: CloudProvider) => CloudServiceFactory;
  }
  
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
  
/**
 * @description Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.
 * @see https://refactoring.guru/design-patterns/abstract-factory
 */
  export class CloudProviderManager implements CloudProviderFactory {
    createCloudProvider(type: CloudProvider) {
      switch (type) {
        case "azure":
          return new AzureCloudService();
        case "google":
          return new GoogleCloudService();
        case "aws":
          return new AWSCloudService();
        default:
          throw new CloudProviderNotSupportException();
      }
    }
  }
  