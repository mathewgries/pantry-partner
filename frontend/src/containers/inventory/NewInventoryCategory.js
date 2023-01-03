import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveInventory } from "../../redux/inventorySlice";
import { useNavigate } from "react-router-dom";
import { useFormFields } from "../../lib/hooksLib";
import { onError } from "../../lib/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import "./inventory.css";

const availableColors = ["97E5D7", "D2EBD8", "FCF1DD", "FFD4B8", "FEB7B3"];

const ColorPicker = (props) => {
  const { color, handleCheckBox, selectedColor } = props;

  function handleOnChange(e) {
    handleCheckBox(e);
  }

  return (
    <div className="color-picker-checkbox-wrapper">
      <div className="color-picker-color-display" style={{ backgroundColor: `#${color}` }}></div>
      <input
        id={"categoryColor"}
        className="color-picker-checkbox"
        type="checkbox"
        value={color}
        checked={selectedColor === color ? true : false}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default function NewInventoryCategory(props) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    categoryName: "",
    categoryColor: "",
  });

  function validateForm() {
    return fields.categoryName.length > 0 && fields.categoryColor.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const body = {
        ...fields,
        type: "INV#CAT#",
      };
      await dispatch(saveInventory(body)).unwrap();
      nav("/");
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div className="form-container">
      <div className="new-inventory-category-form-wrapper">
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="categoryName"
              value={fields.categoryName}
              onChange={handleFieldChange}
            />
          </Form.Group>{" "}
          <div className="color-picker-checkbox-group">
            <Form.Label>Category Color</Form.Label>
            <div className="checkbox-container">
              {availableColors.map((x) => (
                <Form.Group controlId="categoryColor" key={x}>
                  <ColorPicker
                    color={x}
                    handleCheckBox={handleFieldChange}
                    selectedColor={fields.categoryColor}
                  />
                </Form.Group>
              ))}
            </div>
          </div>
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
