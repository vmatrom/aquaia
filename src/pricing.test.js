import test from "node:test";
import assert from "node:assert/strict";
import { priceBooking, initialPromos } from "./data.js";
const day = "2026-09-16";
test("porcentaje, importe fijo y normalización", () => {
  assert.equal(priceBooking(85, " aqua10 ", initialPromos, day).total, 76.5);
  assert.equal(priceBooking(185, "TABARCA20", initialPromos, day).total, 165);
});
test("rechaza códigos inválidos, caducados, pausados, agotados y mínimo", () => {
  assert.ok(priceBooking(85, "NO", initialPromos, day).error);
  assert.ok(priceBooking(85, "TABARCA20", initialPromos, day).error);
  for (const override of [
    { active: false },
    { expires: "2026-01-01" },
    { used: 50 },
  ])
    assert.ok(
      priceBooking(85, "AQUA10", [{ ...initialPromos[0], ...override }], day)
        .error,
    );
});
test("caduca después del último día y total nunca es negativo", () => {
  assert.equal(
    priceBooking(85, "AQUA10", initialPromos, "2027-12-31").total,
    76.5,
  );
  assert.equal(
    priceBooking(
      5,
      "FIX",
      [
        {
          code: "FIX",
          type: "fixed",
          value: 20,
          min: 0,
          active: true,
          expires: "2027-12-31",
          used: 0,
          limit: 2,
        },
      ],
      day,
    ).total,
    0,
  );
});
test("sin código conserva importe y no combina promociones", () => {
  assert.equal(priceBooking(135, "", initialPromos, day).total, 135);
  assert.ok(priceBooking(135, "AQUA10 TABARCA20", initialPromos, day).error);
});
