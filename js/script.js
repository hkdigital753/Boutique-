/* =========================================
   CONFIGURATION
========================================= */

const WHATSAPP_NUMBER = "22673015938";


/* =========================================
   PRODUITS
========================================= */

const products = [
    {
        id: 1,
        name: "Sac à main élégant",
        category: "Sacs",
        price: 15000,
        image: "images/produits/produit-1.jpg",
        description: "Un sac élégant et pratique pour accompagner vos sorties au quotidien."
    },

    {
        id: 2,
        name: "Montre classique",
        category: "Accessoires",
        price: 20000,
        image: "images/produits/produit-2.jpg",
        description: "Une montre élégante au style classique, idéale pour compléter votre tenue."
    },

    {
        id: 3,
        name: "Chaussure moderne",
        category: "Chaussures",
        price: 25000,
        image: "images/produits/produit-3.jpg",
        description: "Une paire moderne et confortable adaptée à différents styles."
    },

    {
        id: 4,
        name: "Parfum Premium",
        category: "Parfums",
        price: 18000,
        image: "images/produits/produit-4.jpg",
        description: "Un parfum raffiné avec une fragrance agréable et durable."
    },

    {
        id: 5,
        name: "Lunettes tendance",
        category: "Accessoires",
        price: 10000,
        image: "images/produits/produit-5.jpg",
        description: "Des lunettes modernes pour apporter une touche tendance à votre style."
    },

    {
        id: 6,
        name: "T-shirt Premium",
        category: "Vêtements",
        price: 12000,
        image: "images/produits/produit-6.jpg",
        description: "Un t-shirt confortable et élégant pour un look simple et moderne."
    }
];


/* =========================================
   ÉTAT DE LA BOUTIQUE
========================================= */

let cart = JSON.parse(localStorage.getItem("boutiqueCart")) || [];

let currentCategory = "Tous";
let currentSearch = "";

let selectedProduct = null;
let selectedQuantity = 1;


/* =========================================
   ÉLÉMENTS HTML
========================================= */

const productsGrid = document.getElementById("productsGrid");
const noProducts = document.getElementById("noProducts");

const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-button");

const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");
const checkoutWhatsApp = document.getElementById("checkoutWhatsApp");

const contactWhatsApp = document.getElementById("contactWhatsApp");

const productModal = document.getElementById("productModal");
const productModalOverlay = document.getElementById("productModalOverlay");
const closeProductModal = document.getElementById("closeProductModal");

const modalProductImage = document.getElementById("modalProductImage");
const modalProductCategory = document.getElementById("modalProductCategory");
const modalProductName = document.getElementById("modalProductName");
const modalProductDescription = document.getElementById("modalProductDescription");
const modalProductPrice = document.getElementById("modalProductPrice");

const decreaseQuantity = document.getElementById("decreaseQuantity");
const increaseQuantity = document.getElementById("increaseQuantity");
const productQuantity = document.getElementById("productQuantity");

const addToCartButton = document.getElementById("addToCart");


/* =========================================
   FORMATAGE DU PRIX
========================================= */

function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}


/* =========================================
   SAUVEGARDE DU PANIER
========================================= */

function saveCart() {
    localStorage.setItem("boutiqueCart", JSON.stringify(cart));
}


/* =========================================
   AFFICHAGE DES PRODUITS
========================================= */

function displayProducts() {

    productsGrid.innerHTML = "";

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            currentCategory === "Tous" ||
            product.category === currentCategory;

        const searchText = currentSearch.toLowerCase().trim();

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });


    if (filteredProducts.length === 0) {

        noProducts.hidden = false;

        return;
    }


    noProducts.hidden = true;


    filteredProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.dataset.productId = product.id;


        card.innerHTML = `
            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-category">
                    ${product.category}
                </span>

            </div>


            <div class="product-info">

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        type="button"
                        class="view-product"
                    >
                        Voir le produit →
                    </button>

                </div>

            </div>
        `;


        card.addEventListener("click", () => {
            openProductModal(product.id);
        });


        productsGrid.appendChild(card);
    });
}


/* =========================================
   CATÉGORIES
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.category;

        displayProducts();
    });
});


/* =========================================
   RECHERCHE
========================================= */

if (searchInput) {

    searchInput.addEventListener("input", event => {

        currentSearch = event.target.value;

        displayProducts();
    });
}


/* =========================================
   OUVRIR LE PRODUIT
========================================= */

function openProductModal(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    selectedProduct = product;

    selectedQuantity = 1;

    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;

    modalProductCategory.textContent = product.category;
    modalProductName.textContent = product.name;
    modalProductDescription.textContent = product.description;
    modalProductPrice.textContent = formatPrice(product.price);

    productQuantity.textContent = selectedQuantity;

    productModal.hidden = false;
