/**let dayArr;
  if (day === 0) {
    dayArr = 6;
  } else {
    dayArr = day - 1;
  } */

import { dayArr } from "../components/RestaurantCard";

test("dayArr sisältää arvoja", () => {
  expect(dayArr).not.toBeNull();
});
