document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    loader.style.display = 'block'; // Show loader

    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
            loader.style.display = 'none'; // Hide loader after load
        });

   function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>ราคา: ${formatPrice(product.price)} บาท</p>
        `;
        productList.appendChild(card);
    });
}
 function formatPrice(price) {
        return price.toLocaleString('th-TH');
    }

    searchInput.addEventListener('keyup', () => {
        
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
});