import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import Navbar from "../components/Navbar";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const CATEGORY_URL = "https://fakestoreapi.com/products/categories";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchProductsData() {
    setLoading(true);
    try {
      const output = await fetch(API_URL);
      const data = await output.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
    setLoading(false);
  }

  async function fetchCategories() {
    try {
      const output = await fetch(CATEGORY_URL);
      const data = await output.json();
      console.log(data);
      setCategories(["All Products", ...data]);
    } catch (err) {
      console.log(err);
      setCategories([]);
    }
  }

  useEffect(() => {
    fetchProductsData();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Products"
        ? true
        : product.category === selectedCategory;
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div>
      <Navbar />

      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            // "url('https://images.unsplash.com/photo-1497005367839-6e852de72767?q=80&w=2934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            "url('https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 mb-4 w-full rounded-lg shadow-sm bg-gray-100 text-gray-700"
            style={{ display: "block", margin: "20px auto", width: "80%" }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 mb-4 w-full rounded-lg shadow-sm bg-gray-100 text-gray-700"
            style={{ display: "block", margin: "20px auto", width: "80%" }}
          >
            {categories.map((category) => (
              <option key={category} value={category} className="text-gray-700">
                {category}
              </option>
            ))}
          </select>

          {loading ? (
            <Spinner />
          ) : filteredProducts.length > 0 ? (
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] mb-[10vh]">
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-red-500">No Products Found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
