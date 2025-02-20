import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Sidebar/Dashboard";
import UserProfile from "./pages/Sidebar/UserProfile";
import Report from "./pages/Sidebar/Report";
import DiscountEvents from "./pages/Sidebar/DiscountEvents";
import UserList from "./pages/Sidebar/UserList";
import Employee from "./pages/Sidebar/Employee";
import ProductList from "./pages/Sidebar/ProductList";
import AdminPurchaseHistory from "./pages/Sidebar/AdminPurchaseHistory";
import PurchaseHistory from "./pages/Sidebar/PurchaseHistory";
import DashBoardLayout from "./components/Layout/DashBoardLayout";
import ShoppingCart from "./pages/Sidebar/ShoppingCart";
import Store from "./pages/Sidebar/Store";
import DeviceList from "./pages/Sidebar/DeviceList";
import AccessoryList from "./pages/Sidebar/Accessory";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from "./pages/Sidebar/Order";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashBoardLayout>
              <Dashboard />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/userlist"
          element={
            <DashBoardLayout>
              <UserList />
            </DashBoardLayout>
          }
        />
        <Route
          path="/admin/employee"
          element={
            <DashBoardLayout>
              <Employee />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/store"
          element={
            <DashBoardLayout>
              <Store />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/order"
          element={
            <DashBoardLayout>
              <Order />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/productlist"
          element={
            <DashBoardLayout>
              <ProductList />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/devicelist"
          element={
            <DashBoardLayout>
              <DeviceList />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/accessorieslist"
          element={
            <DashBoardLayout>
              <AccessoryList />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/purchasehistory"
          element={
            <DashBoardLayout>
              <AdminPurchaseHistory />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/events"
          element={
            <DashBoardLayout>
              <DiscountEvents />
            </DashBoardLayout>
          }
        />

        <Route
          path="/admin/report"
          element={
            <DashBoardLayout>
              <Report />
            </DashBoardLayout>
          }
        />

        <Route
          path="/shoppingcart"
          element={
            <DashBoardLayout>
              <ShoppingCart />
            </DashBoardLayout>
          }
        />

        <Route
          path="/purchasehistory"
          element={
            <DashBoardLayout>
              <PurchaseHistory />
            </DashBoardLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <DashBoardLayout>
              <UserProfile />
            </DashBoardLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
