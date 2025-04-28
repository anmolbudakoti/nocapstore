import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { fetchProductsAndCategories } from "../features/product/ProductSlice";

export default function ProductList() {
  const dispatch = useDispatch();

  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAndCategories());
    }
  }, [status, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast("Item Added to Cart!");
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
            <Link to={`/products/${product.id}`}>
              <div className="h-64 w-full relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain object-center p-4 hover:opacity-75 transition-opacity"
                />
              </div>
            </Link>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700 font-medium line-clamp-1">
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </button>
        </div>
      ))}
      <ToastContainer
        theme="dark"
        position="bottom-right"
        hideProgressBar={true}
        autoClose={2000}
      />
    </div>
  );
}
