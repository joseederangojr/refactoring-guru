import { describe, beforeEach, it, expect } from "bun:test";
import {
  AWSVirtualMachine,
  AzureVirtualMachine,
  GoogleVirtualMachine,
  VirtualMachineNotSupportedException,
} from "~/main";
import { VirtualMachineManager } from "~/factory-method";

describe("VirtualMachineManager", () => {
  let manager: VirtualMachineManager;

  beforeEach(() => {
    manager = new VirtualMachineManager();
  });

  it("should launch the app without crashing", () => {
    expect(manager).toBeInstanceOf(VirtualMachineManager);
  });

  describe("createVirtualMachine", () => {
    it("should throw a VirtualMachineNotSupportedException if the type is not supported", () => {
      expect(() => manager.createVirtualMachine("not-supported")).toThrow(
        new VirtualMachineNotSupportedException()
      );
    });

    it('should return an AWSVirtualMachine instance if the type is "aws"', () => {
      const result = manager.createVirtualMachine("aws");
      expect(result).toBeInstanceOf(AWSVirtualMachine);
    });

    it('should return an AzureVirtualMachine instance if the type is "azure"', () => {
      const result = manager.createVirtualMachine("azure");
      expect(result).toBeInstanceOf(AzureVirtualMachine);
    });

    it('should return a GoogleVirtualMachine instance if the type is "google"', () => {
      const result = manager.createVirtualMachine("google");
      expect(result).toBeInstanceOf(GoogleVirtualMachine);
    });
  });
});
