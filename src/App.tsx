import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContextProvider } from "./context/Provider";
import Main from "./pages/main";
import Cart from "./pages/cart";
import Redirect from "./pages/redirect"

function App() {
  return (
    <MainContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/checkout" element={<Cart />} />
          <Route path="/redirect" element={<Redirect />} />
        </Routes>
      </Router>

    </MainContextProvider>
  );
}

export default App;
