// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    if (data.success) {
      displayProducts(data.products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function displayProducts(products) {
  const container = document.getElementById('featured-products') || document.getElementById('products-list');
  
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="category">${product.category?.name || 'Uncategorized'}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
          ${product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
        </p>
        <a href="/products/${product._id}" class="btn btn-primary">View Details</a>
      </div>
    </div>
  `).join('');
}

// Add to cart
async function addToCart(productId) {
  const quantity = document.getElementById('quantity')?.value || 1;
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login first');
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId,
        quantity: parseInt(quantity)
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('Product added to cart!');
      fetchCart();
    } else {
      alert(data.message || 'Error adding to cart');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Error adding to cart');
  }
}

// Fetch cart
async function fetchCart() {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('No token found');
    return;
  }

  try {
    const response = await fetch('/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      displayCart(data.cart, data.totalPrice);
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}

// Display cart
function displayCart(cart, totalPrice) {
  const container = document.getElementById('items-list');

  if (!container) return;

  if (!cart.items || cart.items.length === 0) {
    container.innerHTML = '<p>Your cart is empty</p>';
    document.getElementById('subtotal').textContent = '$0.00';
    document.getElementById('total').textContent = '$0.00';
    return;
  }

  container.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <img src="${item.product.imageUrl || 'https://via.placeholder.com/100'}" alt="${item.product.name}">
      <div style="flex: 1;">
        <h4>${item.product.name}</h4>
        <p>Price: $${item.product.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${(item.product.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="btn btn-danger" onclick="removeFromCart('${item.product._id}')">Remove</button>
    </div>
  `).join('');

  document.getElementById('subtotal').textContent = `$${totalPrice.toFixed(2)}`;
  document.getElementById('total').textContent = `$${totalPrice.toFixed(2)}`;
}

// Remove from cart
async function removeFromCart(productId) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login first');
    return;
  }

  try {
    const response = await fetch('/api/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();

    if (data.success) {
      fetchCart();
    } else {
      alert(data.message || 'Error removing from cart');
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    alert('Error removing from cart');
  }
}

// Fetch orders
async function fetchOrders() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login first');
    return;
  }

  try {
    const response = await fetch('/api/orders/my-orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      displayOrders(data.orders);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

// Display orders
function displayOrders(orders) {
  const container = document.getElementById('orders-list');

  if (!container) return;

  if (!orders || orders.length === 0) {
    container.innerHTML = '<p>No orders found</p>';
    return;
  }

  container.innerHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="padding: 10px; border: 1px solid #ddd;">Order ID</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Date</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Action</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(order => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${order._id}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Date(order.createdAt).toLocaleDateString()}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">$${order.totalAmount.toFixed(2)}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${order.orderStatus}</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="/orders/${order._id}">View</a></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('featured-products') || document.getElementById('products-list')) {
    fetchProducts();
  }

  if (document.getElementById('items-list')) {
    fetchCart();
  }

  if (document.getElementById('orders-list')) {
    fetchOrders();
  }
});