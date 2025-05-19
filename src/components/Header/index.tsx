import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCartStore } from "../../stores/useCartStore";
import { useTenantStore } from "../../stores/useTenantStore";

const Header = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const selectedTenant = useTenantStore((state) => state.selectedTenant);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {selectedTenant ? (
            <>
              <img
                src={selectedTenant.logo}
                alt={`${selectedTenant.name} logo`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-2xl font-bold">{selectedTenant.name}</span>
            </>
          ) : (
            <span className="text-2xl font-bold">Multi-Tenant Store</span>
          )}
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Button
            type="primary"
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 border-none"
          >
            <ShoppingCartOutlined />
            Show Cart ({totalItems})
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;