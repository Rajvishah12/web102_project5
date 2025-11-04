import { Outlet, Link } from "react-router"

// this page is the base layout for all other pages
function Layout(){
  return (
    <div>
      <nav className="home-link" key="home-button">
        <Link style={{ color: "white" }} to="/">
            Home
        </Link>
      </nav>
      <Outlet /> 
      {/* the home button link is on the base layout. the "rest of the page" goes in outlet -- aka everything in app.jsx would go in outlet */}
    </div>
  )
}

export default Layout