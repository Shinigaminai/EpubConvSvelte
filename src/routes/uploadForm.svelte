<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import MaterialSymbolsUploadRounded from '~icons/material-symbols/upload-rounded';
	import LineMdLoadingTwotoneLoop from '~icons/line-md/loading-twotone-loop';
	import { goto, invalidateAll } from '$app/navigation';

	import MaterialSymbolsTitle from '~icons/material-symbols/title';
	import MaterialSymbolsAccountCircle from '~icons/material-symbols/account-circle';

	import ImageUpload from './imageUpload.svelte';
	import Help from '$lib/help.svelte';

	const authorizedExtension = ['.doc', '.docx', '.odt', '.pdf', '.rtf'];
	let loading = $state(false);
	// let callback: Function = $props();
</script>

<form
	method="POST"
	class="mb-2"
	use:enhance={({ formElement, formData, action, cancel }) => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			// `result` is an `ActionResult` object
			if (result.type === 'redirect') {
				goto(result.location);
			} else {
				await applyAction(result);
				console.log('reload all data');
				invalidateAll();
			}
		};
	}}
	enctype="multipart/form-data"
>
	<div class="mb-2 flex flex-col flex-nowrap gap-2 md:flex-row">
		<ImageUpload></ImageUpload>
		<div class="inputbox flex grow flex-col gap-2">
			<div>
				<label for="title" class="flex flex-nowrap items-center">
					<MaterialSymbolsTitle></MaterialSymbolsTitle>
					<div class="mx-1">Titel</div>
					<Help>Auto: Titel basierend auf Dateinamen generieren.</Help>
				</label>
				<input type="text" name="title" id="title" placeholder="auto" />
			</div>
			<div>
				<label for="author" class="flex flex-nowrap items-center">
					<MaterialSymbolsAccountCircle></MaterialSymbolsAccountCircle>
					<div class="mx-1">Autor(en)</div>
					<Help>Mehrere Autoren mit einem Semikolon trennen.</Help>
				</label>
				<input type="text" name="author" id="author" placeholder="unkown" />
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2 md:flex-row">
		<input
			class="block grow"
			id="file_input"
			type="file"
			name="fileToUpload"
			accept={authorizedExtension.join(',')}
			required
		/>
		<button type="submit" class="form-button flex items-center justify-center">
			{#if loading}
				<LineMdLoadingTwotoneLoop />
			{:else}
				<MaterialSymbolsUploadRounded />
			{/if}
			Konvertieren
		</button>
	</div>
</form>
