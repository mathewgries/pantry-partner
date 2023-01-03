import React from "react";
import "./SiteMenu.css";

export default function SiteMenu(props) {
  const { selectedView, handleViewSelect } = props;

  function handleOnClick(text) {
    handleViewSelect(text);
  }

  return (
    <div className="site-menu">
      <div
        onClick={() => handleOnClick("inventory")}
        className="site-menu-item-container"
        style={{
          backgroundColor: selectedView === "inventory" ? "#D2EBD8" : "#FCF1DD",
          border: `1px solid ${selectedView === "inventory" ? "#FCF1DD" : "#D2EBD8"}`,
        }}
      >
        Inventory
      </div>
      <div
        onClick={() => handleOnClick("shoppingLists")}
        className="site-menu-item-container"
        style={{
          backgroundColor: selectedView === "shoppingLists" ? "#D2EBD8" : "#FCF1DD",
          border: `1px solid ${selectedView === "shoppingLists" ? "#FCF1DD" : "#D2EBD8"}`,
        }}
      >
        Shopping Lists
      </div>
      <div
        onClick={() => handleOnClick("meals")}
        className="site-menu-item-container"
        style={{
          backgroundColor: selectedView === "meals" ? "#D2EBD8" : "#FCF1DD",
          border: `1px solid ${selectedView === "meals" ? "#FCF1DD" : "#D2EBD8"}`,
        }}
      >
        Meals and Recipes
      </div>
    </div>
  );
}
