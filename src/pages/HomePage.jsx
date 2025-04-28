import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="md:flex md:items-center md:justify-between">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Welcome to NoCap Store
                </h1>
                <p className="mt-4 text-gray-500">
                  Shop the latest products from our collection. We offer a wide
                  range of items at a cheap and affordable prices.
                </p>
              </div>
              <div className="mt-6 flex md:ml-4 md:mt-0">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
            Our Products
          </h2>
          <ProductList />
        </section>
      </main>
    </div>
  );
}
