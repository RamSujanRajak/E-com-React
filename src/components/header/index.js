import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div>
      <nav className="flex items-center justify-between h-20 max-w-6xl mx-auto">
        <Link to={"/"}>
          <div className="ml-5">
            <h1 className="text-green-300 font-bold text-xl sm:text-2xl md:text-3xl cursor-pointer tracking-wide">
              E-Com
            </h1>
          </div>
        </Link>
        <ul className="flex list-none items-center space-x-6 text-gray-100 font-semibold">
          <Link to={"/"}>
            <li className="cursor-pointer list-none">Home</li>
          </Link>
          <Link to={"/cart"}>
            <li className="CartBtn">
              <div className="IconContainer">
                {/* Add your icon here, e.g., an SVG or FontAwesome icon */}
                <span className="icon">🛒</span>
              </div>
              <div className="text">Cart</div>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
