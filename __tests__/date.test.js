import React from "react";
//import { dayArr } from "../components/RestaurantCard";

describe("day componentin testaus", () => {
  let day = new Date().getDay();

  it("pitäisi antaa jonkin tulos", () => {
    expect(day).not.toBeNull();
  });

  it("day on määritelty", () => {
    expect(day).toBeDefined();
  });

  it("day pituus 7", () => {
    expect("day").toHaveLength(7);
  });
});

/*Ei toimi
test("pitäisi palauttaa numero 0-6 väliltä", () => {
  expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      if (pass) {
        return {
          pass: true,
        };
      } else {
        return {
          pass: false,
        };
      }
    },
  });
});
test("antaa numeroarvot 0-6 väliltä", () => {
  expect(2).toBeWithinRange(0, 6);
});
*/
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
