import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message, Spin, Row, Col } from "antd";
import { useCartStore } from "../../stores/useCartStore";

const { Title } = Typography;

const CheckoutPage = () => {
  const { cart, clearCart, getTotal } = useCartStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLoading(true);
    // Store cart before clearing
    const orderDetails = [...cart];
    const total = getTotal();
    // Simulate API call
    setTimeout(() => {
      console.log("Order placed:", { ...values, cart: orderDetails, total });
      clearCart();
      message.success("Order placed successfully!");
      setLoading(false);
      form.resetFields();
      // Navigate to OrderSummaryPage with customer and order details
      navigate("/order-summary", {
        state: {
          customerDetails: values,
          orderDetails: orderDetails,
          total: total,
        },
      });
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Title className="!text-3xl sm:!text-4xl font-extrabold text-gray-900 mb-8">
            Checkout
          </Title>
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <Button type="primary">
            <Link to="/">Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Spin
        spinning={loading}
        tip="Processing your order..."
        wrapperClassName="min-h-screen"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
            >
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Full name is required" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Email is required",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input.TextArea
                  placeholder="Enter your shipping address"
                  rows={3}
                />
              </Form.Item>

              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[
                  { required: true, message: "Please enter your card number" },
                  {
                    pattern: /^\d+$/,
                    message: "Card number must contain only numbers",
                  },
                  {
                    min: 12,
                    message: "Card number must be at least 12 digits",
                  },
                ]}
                style={{ marginBottom: "16px" }}
              >
                <Input placeholder="1234 5678 9012 3456" />
              </Form.Item>

              {/* CVV and Expiry Date in the same row */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[
                      { required: true, message: "Please enter the CVV" },
                      {
                        pattern: /^\d{3,4}$/,
                        message: "CVV must be 3 or 4 digits",
                      },
                    ]}
                  >
                    <Input placeholder="123" maxLength={4} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="expiryDate"
                    label="Expiry Date"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the expiry date",
                      },
                      {
                        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: "Expiry date must be in MM/YY format",
                      },
                      {
                        validator(_, value) {
                          if (!value) return Promise.resolve();
                          const [month, year] = value.split("/").map(Number);
                          const expiry = new Date(2000 + year, month - 1);
                          const today = new Date();
                          if (expiry < today) {
                            return Promise.reject(
                              new Error("Card has expired")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="MM/YY" maxLength={5} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  disabled={loading}
                >
                  Place Order
                </button>
              </Form.Item>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span>${(getTotal() + 5).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default CheckoutPage;
