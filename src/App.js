import './App.css';
import Login from "./components/login/login";
import Profiles from "./components/profiles/profiles";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
<Routes>
<Route
        path="/login/"
        element={<Login />}
      ></Route>
<Route
        path="/"
        element={<Profiles />}
      ></Route>
</Routes>
      

    </>
  );
}

export default App;
