import { useState } from "react";
import type { Product } from "../../types/mockData";
import { Card, Button } from "antd";
import { useCartStore } from "../../stores/useCartStore";

interface ProductCardProps {
  product: Product;
  tenantSlug: string;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart, updateQuantity, removeItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const isInCart = cart.some((item) => item.id === product.id);
  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const handleIncrement = () => {
    if (isInCart) {
      updateQuantity(product.id, cartQuantity + 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (isInCart) {
      if (cartQuantity <= 1) {
        removeItem(product.id);
      } else {
        updateQuantity(product.id, cartQuantity - 1);
      }
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card
      className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
      cover={
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      }
    >
      <Card.Meta
        title={
          <h3 className="text-lg font-semibold text-gray-900">
            {product.title}
          </h3>
        }
        description={
          <div>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          </div>
        }
      />
      <div className="mt-4 flex justify-end gap-2">
        {isInCart ? (
          <>
            <div className="flex items-center gap-2">
              <Button
                className="px-2 py-1 min-w-[32px] h-8"
                onClick={handleDecrement}
                disabled={!isInCart && quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">
                {isInCart ? cartQuantity : quantity}
              </span>
              <Button
                className="px-2 py-1 min-w-[32px] h-8"
                onClick={handleIncrement}
              >
                +
              </Button>
            </div>
            <Button danger onClick={() => removeItem(product.id)}>
              Remove from Cart
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
