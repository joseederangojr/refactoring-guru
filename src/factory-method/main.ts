export interface VirtualMachine {
    boot: () => string;
    restart: () => string;
    shutdown: () => string;
}

export interface VirtualMachineFactory {
    createVirtualMachine: (type: string) => VirtualMachine;
}

export class VirtualMachineNotSupportedException extends Error {}

export class AzureVirtualMachine implements VirtualMachine {
    boot() {
        return 'AzureVirtualMachine: booting...';
    }

    restart() {
        return 'AzureVirtualMachine: restarting...';
    }

    shutdown() {
        return 'AzureVirtualMachine: shutting down...';
    }
}

export class GoogleVirtualMachine implements VirtualMachine {
    boot() {
        return 'GoogleVirtualMachine: booting...';
    }

    restart() {
        return 'GoogleVirtualMachine: restarting...';
    }

    shutdown() {
        return 'GoogleVirtualMachine: shutting down...';
    }
}

export class AWSVirtualMachine implements VirtualMachine {
    boot() {
        return 'AWSVirtualMachine: booting...';
    }

    restart() {
        return 'AWSVirtualMachine: restarting...';
    }

    shutdown() {
        return 'AWSVirtualMachine: shutting down...';
    }
}

export class VirtualMachineManager implements VirtualMachineFactory {
     createVirtualMachine(type: string): VirtualMachine {
        switch (type) {
            case 'azure':
                return new AzureVirtualMachine();
            case 'google':
                return new GoogleVirtualMachine();
            case 'aws':
                return new AWSVirtualMachine();
            default:
                throw new VirtualMachineNotSupportedException
        }
    }
}