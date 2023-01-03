import React from "react";
import { useSelector } from "react-redux";
import { selectItemsByCategoryId } from "../../redux/inventorySlice";
import stockPhoto from "../../images/KitchImage.jpeg";

const ListItem = (props) => {
  const { imgSrc, itemName, lastPrice, inStock, markedForBuy } = props.data;
  return (
    <div className="list-item inventory-list-item">
      <div className="list-item-img-wrapper">
        <img src={imgSrc ? imgSrc : stockPhoto} alt="image" />
      </div>
      <div className="inventory-item-detail-block">
        <div>Name: {itemName}</div>
        <div>Last Price: {lastPrice}</div>
        <div className="inventory-checkbox-group">
          <div>
            InStock: <input type="checkbox" defaultChecked={inStock} />
          </div>
          <div>
            Buy: <input type="checkbox" defaultChecked={markedForBuy} />
          </div>
        </div>
      </div>
      <div className="inventory-item-button-group">
        <button className="edit-btn">Edit</button>
        <button className="remove-btn">Remove</button>
      </div>
    </div>
  );
};

export default function InventoryCategoryItemList(props) {
  const { category } = props;
  const items = useSelector((state) => selectItemsByCategoryId(state, category.id));

  return (
    <div>
      {items.map((x) => (
        <ListItem key={x.id} data={x} />
      ))}
    </div>
  );
}
