export type CloudProvider = 'google' | 'azure' | 'aws'
export interface VirtualMachine {}
export interface Storage {}
export interface Network {}
export interface Database {}

export class AzureVirtualMachine implements VirtualMachine {}
export class GoogleVirtualMachine implements VirtualMachine {}
export class AWSVirtualMachine implements VirtualMachine {}

export class AzureStorage implements Storage {}
export class GoogleStorage implements Storage {}
export class AWSStorage implements Storage {}

export class AzureNetwork implements Network {}
export class GoogleNetwork implements Network {}
export class AWSNetwork implements Network {}

export class AzureDatabase implements Database {}
export class GoogleDatabase implements Database {}
export class AWSDatabase implements Database {}

export class CloudProviderNotSupportException extends Error {}
export class VirtualMachineNotSupportedException extends Error {}
export class NetworkNotSupportedException extends Error {}
export class StorageNotSupportedException extends Error {}