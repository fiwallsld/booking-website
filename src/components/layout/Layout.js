import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import MailList from "../mailList/MailList";
import "./layout.css";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <MailList />
      <Footer />
    </div>
  );
}

export default Layout;
