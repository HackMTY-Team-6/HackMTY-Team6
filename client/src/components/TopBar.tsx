import React from "react";

function TopBar() {
  return (
    <nav className="p-2 bg-white border-gray-200 drop-shadow-lg">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a className="flex items-center">
          <img
            src="../../public/LogoBloodManager.svg"
            className="mr-3 h-6 sm:h-10"
            alt="Blood Manager Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Blood Manager
          </span>
        </a>
      </div>
    </nav>
  );
}

export default TopBar;
