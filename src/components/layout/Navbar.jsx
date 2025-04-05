import React from "react";
import { navItems } from "../../data/siteData";
import { Menu } from "lucide-react";

const Navbar = ({ activeSection, scrollToSection }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-700">
              MA<span className="text-blue-500">MLM</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel - could be expanded with useState logic */}
      {/* <div className="md:hidden">
        <div className="pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === item.id
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
