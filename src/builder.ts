import {
  VirtualMachine,
  Storage,
  Network,
  CloudProvider,
  VirtualMachineNotSupportedException,
  StorageNotSupportedException,
  NetworkNotSupportedException,
} from "~/main";
import { CloudProviderFactory } from "./abstract-factory";

export interface Hosting {
  getVirtualMachine: () => VirtualMachine;
  getStorage: () => Storage;
  getNetwork: () => Network;
}

export interface HostingBuilder {
  setVirtualMachine: (virtualMachine: VirtualMachine) => HostingBuilder;
  setStorage: (storage: Storage) => HostingBuilder;
  setNetwork: (network: Network) => HostingBuilder;
  getCloudHosting: () => Hosting;
}

export type BuildHostingSpec = {
  virtualMachine: CloudProvider;
  storage: CloudProvider;
  network: CloudProvider;
};

export interface HostingDirector {
  makeGoogleHosting: (builder: HostingBuilder) => Hosting;
  makeAzureHosting: (builder: HostingBuilder) => Hosting;
  makeAWSHosting: (builder: HostingBuilder) => Hosting;
  makeHosting: (builder: HostingBuilder, spec: BuildHostingSpec) => Hosting;
}

export class CloudHosting implements Hosting {
  constructor(
    private virtualMachine: VirtualMachine,
    private storage: Storage,
    private network: Network
  ) {}

  getVirtualMachine() {
    return this.virtualMachine;
  }

  getStorage() {
    return this.storage;
  }

  getNetwork() {
    return this.network;
  }
}

/**
 * @description Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.
 * @see https://refactoring.guru/design-patterns/builder
 */
export class CloudHostingBuilder implements HostingBuilder {
  private virtualMachine?: VirtualMachine;
  private storage?: Storage;
  private network?: Network;

  getCloudHosting() {
    const cloudHosting = new CloudHosting(this.virtualMachine!, this.storage!, this.network!);
    this.virtualMachine = this.storage = this.network = undefined;
    return cloudHosting
  }

  setNetwork(network: Network) {
    this.network = network;
    return this;
  }

  setStorage(storage: Storage) {
    this.storage = storage;
    return this;
  }

  setVirtualMachine(virtualMachine: VirtualMachine) {
    this.virtualMachine = virtualMachine;
    return this;
  }
}

export class CloudHostingDirectory implements HostingDirector {
  constructor(private cloudProviderFactory: CloudProviderFactory) {}

  makeGoogleHosting(builder: HostingBuilder) {
    const provider = this.cloudProviderFactory.createCloudProvider("google");
    builder
      .setVirtualMachine(provider.createVirtualMachine())
      .setStorage(provider.createStorage())
      .setNetwork(provider.createNetwork());
    return builder.getCloudHosting();
  }

  makeAzureHosting(builder: HostingBuilder) {
    const provider = this.cloudProviderFactory.createCloudProvider("azure");
    builder
      .setVirtualMachine(provider.createVirtualMachine())
      .setStorage(provider.createStorage())
      .setNetwork(provider.createNetwork());
    return builder.getCloudHosting();
  }

  makeAWSHosting(builder: HostingBuilder) {
    const provider = this.cloudProviderFactory.createCloudProvider("aws");
    builder
      .setVirtualMachine(provider.createVirtualMachine())
      .setStorage(provider.createStorage())
      .setNetwork(provider.createNetwork());
    return builder.getCloudHosting();
  }

  makeHosting(builder: HostingBuilder, spec: BuildHostingSpec) {
    const google = this.cloudProviderFactory.createCloudProvider("google");
    const azure = this.cloudProviderFactory.createCloudProvider("azure");
    const aws = this.cloudProviderFactory.createCloudProvider("aws");

    const providers = { google, azure, aws };
    const virtualMachineProvider = providers[spec.virtualMachine];
    const storageProvider = providers[spec.storage];
    const networkProvider = providers[spec.network];

    if (virtualMachineProvider === undefined) {
      throw new VirtualMachineNotSupportedException();
    }

    if (storageProvider === undefined) {
      throw new StorageNotSupportedException();
    }

    if (networkProvider === undefined) {
      throw new NetworkNotSupportedException();
    }

    builder
      .setVirtualMachine(virtualMachineProvider.createVirtualMachine())
      .setStorage(storageProvider.createStorage())
      .setNetwork(networkProvider.createNetwork());

    return builder.getCloudHosting();
  }
}
