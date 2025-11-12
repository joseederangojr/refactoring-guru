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

describe("TypeAPlug", () => {
  let plug: Plug & Type<"A">;

  beforeEach(() => {
    plug = new TypeAPlug();
  });

  describe("getType", () => {
    it("should return 'A'", () => {
      expect(plug.getType()).toBe("A");
    });
  });

  describe("getProngCount", () => {
    it("should return 2", () => {
      expect(plug.getProngCount()).toBe(2);
    });
  });
});

describe("TypeBPlug", () => {
  let plug: Plug & Type<"B">;

  beforeEach(() => {
    plug = new TypeBPlug();
  });

  describe("getType", () => {
    it("should return 'B'", () => {
      expect(plug.getType()).toBe("B");
    });
  });

  describe("getProngCount", () => {
    it("should return 3", () => {
      expect(plug.getProngCount()).toBe(3);
    });
  });
});

describe("TypeBToTypeAAdapter", () => {
  let adapter: Plug & Type<"A">;

  beforeEach(() => {
    adapter = new TypeBToTypeAAdapter(new TypeBPlug());
  });

  describe("getType", () => {
    it("should return 'A'", () => {
      expect(adapter.getType()).toBe("A");
    });
  });

  describe("getProngCount", () => {
    it("should return 2 for a TypeB plug", () => {
      expect(adapter.getProngCount()).toBe(2);
    });
  });
});

describe("TypeAOutlet", () => {
  let outlet: Outlet & Type<"A">;

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
      expect(outlet.attach(new TypeBToTypeAAdapter(new TypeBPlug()))).toBe(
        true,
      );
    });

    it("should throw a PlugNotSupportedException for an incompatible plug type", () => {
      expect(() => outlet.attach(new TypeBPlug())).toThrow(
        new PlugNotSupportedException(),
      );
    });
  });
});
