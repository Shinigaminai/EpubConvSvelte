<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import UploadForm from './uploadForm.svelte';
	import MdiFileWord from '~icons/mdi/file-word';
	import MdiBook from '~icons/mdi/book';
	import MdiScriptText from '~icons/mdi/script-text';
	import MdiArrowRightBold from '~icons/mdi/arrow-right-bold';
	import DocumentList from './documentList.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="flex h-full flex-col items-center justify-start p-4">
	<div class="flex p-2">
		<MdiFileWord />
		<MdiScriptText />
		<MdiArrowRightBold />
		<MdiBook />
	</div>
	<div class="max-w-lr box p-4">
		<h1 class="mb-2 text-xl">EPUB Konvertierer</h1>
		<p>
			Lade ein Libre Office Text, Word Dokument oder PDF Dokument hoch und lasse es zu EPUB
			konvertieren.
		</p>

		<UploadForm></UploadForm>
		{#if form?.error}
			<div class="errorbox mb-2">
				<p>{form.message}</p>
			</div>
		{/if}

		<DocumentList documents={data.documents}></DocumentList>
	</div>
</div>
