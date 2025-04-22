import { useState } from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { products as initialProducts } from '../data/products';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const emptyProduct: Product = {
  id: 0,
  name: '',
  price: 0,
  description: '',
  imageUrl: ''
};

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...form, id: editingProduct.id } : p));
    } else {
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([...products, { ...form, id: newId }]);
    }
    setForm(emptyProduct);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm(product);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyProduct);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
    <button onClick={handleAdd}>Add Product</button>
    {/* <button onClick={() => signOut(auth)} style={{ background: '#ff4444', color: 'white' }}>Logout</button> */}
  </div>
    <div className="product-list">
     
      {showForm && (
        <form className="product-form" onSubmit={handleSubmit} style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required min="0" step="0.01" />
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <div style={{ marginTop: '0.5rem' }}>
            <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
            <button type="button" onClick={handleCancel} style={{ marginLeft: '0.5rem' }}>Cancel</button>
          </div>
        </form>
      )}
      {products.map(product => (
        <div key={product.id} style={{ position: 'relative' }}>
          <ProductCard product={product} />
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <button onClick={() => handleEdit(product)} style={{ marginRight: '0.5rem' }}>Edit</button>
            <button onClick={() => handleDelete(product.id)} style={{ color: 'red' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
    </>
  
  );
}