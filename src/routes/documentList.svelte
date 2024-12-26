<script lang="ts">
	import MdiBookshelf from '~icons/mdi/bookshelf';
	import LineMdLoadingTwotoneLoop from '~icons/line-md/loading-twotone-loop';

	let { documents }: { documents: string[] } = $props();
</script>

<div class="flex items-center">
	<MdiBookshelf />
	<h2>Konvertierte Dokumente</h2>
</div>
<div class="list mb-2 w-full">
	{#await documents}
		<LineMdLoadingTwotoneLoop />
		Laden...
	{:then documents}
		{#if documents != undefined && documents.length >= 1}
			<div class="flex flex-col">
				{#each documents as document}
					<a target="_blank" href="/download/{document}">{document}</a>
				{/each}
			</div>
		{:else}
			<p>Keine Dokumente gefunden</p>
		{/if}
	{:catch error}
		<p>Fehler beim Laden: {error.message}</p>
	{/await}
</div>
