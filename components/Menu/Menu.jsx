"use client";
import { useState } from "react";
import Filter from "../Filter/Filter";
import MenuItem from "./MenuItem";

const Menu = ({ menu }) => {
  const [filteredMenu, setFilteredMenu] = useState(menu);
  const applyFilterHandler = (filter) => {
    let finalMenu = [...menu];

    if (filter.vegetarian) {
      finalMenu = finalMenu.filter(
        (item) => item.vegetarian === filter.vegetarian
      );
    }

    if (filter.type) {
      finalMenu = finalMenu.filter(
        (item) => item.type.toLowerCase() === filter.type.toLowerCase()
      );
    }

    finalMenu = finalMenu.filter((item) => item.calories <= filter.calories);
    if (filter.categories.length !== 0 && filter.categories.length !== 4) {
      let adjustedMenu = new Set();
      for (const category of filter.categories) {
        let items = finalMenu.filter((item) =>
          item.categories.includes(category.toLowerCase())
        );
        for (const item of items) {
          adjustedMenu.add(item);
        }
      }
      finalMenu = Array.from(adjustedMenu);
    }

    setFilteredMenu(finalMenu);
  };

  return (
    <div className="px-14 md:flex justify-evenly items-start md:space-x-10">
      <Filter applyFilter={applyFilterHandler} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 mt-10">
        {filteredMenu.map((item) => (
          <MenuItem
            id={item._id}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            calories={item.calories}
            key={item._id}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
