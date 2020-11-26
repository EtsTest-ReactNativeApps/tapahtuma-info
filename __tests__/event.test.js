import React from "react";
import Event from "../components/Event";
import renderer from "react-test-renderer";

// Ei mene läpi, tulee error: Unable to find node on an unmounted component.

describe("Event componentin testausta", () => {
  test("Eventin propsien testaus", () => {
    const tree = renderer
      .create(
        <Event
          item={{
            description: { images: ["url"] },
            name: { fi: "otsikko", en: "title", se: "rubrik" },
            location: { address: { street_address: "Mannerheimintie" } },
            event_dates: { starting_day: "2020-11-25" },
          }}
        />
      )
      .toJSON();
    console.log(JSON.stringify(tree));
  });
});
