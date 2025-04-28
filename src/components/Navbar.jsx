import {
  Menu,
  User,
  Search,
  Heart,
  ShoppingCart,
  ShoppingBag,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag />
            <span className="sm:text-lg font-bold">NoCap Store</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Categories
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-[200px] lg:w-[300px] pl-8 h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden sm:block text-gray-500 hover:text-gray-900"
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
            <Link
              to="/cart"
              className="text-gray-500 hover:text-gray-900 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-gray-900"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Categories
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
