const API = "https://localhost:7233/api";

function setStatus(message) {
	document.getElementById("status").textContent = message;
}

async function loadProducts() {
	setStatus("Loading...");
	try {
		const response = await fetch(`${API}/products`);

		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}

		const products = await response.json();
		displayProducts(products);
		setStatus(`Loaded ${products.length} products from the database.`);
	} catch (error) {
		setStatus(
			"Error: Could not connect to API. Make sure dotnet run is active.",
		);
		console.error(error);
	}
}

function displayProducts(products) {
	const container = document.getElementById("product-list");
	container.innerHTML = "";

	products.forEach((p) => {
		const card = document.createElement("div");
		card.className = "product-card";

		card.innerHTML = `
      <h3>${p.name}</h3>
      <div class="price">$${p.price.toFixed(2)}</div>
      <div class="sku">SKU: ${p.sku}</div>
      <span class="available ${p.isAvailable ? "yes" : "no"}">
        ${p.isAvailable ? "In Stock" : "Out of Stock"}
      </span>
      <br>
      <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
    `;

		container.appendChild(card);
	});
}

async function addProduct() {
	const name = document.getElementById("newName").value.trim();
	const price = parseFloat(document.getElementById("newPrice").value);

	if (!name || isNaN(price)) {
		setStatus("Please enter a product name and price.");
		return;
	}

	try {
		const response = await fetch(`${API}/products`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				sku: "NEW" + Date.now(),
				price: price,
				isAvailable: true,
				categoryId: 1,
				description: "N/A",
			}),
		});

		if (!response.ok) throw new Error("Failed to add product");

		document.getElementById("newName").value = "";
		document.getElementById("newPrice").value = "";
		setStatus(`Product "${name}" added successfully.`);
		loadProducts();
	} catch (error) {
		setStatus("Error adding product.");
		console.error(error);
	}
}

async function deleteProduct(id) {
	try {
		const response = await fetch(`${API}/products/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) throw new Error("Failed to delete");

		setStatus(`Product ${id} deleted.`);
		loadProducts();
	} catch (error) {
		setStatus("Error deleting product.");
		console.error(error);
	}
}

// Auto-load on page open
loadProducts();
