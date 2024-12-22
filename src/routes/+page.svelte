<script lang="ts">
	import type { PageData } from './$types';
	import UploadForm from './uploadForm.svelte';
	let { data }: { data: PageData } = $props();
</script>

<div class="p-4">
	<h1 class="mb-2 text-xl">Epub Conversion</h1>
	<p>Lade ein Libre Office Text oder Word Dokument hoch und lasse es zu epub konvertieren.</p>

	<UploadForm></UploadForm>

	<h2>Konvertierte Dokumente</h2>
	<div class="list mb-2 w-full">
		{#await data.documents}
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
				><g
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					><path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"
						><animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							dur="0.3s"
							values="16;0"
						/><animateTransform
							attributeName="transform"
							dur="1.5s"
							repeatCount="indefinite"
							type="rotate"
							values="0 12 12;360 12 12"
						/></path
					><path
						stroke-dasharray="64"
						stroke-dashoffset="64"
						stroke-opacity=".3"
						d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
						><animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							dur="1.2s"
							values="64;0"
						/></path
					></g
				></svg
			>
			Laden...
		{:then documents}
			{#if documents != undefined && documents.length >= 1}
				{#each documents as document}
					<p>{document}</p>
				{/each}
			{:else}
				<p>Keine Dokumente gefunden</p>
			{/if}
		{:catch error}
			<p>Fehler beim Laden: {error.message}</p>
		{/await}
	</div>
</div>
