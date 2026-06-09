import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <span className="text-sm sm:text-base font-medium tracking-wide">
          Crown Hotel | All Rights Reserved &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
