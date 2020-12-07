import React from "react";
import RestaurantCard from "../components/RestaurantCard";
import renderer from "react-test-renderer";

//käytetään Helsinki API:sta saatua paikkaa testissä
let testPlace = {
  id: "3048",
  name: {
    fi: "Addis Ethiopian Kitchen",
    en: "Addis Ethiopian Kitchen",
    sv: "Addis Ethiopian Kitchen",
    zh: null,
  },
  source_type: { id: 2, name: "Matko" },
  info_url: "https://www.addiskitchen.fi/",
  modified_at: "2020-08-20T10:18:05.000Z",
  location: {
    lat: 60.1943244934082,
    lon: 24.95623016357422,
    address: {
      street_address: "Sturenkatu 28",
      postal_code: "00510",
      locality: "Helsinki",
    },
  },
  description: {
    intro: null,
    body:
      "Ravintola Addis tarjoilee etiopialaisia makuja Vallilassa. Tarjolla niin liha- kuin vegaaniannoksia.",
    images: [
      {
        url:
          "https://edit.myhelsinki.fi/sites/default/files/styles/api_1980x1020/public/2017-11/18582201_1304054686382343_5281764182844447292_n.jpg?h=af5d0fd7&itok=8uXrL4iG",
        copyright_holder: "Addis Ethiopian Kitchen",
        license_type: { id: 1, name: "All rights reserved." },
      },
    ],
  },
  tags: [
    { id: "matko1:10", name: "RESTAURANTS & CAFES" },
    { id: "matko2:117", name: "Vegetarian" },
    { id: "matko2:229", name: "Restaurant" },
    { id: "matko2:234", name: "Vegan" },
  ],
  opening_hours: {
    hours: [
      { weekday_id: 1, opens: "11:00:00", closes: "20:30:00", open24h: false },
      { weekday_id: 2, opens: "11:00:00", closes: "20:30:00", open24h: false },
      { weekday_id: 3, opens: "11:00:00", closes: "20:30:00", open24h: false },
      { weekday_id: 4, opens: "11:00:00", closes: "20:30:00", open24h: false },
      { weekday_id: 5, opens: "11:00:00", closes: "20:30:00", open24h: false },
      { weekday_id: 6, opens: "12:00:00", closes: "20:30:00", open24h: false },
      { weekday_id: 7, opens: "12:00:00", closes: "20:30:00", open24h: false },
    ],
    openinghours_exception: "",
  },
};

describe("RestaurantCard componentin testausta", () => {
  test("RestaurantCardin propsien testaus", () => {
    const tree = renderer
      .create(
        <RestaurantCard item={testPlace} eventCoords={testPlace.location} />
      )
      .toJSON();
    console.log(JSON.stringify(tree));
  });
});
