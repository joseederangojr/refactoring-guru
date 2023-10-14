import { describe, beforeEach, it, expect } from "bun:test";
import {
  VirtualMachineFactory,
  VirtualMachine,
  VirtualMachineManager,
  AWSVirtualMachine,
  AzureVirtualMachine,
  GoogleVirtualMachine,
  VirtualMachineNotSupportedException
} from './main'
import exp from "constants";

describe('VirtualMachineManager', () => {
  let manager: VirtualMachineManager;

  beforeEach(() => {
    manager = new VirtualMachineManager();
  });

  it('should launch the app without crashing', () => {
    expect(manager).toBeInstanceOf(VirtualMachineManager);
  })

  describe('createVirtualMachine', () => {
    it('should throw a VirtualMachineNotSupportedException if the type is not supported', () => {
      expect(() => manager.createVirtualMachine('not-supported')).toThrow(new VirtualMachineNotSupportedException());
    });

    it('should return an AWSVirtualMachine instance if the type is "aws"', () => {
      const result = manager.createVirtualMachine('aws');
      expect(result).toBeInstanceOf(AWSVirtualMachine);
      expect(result.boot()).toBe('AWSVirtualMachine: booting...');
      expect(result.restart()).toBe('AWSVirtualMachine: restarting...');
      expect(result.shutdown()).toBe('AWSVirtualMachine: shutting down...');
    });

    it('should return an AzureVirtualMachine instance if the type is "azure"', () => {
      const result = manager.createVirtualMachine('azure');
      expect(result).toBeInstanceOf(AzureVirtualMachine);
      expect(result.boot()).toBe('AzureVirtualMachine: booting...');
      expect(result.restart()).toBe('AzureVirtualMachine: restarting...');
      expect(result.shutdown()).toBe('AzureVirtualMachine: shutting down...');
    });

    it('should return a GoogleVirtualMachine instance if the type is "google"', () => {
      const result = manager.createVirtualMachine('google');
      expect(result).toBeInstanceOf(GoogleVirtualMachine);
      expect(result.boot()).toBe('GoogleVirtualMachine: booting...');
      expect(result.restart()).toBe('GoogleVirtualMachine: restarting...');
      expect(result.shutdown()).toBe('GoogleVirtualMachine: shutting down...');
    });
  });
});