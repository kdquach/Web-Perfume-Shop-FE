import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsManagement from "../pages/Admin/ProductsManagement/ProductsManagement";
import Login from "../pages/Auth/Login/Login";
import CategoriesManagement from "../pages/Admin/CategoryManagement/CategoryManagement";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="auth">
            <Route path="login" element={<Login email={""} password={""} />} />
          </Route>
          <Route path="admin">
            <Route
              path="products-management"
              element={<ProductsManagement />}
            />
            <Route
              path="categories-management"
              element={<CategoriesManagement />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
