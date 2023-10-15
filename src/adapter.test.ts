import { describe, it, expect, beforeEach } from "bun:test";
import {
  Plug,
  PlugNotSupportedException,
  Outlet,
  Type,
  TypeAOutlet,
  TypeAPlug,
  TypeBPlug,
  TypeBToTypeAAdapter,
} from "~/adapter";

describe("TypeAOutlet", () => {
  let outlet: TypeAOutlet;

  beforeEach(() => {
    outlet = new TypeAOutlet();
  });

  describe("getType", () => {
    it("should return 'A'", () => {
      expect(outlet.getType()).toBe("A");
    });
  });

  describe("getReceptacleProngHoleCount", () => {
    it("should return 2", () => {
      expect(outlet.getReceptacleProngHoleCount()).toBe(2);
    });
  });

  describe("attach", () => {
    it("should return true for a compatible plug", () => {
      expect(outlet.attach(new TypeAPlug())).toBe(true);
    });

    it("should return true for a compatible plug via adapter", () => {
      expect(outlet.attach(new TypeBToTypeAAdapter(new TypeBPlug()))).toBe(true);
    });

    it("should throw a PlugNotSupportedException for an incompatible plug type", () => {
      expect(() => outlet.attach(new TypeBPlug())).toThrow(
        new PlugNotSupportedException()
      );
    });
  });
});
