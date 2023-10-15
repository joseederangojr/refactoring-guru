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
  