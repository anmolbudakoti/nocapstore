import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import { fetchProductsAndCategories } from "../features/product/ProductSlice";

export default function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAndCategories());
    }
  }, [status, dispatch]);

  const categoryProducts = products.filter((p) => p.category === category);

  if (status === "loading") {
    return <div className="text-center py-8">Loading Data, Please wait...</div>;
  }
  if (status === "failed") {
    return (
      <div className="text-red-500 text-center py-8">
        {error || "Something went wrong."}
      </div>
    );
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast("Item Added to Cart!");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          to="/categories"
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to categories
        </Link>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-8 capitalize">
        {category?.toString().replace(/%20/g, " ")}
      </h1>

      {categoryProducts.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categoryProducts.map((product) => (
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
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer
        theme="dark"
        position="bottom-right"
        hideProgressBar={true}
        autoClose={2000}
      />
    </div>
  );
}
