import React from "react";
import { useSelector } from "react-redux";
import { selectInventoryById } from "../../redux/inventorySlice";
import { Link, useParams } from "react-router-dom";
import InventoryCategoryItemList from "./InvententoryCategoryItemList";

export default function InvetoryCategory() {
  const { id } = useParams();
  const category = useSelector((state) => selectInventoryById(state, id));

  return (
    <div>
      <div>{category.categoryName}</div>
      <div>
        <Link to={`/inventory/category/${id}/item/new`}>Add Item</Link>
      </div>
      <div>
        <InventoryCategoryItemList category={category} />
      </div>
    </div>
  );
}
