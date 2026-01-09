import { describe, expect, it } from "vitest";
import { findConflicts } from "../lib/reservations";

const baseReservation = {
  id: "res-1",
  type: "CASA" as const,
  status: "CONFIRMADA" as const,
  startAt: new Date("2024-08-10T10:00:00Z"),
  endAt: new Date("2024-08-12T10:00:00Z"),
  houseId: "house-1"
};

describe("findConflicts", () => {
  it("detecta conflito de casa", () => {
    const conflicts = findConflicts(
      {
        type: "CASA",
        houseId: "house-1",
        startAt: new Date("2024-08-11T10:00:00Z"),
        endAt: new Date("2024-08-13T10:00:00Z")
      },
      [baseReservation]
    );

    expect(conflicts).toHaveLength(1);
  });

  it("ignora reservas canceladas", () => {
    const conflicts = findConflicts(
      {
        type: "CASA",
        houseId: "house-1",
        startAt: new Date("2024-08-11T10:00:00Z"),
        endAt: new Date("2024-08-13T10:00:00Z")
      },
      [{ ...baseReservation, status: "CANCELADA" }]
    );

    expect(conflicts).toHaveLength(0);
  });
});
