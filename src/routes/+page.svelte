<script lang="ts">
	import type { PageData } from './$types';
	import UploadForm from './uploadForm.svelte';
	let { data }: { data: PageData } = $props();
	import LineMdLoadingTwotoneLoop from '~icons/line-md/loading-twotone-loop';
	import MdiFileWord from '~icons/mdi/file-word';
	import MdiBookshelf from '~icons/mdi/bookshelf';
	import MdiBook from '~icons/mdi/book';
	import MdiScriptText from '~icons/mdi/script-text';
	import MdiArrowRightBold from '~icons/mdi/arrow-right-bold';
</script>

<div class="flex h-full flex-col items-center justify-start p-4">
	<div class="flex p-2">
		<MdiFileWord />
		<MdiScriptText />
		<MdiArrowRightBold />
		<MdiBook />
	</div>
	<div class="max-w-lr box p-4">
		<h1 class="mb-2 text-xl">Epub Conversion</h1>
		<p>Lade ein Libre Office Text oder Word Dokument hoch und lasse es zu epub konvertieren.</p>

		<UploadForm></UploadForm>
		<div class="flex items-center">
			<MdiBookshelf />
			<h2>Konvertierte Dokumente</h2>
		</div>
		<div class="list mb-2 w-full">
			{#await data.documents}
				<LineMdLoadingTwotoneLoop />
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
</div>
