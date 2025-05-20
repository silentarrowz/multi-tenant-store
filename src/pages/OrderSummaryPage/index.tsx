import { Link, useLocation } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const OrderSummaryPage = () => {
  const { state } = useLocation();
  const { customerDetails, orderDetails, total } = state || {};

  if (!state || !customerDetails || !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto text-center">
          <Title className="!text-2xl font-semibold mb-4">Order Summary</Title>
          <p className="text-lg text-gray-600 mb-4">No order found. Please place an order first.</p>
          <Button type="primary">
            <Link to="/">Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { fullName, email, address, cardNumber } = customerDetails;
  const maskedCardNumber = `**** **** **** ${cardNumber.slice(-4)}`;
  const shippingCost = 5.00;
  const grandTotal = total + shippingCost;

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <Title className="!text-2xl font-semibold mb-6">Order Summary</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Details */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Full Name:</span>
                <span>{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Shipping Address:</span>
                <span className="text-right">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Card Number:</span>
                <span>{maskedCardNumber}</span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <div className="space-y-2 text-sm">
              {orderDetails.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between mt-2 pt-2 border-t">
                <span>Item Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button type="primary">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;