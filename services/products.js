const BASE_URL = 'https://api.escuelajs.co/api/v1';

async function fetchProducts(productId = null, categoryId = null) {
    let endpoint = `${BASE_URL}/products`;

    if (productId) {
        endpoint = `${BASE_URL}/products/${productId}`;
    } else if (categoryId) {
        endpoint = `${BASE_URL}/products/?categoryId=${categoryId}`;
    }

    try {
        let response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Falha no Http`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

    async function fetchCategories(categoryId = null) {
        
        let endpoint = categoryId ? `${BASE_URL}/categories/${categoryId}` : `${BASE_URL}/categories`;

        try {
            let response = await fetch(endpoint);

            if(!response.ok) {
                throw new Error(`Erro no Http`);
            }

            let data = await response.json();

            return data
        }catch(error) {
            console.error(error)
            
        }
    }

    async function getTop3Products() {
        const allProducts = await fetchProducts();

        if(!allProducts) {
            return []
        }

        const products = allProducts.slice(0,3);

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
                        <span class="card-price">R$ ${product.price}</span>
                        <a href="detalhes.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `;

            container.innerHTML += cardHTML;
        });

    }

    async function renderCategories() {
        const categories = await fetchCategories();

        if(!categories) {
            return;
        }
        
        let htmlOptions = '<option value="">Todas as Categorias</option>';

        const container = document.getElementById('category-filter');

        categories.forEach(category => {
            htmlOptions += `<option value="${category.id}">${category.name}</option>`;
        });

        container.innerHTML = htmlOptions;
    }

    function renderProducts(products) {
    const container = document.getElementById('products-list');
    if (!container) return;

    if (!products || products.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    let html = "";
    products.forEach(product => {
        html += `
            <article class="card">
                <div class="card-img-wrapper">
                    <img src="${product.images[0]}" alt="${product.title}" class="card-img" onerror="this.src='https://placehold.co/600x400?text=Imagem+Indisponível'">
                </div>
                <div class="card-content">
                    <span class="card-category">${product.category.name}</span>
                    <h3 class="card-title">${product.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${product.price}</span>
                        <a href="detalhes.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>`;
    });
    container.innerHTML = html;
}

    async function filterProducts(id) {
    const filtered = await fetchProducts(null, id);
    renderProducts(filtered);
    }  

    async function init() {

        getTop3Products();
    await renderCategories();
    
    const allProducts = await fetchProducts();
    renderProducts(allProducts); 
}

init();



