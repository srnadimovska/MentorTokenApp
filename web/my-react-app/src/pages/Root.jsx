import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Root() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Root;
