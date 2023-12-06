const apiUrl = 'https://striveschool-api.herokuapp.com/books'
const cart = []

const eleCart = document.querySelector('#cart')
const eleCatalog = document.querySelector('#catalog')

// Scaricare i dati dei libri
// quando i dati saranno disponibili vado a generare le cards
// iterando sull'array dei libri ricevuto

fetch(apiUrl)
	.then((response) => response.json())
	.then((data) => {
		let catalogContent = ''
		data.forEach((book) => {
			const card = `
				<div class="col">
					<div class="card">
						<img
							src="${book.img}"
							class="card-img-top"
							alt="${book.title}"
						/>
						<div class="card-body">
							<h5 class="card-title">${book.title}</h5>
							<p class="card-text">
								Categoria: ${book.category} <br />
								Prezzo: ${book.price}€
							</p>
							<button class="btn btn-primary btn-add" data-id="${book.asin}">Aggiungi</button>
							<button class="btn btn-danger btn-remove"><span>Scarta</span></button>
						</div>
					</div>
				</div>
			`
			catalogContent += card
		})

		eleCatalog.innerHTML = catalogContent

		document.querySelectorAll('.btn-remove').forEach((btnRemove) => {
			btnRemove.addEventListener('click', function (event) {
				console.log(event.target)
				console.log(this)
				this.closest('.col').remove()
			})
		})

		document.querySelectorAll('.btn-add').forEach((btnAdd) => {
			btnAdd.addEventListener('click', function () {
				const foundBook = data.find((book) => book.asin === this.dataset.id)
				cart.push(foundBook)
				renderCart()
			})
		})
	})

// l'utente clicca aggiungi
// prendiamo l'id del libro dal bottone
// cerchiamo il libro con questo id nell'array dei libri
// il libro trovato lo aggiungiamo all'array cart
// renderizzo l'array cart

function renderCart() {
	let cartContent = ''
	cart.forEach((book) => {
		const card = `
				<div class="col">
					<div class="card">
						<img
							src="${book.img}"
							class="card-img-top"
							alt="${book.title}"
						/>
						<div class="card-body">
							<h5 class="card-title">${book.title}</h5>
							<p class="card-text">
								Categoria: ${book.category} <br />
								Prezzo: ${book.price}€
							</p>
							<button class="btn btn-danger btn-remove" data-id="${book.asin}">Rimuovi</button>
						</div>
					</div>
				</div>
			`
		cartContent += card
	})

	eleCart.innerHTML = cartContent
}
