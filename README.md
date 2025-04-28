# React FakeStore Shopping App

A simple e-commerce frontend built with React, Redux Toolkit & React Router, using [FakeStore API](https://fakestoreapi.com/) for product data. Supports:

- **Product listing** (grid of all products)
- **Product detail pages** (title, description, image, price, category)
- **Shopping cart** (add/remove items, persists in Redux)
- **Toasts** (added items confirmation)

---

## 📦 Features

- **Fetch once**: we pull _all products_ & _all categories_ in one request and then filter on the frontend—no repeated API calls.
- **Product Slice**: centralized state for products, categories, filteredProducts & loading/error status.
- **Category page**: dynamic URL (`/categories/:category`) shows only items in that category.
- **Product page**: dynamic URL (`/products/:productId`) shows full detail from cached Redux data.
- **Cart Slice**: add-to-cart button dispatches actions; cart state lives in Redux.
- **React-Toastify** to show “Item Added to Cart” toasts.
---

## 🛠️ Tech Stack

- **React** (v18+)
- **Redux Toolkit** (RTK & createAsyncThunk)
- **Tailwind CSS** (utility-first styling)
- **FakeStore API** (data source)
