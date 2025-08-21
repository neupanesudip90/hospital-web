import React from 'react'
import Sidepanel from "../../components/sidepanel"
import OtherProfile from '../../components/otherProfile';

function UserProfile() {
  return (
    <div className="w-full min-h-screen flex lg:flex-row flex-col  bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-1/5 w-full  shadow-md mb-15">
        <Sidepanel />
      </div>

      {/* Main Content */}
      <div className="lg:w-4/5 w-full md:p-4">
        <OtherProfile />
      </div>
    </div>
  );
}

export default UserProfile
