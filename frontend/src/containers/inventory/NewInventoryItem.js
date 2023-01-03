import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveInventory, selectInventoryById } from "../../redux/inventorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { useFormFields } from "../../lib/hooksLib";
import { onError } from "../../lib/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import "./inventory.css";

export default function NewInventoryItem(props) {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
	const category = useSelector((state) => selectInventoryById(state,id));
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    imgSrc: "",
    itemName: "",
    lastPrice: "",
    inStock: false,
    markedForBuy: false,
  });
  const [checkboxes, setCheckboxes] = useState({
    inStock: false,
    markedForBuy: false,
  });

  function validateForm() {
    return fields.itemName;
  }

  function handleOnChange(e) {
    const { name } = e.target;
    setCheckboxes((prev) => ({ ...checkboxes, [name]: !prev[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const body = {
        ...fields,
        ...checkboxes,
        categoryId: id,
        type: "INV#CAT#ITEM#",
      };
      await dispatch(saveInventory(body)).unwrap();
      nav("/");
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="form-container">
			<div>
				<h3>Add Item to {category.categoryName}</h3>
			</div>
      <div className="new-inventory-category-form-wrapper">
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group controlId="itemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="itemName"
              value={fields.itemName}
              onChange={handleFieldChange}
            />
          </Form.Group>{" "}
          <Form.Group controlId="lastPrice">
            <Form.Label>Last Price</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="lastPrice"
              value={fields.lastPrice}
              onChange={handleFieldChange}
            />
          </Form.Group>{" "}
          <Form.Group>
            <label htmlFor="inStock">In Stock: </label>
            <Form.Check name="inStock" type="checkbox" id="inStock" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group>
            <label htmlFor="markedForBuy">Buy: </label>
            <Form.Check
              name="markedForBuy"
              type="checkbox"
              id="markedForBuy"
              onChange={handleOnChange}
            />
          </Form.Group>
          <LoaderButton
            block="true"
            size="lg"
            type="submit"
            variant="success"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Create
          </LoaderButton>
        </Form>
      </div>
    </div>
  );
}
