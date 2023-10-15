import { describe, beforeEach, it, expect } from "bun:test";
import {
  AWSNetwork,
  AWSStorage,
  AWSVirtualMachine,
  AzureNetwork,
  AzureStorage,
  AzureVirtualMachine,
  CloudProvider,
  GoogleNetwork,
  GoogleStorage,
  GoogleVirtualMachine,
  NetworkNotSupportedException,
  StorageNotSupportedException,
  VirtualMachineNotSupportedException,
} from "~/main";

import { CloudProviderFactory, CloudProviderManager } from "~/abstract-factory";
import { CloudHostingDirector, BuildHostingSpec, CloudHostingBuilder } from "~/builder";

describe("CloudHostingDirector", () => {
  let cloudProviderFactory: CloudProviderFactory;
  let hostingDirector: CloudHostingDirector;

  beforeEach(() => {
    cloudProviderFactory = new CloudProviderManager();
    hostingDirector = new CloudHostingDirector(cloudProviderFactory);
  });

  describe("makeGoogleHosting", () => {
    it("should create a Google hosting", () => {
      const cloudHosting = hostingDirector.makeGoogleHosting(new CloudHostingBuilder());
      expect(cloudHosting.getVirtualMachine()).toBeInstanceOf(GoogleVirtualMachine);
      expect(cloudHosting.getStorage()).toBeInstanceOf(GoogleStorage);
      expect(cloudHosting.getNetwork()).toBeInstanceOf(GoogleNetwork);
    });
  });

  describe("makeAzureHosting", () => {
    it("should create an Azure hosting", () => {
      const cloudHosting = hostingDirector.makeAzureHosting(new CloudHostingBuilder());
      expect(cloudHosting.getVirtualMachine()).toBeInstanceOf(AzureVirtualMachine);
      expect(cloudHosting.getStorage()).toBeInstanceOf(AzureStorage);
      expect(cloudHosting.getNetwork()).toBeInstanceOf(AzureNetwork);
    });
  });

  describe("makeAWSHosting", () => {
    it("should create an AWS hosting", () => {
      const cloudHosting = hostingDirector.makeAWSHosting(new CloudHostingBuilder());
      expect(cloudHosting.getVirtualMachine()).toBeInstanceOf(AWSVirtualMachine);
      expect(cloudHosting.getStorage()).toBeInstanceOf(AWSStorage);
      expect(cloudHosting.getNetwork()).toBeInstanceOf(AWSNetwork);
    });
  });

  describe("makeHosting", () => {
    it("should create a mixed hosting", () => {
      const spec: BuildHostingSpec = {
        virtualMachine: "google",
        storage: "azure",
        network: "aws",
      };
      const cloudHosting = hostingDirector.makeHosting(new CloudHostingBuilder(), spec);
      expect(cloudHosting.getVirtualMachine()).toBeInstanceOf(GoogleVirtualMachine);
      expect(cloudHosting.getStorage()).toBeInstanceOf(AzureStorage);
      expect(cloudHosting.getNetwork()).toBeInstanceOf(AWSNetwork);
    });


    it("should throw an error for unsupported virtual machine", () => {
      const spec: BuildHostingSpec = {
        virtualMachine: "unsupported" as CloudProvider,
        storage: "google",
        network: "google",
      };
      expect(() => hostingDirector.makeHosting(new CloudHostingBuilder(), spec)).toThrow(
        new VirtualMachineNotSupportedException
      );
    });

    it("should throw an error for unsupported storage", () => {
      const spec: BuildHostingSpec = {
        virtualMachine: "google",
        storage: "unsupported" as CloudProvider,
        network: "google",
      };
      expect(() => hostingDirector.makeHosting(new CloudHostingBuilder(), spec)).toThrow(
        new StorageNotSupportedException
      );
    });

    it("should throw an error for unsupported network", () => {
      const spec: BuildHostingSpec = {
        virtualMachine: "google",
        storage: "google",
        network: "unsupported" as CloudProvider,
      };
      expect(() => hostingDirector.makeHosting(new CloudHostingBuilder(), spec)).toThrow(
        new NetworkNotSupportedException
      );
    });
  });
});