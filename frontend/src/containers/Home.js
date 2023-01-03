import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllData } from "../redux/appSlice";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import SiteMenu from "./SiteMenu";
import InventoryCategoryList from "./inventory/InventoryCategoryList";
import "./Home.css";

export default function Home() {
  const { isAuthenticated } = useAppContext();
  const dispatch = useDispatch();
  const appStatus = useSelector((state) => state.app.status);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("inventory");

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        if (appStatus === "idle") {
          setIsLoading(true);

          try {
            await dispatch(fetchAllData()).unwrap();
          } catch (e) {
            onError(e);
          }
          setIsLoading(false);
        }
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  const handleViewSelect = (text) => {
    setSelectedView(text);
  };

  return (
    <div className="Home">
      <div className="lander">
        <div className="site-menu-container">
          <SiteMenu handleViewSelect={handleViewSelect} selectedView={selectedView} />
        </div>
        {isLoading ? (
          "Loading"
        ) : (
          <div className="home-list-container">
            {selectedView === "inventory" && (
              <InventoryCategoryList listTitle={"Invetory"} />
            )}
            {/*
            {selectedView === "shoppingLists" && (
					<ListContainer listTitle={"Shopping Lists"} newUrl={"/inventory/category/new"} />
				)}

				{selectedView === "meals" && (
					<ListContainer listTitle={"Meals and Recipes"} newUrl={"/inventory/category/new"} />
				)} */}
          </div>
        )}
      </div>
    </div>
  );
}
