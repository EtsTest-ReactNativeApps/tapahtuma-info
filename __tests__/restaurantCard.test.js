import React from "react";
import RestaurantCard from "../components/RestaurantCard";
import renderer from "react-test-renderer";

// Ei mene läpi, tulee error: TypeError: Cannot read property 'opens' of undefined

describe("RestaurantCard componentin testausta", () => {
  test("RestaurantCardin propsien testaus", () => {
    const tree = renderer
      .create(
        <RestaurantCard
          item={{
            location: {
              lat: "60.169587",
              lon: "24.938201",
              address: { street_address: "Mannerheimintie" },
            },
            opening_hours: { hours: ["opens", "closes"] }, //item.opening_hours.hours[dayArr].opens/closesS
            description: { images: ["url"] },
            name: { fi: "otsikko", en: "title", se: "rubrik" },
          }}
        />
      )
      .toJSON();
    console.log(JSON.stringify(tree));
  });
});
