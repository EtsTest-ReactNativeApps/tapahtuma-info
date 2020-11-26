import React from "react";
import { day } from "../components/RestaurantCard";

describe("day componentin testaus", () => {
  test("pitäisi antaa jonkin tulos", () => {
    expect(day).not.toBeNull();
  });

  test("day on määritelty", () => {
    expect(day).toBeDefined();
  });

  test("pitäisi palauttaa numero 0-6 väliltä", () => {
    expect.extend({
      toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
          return {
            message: () =>
              `expected ${received} not to be within range ${floor} - ${ceiling}`,
            pass: true,
          };
        } else {
          return {
            message: () => `expected ${floor} - ${ceiling}`,
            pass: false,
          };
        }
      },
    });
  });
  test("antaa numeroarvot 0-6 väliltä", () => {
    expect(day).toBeWithinRange(0, 6);
  });
});

// Describe-funktio on tapa niputtaa testejä yhteen.
// Ei ole välttämätön
//describe('math', () => {

// Jokainen testi kääritään test- tai it-funktioon
//  test('addition', () => {

// expectille annetaan parametriksi testattava osa koodia
//  expect(1 + 1)
//    .toEqual(2); // ketjuttamalla esim. toBe/toEqual ym. funktioita testataan expectille annettua arvoa
// });

// test('subtraction', () => {
//  expect(5 - 2).toEqual(3);
//});
