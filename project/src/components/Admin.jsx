import React, { useState } from 'react';
import ProductForm from './ProductForm';

export default function Admin({ items, loading, refreshItems }) {
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Called after adding or editing a product
  const handleProductSaved = () => {
    setShowForm(false);
    setEditProduct(null);
    refreshItems();
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;
    try {
      await fetch(`http://localhost:3000/menu/${id}`, { method: 'DELETE' });
      refreshItems();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  return (
    <>
      {!showForm && (
        <button
          className="bg-green-600 text-white px-4 py-2 mt-3 rounded-md mb-6 mx-auto block text-lg font-semibold shadow hover:bg-green-700 transition-colors duration-200"
          onClick={() => {
            setShowForm(true);
            setEditProduct(null);
          }}
        >
          + Add Product
        </button>
      )}
      {showForm ? (
        <ProductForm onSubmit={handleProductSaved} editProduct={editProduct} />
      ) : (
        <div className="flex justify-center items-center">
          <div className="overflow-x-auto ml-2 rounded-box border border-base-content/5 bg-base-100 w-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>item</th>
                  <th>price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-start">
                {items.map((itm) => (
                  <tr key={itm.id}>
                    <td>{itm.name}</td>
                    <td>{itm.price}</td>
                    <td>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEdit(itm)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(itm.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
