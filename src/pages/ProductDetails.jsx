import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import { fetchProductsAndCategories } from "../features/product/ProductSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsAndCategories());
    }
  }, [status, dispatch]);

  const product = products.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
    }
    toast(`${quantity} quantity added to cart!`);
  };

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

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-500 text-center py-8">Product not found</div>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>
        </div>
      </div>
    );
  }

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

      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
          <div className="h-96 w-full relative">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain object-center p-4"
            />
          </div>
        </div>

        <div className="mt-8 md:mt-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.title}
          </h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating.rate)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-sm text-gray-500">{product.description}</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        hideProgressBar={true}
        autoClose={2000}
      />
    </div>
  );
}
