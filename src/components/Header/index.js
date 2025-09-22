import './index.css'
import { RiSearch2Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { CiBellOn,CiCalendarDate } from "react-icons/ci";
import { PiQuestionThin } from "react-icons/pi";

const Header = () => (
    <div className="header">
    <div className="search-container">
      <span className="nav-icon"><RiSearch2Line /></span>
      <input type="text" placeholder="Search for anything..." />
    </div>
    <div className="header-actions">
      <span className="header-icon"><CiCalendarDate /></span>
      <span className="header-icon"><PiQuestionThin /></span>
      <span className="header-icon"><CiBellOn /></span>
      <div className="user-profile">
        <div className="user-info">
          <p className="user-name">Palak Jain</p>
          <p className="user-location">Rajathan, India</p>
        </div>
        <div className="user-avatar">PJ</div>
      </div>
    </div>
  </div>
)

export default Header