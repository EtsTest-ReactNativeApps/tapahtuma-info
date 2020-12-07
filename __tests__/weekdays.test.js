import { weekdays } from "../components/RestaurantCard";

describe("weekdays componentin testaus", () => {
  test("weekdays on määritelty", () => {
    expect(weekdays).toBeDefined();
  });
  test("weekdays pituus on 7", () => {
    expect(weekdays).toHaveLength(7);
  });

  const expected = [expect.stringMatching(/^ma/), expect.stringMatching(/^su/)];
  test("expected arvot sisältyy weekdays arrayhin", () => {
    expect(weekdays).toEqual(expect.arrayContaining(expected));
  });
});
