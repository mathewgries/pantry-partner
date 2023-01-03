import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllInventory } from "../../redux/inventorySlice";
import { Link } from "react-router-dom";
import "./inventory.css";

const ListItem = (props) => {
  const nav = useNavigate();
  const { id, color, categoryName, totalItems, inStockItems, markedForBuy } = props;

  function routePage() {
    nav(`/inventory/category/${id}`);
  }

  return (
    <button className="list-item" onClick={routePage} style={{ backgroundColor: `#${color}` }}>
      <div>
        <div>
          <div style={{ textAlign: "left" }}>
            <h5>
              <u>{categoryName}</u>
            </h5>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>Total Items: {totalItems}</div>
          <div>In Stock: {inStockItems}</div>
          <div>Buy: {markedForBuy}</div>
        </div>
      </div>
    </button>
  );
};

export default function InventoryCategoryList(props) {
  const { listTitle } = props;
	const inventoryItems = useSelector(selectAllInventory)

  return (
    <div className="list-wrapper">
      <div className="list-header-wrapper">
        <h4 className="list-header">{listTitle}</h4>
        <Link to="/inventory/category/new" className="list-link">
          Add
        </Link>
      </div>
      <div className="inventory-category-list-group">
        {inventoryItems
          .filter((item) => item.type === "INV#CAT#")
          .map((x) => (
            <ListItem
              key={x.id}
              id={x.id}
              color={x.categoryColor}
              categoryName={x.categoryName}
              totalItems={"8"}
              inStockItems={"5"}
              markedForBuy={"3"}
            />
          ))}
      </div>
    </div>
  );
}
