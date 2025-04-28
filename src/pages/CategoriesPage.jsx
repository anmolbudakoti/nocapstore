import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAndCategories } from "../features/product/ProductSlice";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAndCategories());
    }
  }, [status, dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-8">
        Product Categories
      </h1>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/categories/${category}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
          >
            <h2 className="text-lg font-medium capitalize">{category}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
