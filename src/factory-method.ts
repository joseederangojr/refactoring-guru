import {
    VirtualMachine,
    AzureVirtualMachine,
    GoogleVirtualMachine,
    AWSVirtualMachine,
    VirtualMachineNotSupportedException,
  } from "~/main";
  
  export interface VirtualMachineFactory {
    createVirtualMachine: (type: string) => VirtualMachine;
  }
  
  /**
   * @description Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
   * @see https://refactoring.guru/design-patterns/factory-method
   */
  export class VirtualMachineManager implements VirtualMachineFactory {
    createVirtualMachine(type: string): VirtualMachine {
      switch (type) {
        case "azure":
          return new AzureVirtualMachine();
        case "google":
          return new GoogleVirtualMachine();
        case "aws":
          return new AWSVirtualMachine();
        default:
          throw new VirtualMachineNotSupportedException();
      }
    }
  }
  