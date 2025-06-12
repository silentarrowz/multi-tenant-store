import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { Typography, Input, Spin, Select } from "antd";
import { useCartStore } from "../../stores/useCartStore";
import { useTenantStore } from "../../stores/useTenantStore";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const StorefrontPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { selectedTenant, isLoading, error } = useTenantStore();
  const { cart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<"low-to-high" | "high-to-low"|"a-to-z"|"z-to-a" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Log cart value on render and when cart changes
  useEffect(() => {
    console.log("Cart:", cart);
  }, [cart]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spin tip="Loading tenant data..." />
      </div>
    );
  }

  if (error || !selectedTenant || selectedTenant.slug !== slug) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">
        {error || "Tenant not found"}
      </div>
    );
  }

  // Get unique categories from the tenant's products
  const categories = Array.from(new Set(selectedTenant.products.map((product) => product.category))).sort();
  console.log('categories : ', categories);
  // Filter products based on search query and selected category
  let filteredProducts = selectedTenant.products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
  }
  console.log('filteredProducts : ', filteredProducts);
  // Sort products by price if a sort option is selected
  if (sorting) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      if (sorting === "low-to-high") {
        return a.price - b.price;
      }else if(sorting === 'a-to-z'){
        if(a.title < b.title){
          return -1;
        }else {
          return 1;
        }
      }else if(sorting === 'z-to-a'){
        if(a.title< b.title){
          return 1;
        }else{
          return -1
        }
      }
      
      else {
        return b.price - a.price;
      }
    });
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Title className="!text-3xl sm:!text-4xl font-extrabold text-gray-900 mb-4">
          {selectedTenant.name}
        </Title>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-full sm:w-1/2">
            <Search
              placeholder="Search products..."
              allowClear
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
          <div className="w-full sm:w-1/4">
            <Select
              placeholder="Sort by Price"
              allowClear
              onChange={(value: "low-to-high" | "high-to-low" | undefined) => setSorting(value || null)}
              className="w-full"
            >
              <Option value="low-to-high">Price: Low to High</Option>
              <Option value="high-to-low">Price: High to Low</Option>
               <Option value="a-to-z">Name: A to Z</Option>
               <Option value="z-to-a">Name: Z to A</Option>
            </Select>
          </div>
          <div className="w-full sm:w-1/4">
            <Select
              placeholder="Filter by Category"
              allowClear
              onChange={(value: string | undefined) => setSelectedCategory(value || null)}
              className="w-full"
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-600">
            No products match your search or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}                
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorefrontPage;