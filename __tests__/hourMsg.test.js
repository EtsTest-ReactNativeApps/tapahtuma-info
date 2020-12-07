import { hourMsg } from "../components/RestaurantCard";

describe("hourMsg testausta", () => {
  test("weekdays on määritelty", () => {
    expect(hourMsg).not.toBeNull();
  });
  test("hourMsg on array", () => {
    expect(hourMsg).toEqual([]);
  });
});
