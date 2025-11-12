import { describe, beforeEach, it, expect } from "bun:test";
import { Barista, CoffeeRecipe, Espresso } from "~/decorator";

describe("Barista", () => {
  let barista: Barista;

  beforeEach(() => {
    barista = new Barista(new CoffeeRecipe(new Espresso()));
  });

  describe("makeAmericano", () => {
    it("should return the cost of an Americano", () => {
      const cost = barista.makeAmericano().cost();
      expect(cost).toBe(60);
    });
  });

  describe("makeCaramelMacchiato", () => {
    it("should return the cost of a Caramel Macchiato", () => {
      const cost = barista.makeCaramelMacchiato().cost();
      expect(cost).toBe(120);
    });
  });

  describe("makeSaltedCaramel", () => {
    it("should return the cost of a Salted Caramel", () => {
      const cost = barista.makeSaltedCaramel().cost();
      expect(cost).toBe(100);
    });
  });

  describe("makeVanilla", () => {
    it("should return the cost of a Vanilla coffee", () => {
      const cost = barista.makeVanilla().cost();
      expect(cost).toBe(100);
    });
  });
});