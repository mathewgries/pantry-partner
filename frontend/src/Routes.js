import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewInventoryCategory from './containers/inventory/NewInventoryCategory'
import NewInventoryItem from "./containers/inventory/NewInventoryItem"
import InvetoryCategory from "./containers/inventory/InventoryCategory";
import NotFound from "./containers/NotFound";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
			<Route
        path="/inventory/category/new"
        element={
          <AuthenticatedRoute>
            <NewInventoryCategory />
          </AuthenticatedRoute>
        }
      />
			<Route
        path="/inventory/category/:id"
        element={
          <AuthenticatedRoute>
            <InvetoryCategory />
          </AuthenticatedRoute>
        }
      />
			<Route
        path="/inventory/category/:id/item/new"
        element={
          <AuthenticatedRoute>
            <NewInventoryItem />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
