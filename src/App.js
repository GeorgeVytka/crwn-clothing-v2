import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/navigation";
import Home from "./routes/home/home";
import SignIn from "./routes/sign-in/sign-in";
const App = () => {
  const TempFun2 = () => {
    return (
      <div>
        <div>
          <h1>I am the navigation bar</h1>
        </div>
      </div>
    );
  };
  return (
    <Routes>
      <Route path="" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<TempFun2 />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
