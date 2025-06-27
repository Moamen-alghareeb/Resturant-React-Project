import React, { useState, useEffect } from 'react'
import menuData from '../../menu.json'

function ProductForm({ onSubmit, editProduct }) {
  const categories = menuData.category;
  const [name, setName] = useState(editProduct ? editProduct.name : '');
  const [price, setPrice] = useState(editProduct ? editProduct.price : '');
  const [selectedCategory, setSelectedCategory] = useState(editProduct ? editProduct.category : (categories[0]?.id || ''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price);
      setSelectedCategory(editProduct.category);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editProduct) {
        // Edit mode: update product
        const res = await fetch(`http://localhost:3000/menu/${editProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...editProduct,
            name,
            price,
            category: Number(selectedCategory)
          })
        });
        if (!res.ok) throw new Error('Failed to update product');
      } else {
        // Add mode: add new product
        const res = await fetch('http://localhost:3000/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            price,
            category: Number(selectedCategory),
            count: 0,
            isInCart: false
          })
        });
        if (!res.ok) throw new Error('Failed to add product');
      }
      setName('');
      setPrice('');
      setSelectedCategory(categories[0]?.id || '');
      if (onSubmit) onSubmit();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <div className="flex justify-center items-center min-h-[40vh] mt-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            placeholder='Product Name'
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Product Price</label>
          <input
            type="number"
            placeholder='Product Price'
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type='submit'
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? (editProduct ? 'Saving...' : 'Adding...') : (editProduct ? 'Save Changes' : 'Add Product')}
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </div>
  )
}

export default ProductForm