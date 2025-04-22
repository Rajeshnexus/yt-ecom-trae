import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};