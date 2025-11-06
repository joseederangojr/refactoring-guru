export interface Device<TChannel = number, TVolume = number> {
  setVolume(volume: TVolume): void;
  setChannel(channel: TChannel): void;
  getVolume(): TVolume;
  getChannel(): TChannel;
  setPower(status: "on" | "off"): void;
  getPower(): "on" | "off";
}

export interface Controller {
  power(): void;
  up(): void;
  down(): void;
  next(): void;
  previous(): void;
  mute(): void;
}

export class TV implements Device {
  private volume: number = 0;
  private channel: number = 0;
  private power: "on" | "off" = "off";
  setVolume(volume: number): void {
    if (this.power === "off") {
      return;
    }
    this.volume = volume;
  }

  setChannel(channel: number): void {
    if (this.power === "off") {
      return;
    }
    this.channel = channel;
  }

  getChannel(): number {
    return this.channel;
  }

  getVolume(): number {
    return this.volume;
  }

  setPower(status: "on" | "off") {
    this.power = status;
  }

  getPower(): "on" | "off" {
    return this.power;
  }
}

export class TVRemote implements Controller {
  private static MAX_CHANNEL: number = 100;
  private static MIN_CHANNEL: number = 1;
  private static MAX_VOLUME: number = 100;
  private static MIN_VOLUME: number = 0;
  private lastVolume: number = 0;
  constructor(private readonly device: Device) {}

  power() {
    const nextState = this.isPoweredOn ? "off" : "on";
    this.device.setPower(nextState);
  }

  mute() {
    if (this.isLowestVolume) {
      return this.device.setVolume(this.lastVolume);
    }
    this.lastVolume = this.device.getVolume();
    this.device.setVolume(TVRemote.MIN_VOLUME);
  }

  up() {
    if (this.isMaximumVolume) {
      return;
    }

    this.device.setVolume(this.device.getVolume() + 1);
  }

  down() {
    if (this.isLowestVolume) {
      return;
    }

    this.device.setVolume(this.device.getVolume() - 1);
  }

  next() {
    const channel = this.device.getChannel();
    if (this.isLastChannel) {
      return this.device.setChannel(TVRemote.MIN_CHANNEL);
    }

    this.device.setChannel(channel + 1);
  }

  previous() {
    const channel = this.device.getChannel();
    if (this.isFirstChannel) {
      return this.device.setChannel(TVRemote.MAX_CHANNEL);
    }

    this.device.setChannel(channel - 1);
  }

  get isLastChannel(): boolean {
    return this.device.getChannel() === TVRemote.MAX_CHANNEL;
  }

  get isFirstChannel(): boolean {
    return this.device.getChannel() === TVRemote.MIN_CHANNEL;
  }

  get isMaximumVolume(): boolean {
    return this.device.getVolume() === TVRemote.MAX_VOLUME;
  }

  get isLowestVolume(): boolean {
    return this.device.getVolume() === TVRemote.MIN_VOLUME;
  }

  get isPoweredOn(): boolean {
    return this.device.getPower() === "on";
  }
}
