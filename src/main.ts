export interface VirtualMachine {}
export interface Storage {}
export interface Network {}

export class AzureVirtualMachine implements VirtualMachine {}
export class GoogleVirtualMachine implements VirtualMachine {}
export class AWSVirtualMachine implements VirtualMachine {}

export class AzureStorage implements Storage {}
export class GoogleStorage implements Storage {}
export class AWSStorage implements Storage {}

export class AzureNetwork implements Network {}
export class GoogleNetwork implements Network {}
export class AWSNetwork implements Network {}

export class CloudProviderNotSupportException extends Error {}
export class VirtualMachineNotSupportedException extends Error {}
export class NetworkNotSupportedException extends Error {}
export class StorageNotSupportedException extends Error {}