import React, { useState } from 'react';
import spending from '../assets/spending.png';
import profile from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';
// /logout
function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5665/logout', {
        method: 'POST',
        credentials: 'include'
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Logout successful:', data.message);
  
      } else {
        console.error('Logout failed:', response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error during logout request:', error);
    }
  };
  

  return (
    <nav className="bg-transparent p-4 shadow-md flex justify-between items-center">
      <div className="logo flex items-center">
        <img src={spending} alt="logo" className="h-10" />
        <span className="ml-3 text-2xl text-indigo-600 font-semibold">Expense Tracker</span>
      </div>
      <div className="nav-elements flex items-center">
        <ul className="flex space-x-6 text-lg items-center text-indigo-600">
          <li className="hover:text-indigo-800 cursor-pointer">Add</li>
          <li className="relative">
            <img 
              src={profile} 
              alt="profile" 
              className="h-10 w-10 rounded-full cursor-pointer" 
              onClick={toggleDropdown} 
            />
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <li 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
