import { describe, expect, it } from "vitest";

import { getInvalidFields } from "@/utils/validation";
import { taxiSchema } from "@/validations";

const validValues = {
  pickup: "Mindelo Airport",
  dropoff: "Baía das Gatas",
  date: "2099-12-31",
  time: "10:30",
  passengers: "2",
  name: "Ana Silva",
  phone: "+238 999 10 01",
  note: "",
};

describe("taxiSchema", () => {
  it("should accept valid values", () => {
    expect(getInvalidFields(taxiSchema, validValues)).toEqual([]);
  });

  it("should report every empty required field", () => {
    const invalid = getInvalidFields(taxiSchema, {
      ...validValues,
      pickup: "",
      dropoff: "",
      date: "",
      time: "",
      passengers: "",
      name: "",
      phone: "",
    });

    expect([...invalid].sort()).toEqual(
      ["date", "dropoff", "name", "passengers", "phone", "pickup", "time"].sort(),
    );
  });

  it.each([
    ["date", "2000-01-01"],
    ["time", "25:00"],
    ["passengers", "0"],
    ["passengers", "9"],
    ["passengers", "1.5"],
    ["phone", "abc"],
  ])("should reject an invalid %s of %s", (field, value) => {
    expect(
      getInvalidFields(taxiSchema, { ...validValues, [field]: value }),
    ).toEqual([field]);
  });

  it("should reject a note longer than 300 characters", () => {
    expect(
      getInvalidFields(taxiSchema, { ...validValues, note: "a".repeat(301) }),
    ).toEqual(["note"]);
  });
});