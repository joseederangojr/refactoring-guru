import { describe, it, expect, beforeEach } from "bun:test";
import { type Device, type Controller, TV, TVRemote } from "~/bridge";

describe("TV", () => {
  let tv: Device;

  beforeEach(() => {
    tv = new TV();
  });

  describe("initial state", () => {
    it("should be off", () => {
      expect(tv.getPower()).toBe("off");
    });

    it("should have volume 0", () => {
      expect(tv.getVolume()).toBe(0);
    });

    it("should have channel 0", () => {
      expect(tv.getChannel()).toBe(0);
    });
  });

  describe("setPower", () => {
    it("should turn on the TV", () => {
      tv.setPower("on");
      expect(tv.getPower()).toBe("on");
    });

    it("should turn off the TV", () => {
      tv.setPower("on");
      tv.setPower("off");
      expect(tv.getPower()).toBe("off");
    });
  });

  describe("setVolume", () => {
    it("should set volume when TV is on", () => {
      tv.setPower("on");
      tv.setVolume(50);
      expect(tv.getVolume()).toBe(50);
    });

    it("should not set volume when TV is off", () => {
      tv.setVolume(50);
      expect(tv.getVolume()).toBe(0);
    });
  });

  describe("setChannel", () => {
    it("should set channel when TV is on", () => {
      tv.setPower("on");
      tv.setChannel(5);
      expect(tv.getChannel()).toBe(5);
    });

    it("should not set channel when TV is off", () => {
      tv.setChannel(5);
      expect(tv.getChannel()).toBe(0);
    });
  });
});

describe("TVRemote", () => {
  let tv: Device;
  let remote: Controller;

  beforeEach(() => {
    tv = new TV();
    remote = new TVRemote(tv);
  });

  describe("power", () => {
    it("should turn on the TV", () => {
      remote.power();
      expect(tv.getPower()).toBe("on");
    });

    it("should turn off the TV", () => {
      remote.power();
      remote.power();
      expect(tv.getPower()).toBe("off");
    });
  });

  describe("volume controls", () => {
    beforeEach(() => {
      remote.power(); // Turn on TV
      tv.setVolume(50); // Set initial volume
    });

    it("should increase volume with up()", () => {
      remote.up();
      expect(tv.getVolume()).toBe(51);
    });

    it("should decrease volume with down()", () => {
      remote.down();
      expect(tv.getVolume()).toBe(49);
    });

    it("should not increase volume beyond maximum", () => {
      tv.setVolume(100);
      remote.up();
      expect(tv.getVolume()).toBe(100);
    });

    it("should not decrease volume below minimum", () => {
      tv.setVolume(0);
      remote.down();
      expect(tv.getVolume()).toBe(0);
    });
  });

  describe("channel controls", () => {
    beforeEach(() => {
      remote.power(); // Turn on TV
    });

    it("should go to next channel", () => {
      tv.setChannel(5);
      remote.next();
      expect(tv.getChannel()).toBe(6);
    });

    it("should go to previous channel", () => {
      tv.setChannel(5);
      remote.previous();
      expect(tv.getChannel()).toBe(4);
    });

    it("should wrap to first channel when going next from last", () => {
      tv.setChannel(100);
      remote.next();
      expect(tv.getChannel()).toBe(1);
    });

    it("should wrap to last channel when going previous from first", () => {
      tv.setChannel(1);
      remote.previous();
      expect(tv.getChannel()).toBe(100);
    });
  });

  describe("mute", () => {
    beforeEach(() => {
      remote.power(); // Turn on TV
      tv.setVolume(50);
    });

    it("should mute the TV", () => {
      remote.mute();
      expect(tv.getVolume()).toBe(0);
    });

    it("should unmute to previous volume", () => {
      remote.mute();
      remote.mute();
      expect(tv.getVolume()).toBe(50);
    });
  });
});

