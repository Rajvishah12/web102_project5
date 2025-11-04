import { Outlet, Link } from "react-router"
import SideNav from "../components/SideNav.jsx"

// this page is the base layout for all other pages
function Layout(){
  return (
    <div>
      <SideNav/>
      <Outlet /> 
      {/* the home button link is on the base layout. the "rest of the page" goes in outlet -- aka everything in app.jsx would go in outlet */}
    </div>
  )
}

export default Layout