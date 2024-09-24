document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('product-form');
  const nameInput = document.getElementById('name-input');
  const designInput = document.getElementById('design-input');
  const productList = document.getElementById('product-list');

  // Função para carregar produtos da API
  const loadProducts = () => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        productList.innerHTML = '';
        data.products.forEach(product => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${product.name} - ${product.design}
            <button data-id="${product.id}" class="delete-btn">Excluir</button>
          `;
          productList.appendChild(li);
        });

        // Adicionar eventos de exclusão
        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            deleteProduct(productId);
          });
        });
      });
  };

  // Função para adicionar novo produto
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = nameInput.value;
    const newDesign = designInput.value;

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName, design: newDesign })
    })
    .then(response => response.json())
    .then(() => {
      nameInput.value = '';
      designInput.value = '';
      loadProducts();
    });
  });

  // Função para excluir produto
  const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      loadProducts();
    });
  };

  // Carregar produtos ao iniciar
  loadProducts();
});
