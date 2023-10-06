import NavLogo from "./NavLogo";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <NavLogo />
      {children}
    </nav>
  );
}
