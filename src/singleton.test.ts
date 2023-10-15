import { describe, it, expect } from "bun:test";
import { AzureDatabase } from "~/singleton";

describe("AzureDatabase", () => {
  it("should create only one instance", () => {
    const instance1 = AzureDatabase.create();
    const instance2 = AzureDatabase.create();
    expect(instance1).toBe(instance2);
  });
});