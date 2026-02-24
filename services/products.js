
    async function fetchProducts(productId = null) {

        const endpoint = productId ? `products/${productId}` : 'products';

    const productUrl = `https://api.escuelajs.co/api/v1/${endpoint}`;

        try {
            const response = await fetch(productUrl);

            if(!response.ok) {
                throw new Error(`Falha no Http`)
            }

            const data = await response.json();
            
            return data;
        } catch(error) {
            console.error(error)
        }
    }

    async function getTop3Products() {
        const allProducts = await fetchProducts();

        if(!allProducts) {
            return []
        }

        products = allProducts.slice(0,3);

        const container = document.getElementById('featured-list');

        container.innerHTML = "";

        products.forEach(product => {

            const cardHTML = `
            <article class="card">
                <div class="card-img-wrapper">
                    <img src="${product.images[0]}" alt="${product.title}" class="card-img">
                </div>
                <div class="card-content">
                    <span class="card-category">${product.category.name}</span>
                    <h3 class="card-title">${product.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <a href="detalhes.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `;

            container.innerHTML += cardHTML;
        });

    }

    getTop3Products();


