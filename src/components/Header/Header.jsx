import logo from "../../assets/Logo.avif";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo-container">
        <img src={logo} alt="Logo" className="header-logo" />
      </div>
      <h1 className="header-title">Catálogo</h1>
      <div className="header-spacer"></div>
    </header>
  );
}