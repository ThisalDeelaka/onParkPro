import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { parkColumns, slotColumns, userColumns } from "./datatablesource";
import InsertNewInventory from "./pages/stock/InsertNewInventory.jsx"
import UpdateInventory from "./pages/stock/UpdateInventory.jsx"
import AllInventory from './pages/stock/AllInventory.jsx';
import DeductInventory from './pages/stock/DeductInventory.jsx';
import DeductList from './pages/stock/DeductList.jsx';
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="parks">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={parkColumns} />
                  </ProtectedRoute>
                }
              />
              </Route>
            <Route path="slots">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={slotColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
               
        
              
              
            </Route>
          </Route>
          <Route path="AddStock" exact element={<InsertNewInventory/>}/>
              <Route path="/Update/:id" exact element={<UpdateInventory/>}/>
              <Route path="/Inventory" exact element={<AllInventory/>}/>
              <Route path="/Deduct" exact element={<DeductInventory/>}/>
              <Route path="/DeductList" exact element={<DeductList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
