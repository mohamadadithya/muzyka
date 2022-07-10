<script>
	import '../assets/css/main.css';
</script>

<svelte:head>
	<title>Muzyka</title>
	<link
		href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css"
		rel="stylesheet"
		type="text/css"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<slot />
</main>

<style>
	main {
		padding: 1.4em;
		max-width: 800px;
		margin: 0 auto;
	}

	@media (min-width: 768px) {
		main {
			padding: 0 2em;
		}
	}
</style>
