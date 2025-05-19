import { Link } from "react-router-dom";
import { Table, Button, InputNumber, Typography } from "antd";
import { useCartStore } from "../../stores/useCartStore";
import { useTenantStore } from "../../stores/useTenantStore";

const { Title } = Typography;

const CartPage = () => {
  const { cart, updateQuantity, removeItem, getTotal } = useCartStore();
  const selectedTenant = useTenantStore((state) => state.selectedTenant);
  
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_: any, record: any) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value || 1)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_: any, record: any) =>
        `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => removeItem(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Title className="!text-3xl sm:!text-4xl font-extrabold text-gray-900 mb-8">
          Shopping Cart
        </Title>
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
            <Button type="primary">
              <Link to={`/store/${selectedTenant?.slug}`}>Shop Now</Link>
            </Button>
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={cart}
              rowKey="id"
              pagination={false}
              className="mb-8"
            />
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-900">
                  Total: ${getTotal().toFixed(2)}
                </p>
                <Link to="/checkout">
                  <Button type="primary" size="large" className="mt-4">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
