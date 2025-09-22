import './index.css'
import { TbMessageDots } from "react-icons/tb";
import { TiThMenuOutline } from "react-icons/ti";
import { BsListTask ,BsPeople } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";

const SideNavbar = ({ isOpen, isMobile }) => (
    <div className={`side-navbar ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}>
        {/* Top Section */}
        <div className="sidebar-header">
          <h2>Project M.</h2>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active">
              <span className="nav-icon"><TiThMenuOutline /></span>
              <span>Home</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon"><TbMessageDots /></span>
              <span>Messages</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon"><BsListTask /></span>
              <span>Tasks</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon"><BsPeople /></span>
              <span>Members</span>
            </li>
            <li className="nav-item">
              <span className="nav-icon"><LuSettings /></span>
              <span>Settings</span>
            </li>
          </ul>
        </nav>

        {/* Divider */}
        <hr />

        {/* My Projects */}
        <div className="sidebar-projects">
          <h4>MY PROJECTS</h4>
          <ul>
            <li className="project active">
              <span className="project-dot green"></span>
              <span>Mobile App</span>
            </li>
            <li className="project">
              <span className="project-dot yellow"></span>
              <span>Website Redesign</span>
            </li>
            <li className="project">
              <span className="project-dot purple"></span>
              <span>Design System</span>
            </li>
            <li className="project">
              <span className="project-dot blue"></span>
              <span>Wireframes</span>
            </li>
          </ul>
        </div>

        {/* Thoughts Time */}
        <div className="sidebar-thoughts">
          <h4>Thoughts Time</h4>
          <p>
            We don't have any notice for you, till then you can share your
            thoughts with your peers.
          </p>
          <button className="thoughts-btn">Write a message</button>
        </div>
      </div>
)

export default SideNavbar