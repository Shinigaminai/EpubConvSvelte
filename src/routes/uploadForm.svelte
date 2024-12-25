<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import MaterialSymbolsUploadRounded from '~icons/material-symbols/upload-rounded';
	import LineMdLoadingTwotoneLoop from '~icons/line-md/loading-twotone-loop';
	import { goto, invalidateAll } from '$app/navigation';

	const authorizedExtension = ['.doc', '.docx', '.odt'];
	let loading = $state(false);
	// let callback: Function = $props();
</script>

<form
	method="POST"
	class="mb-2 flex flex-col gap-2 md:flex-row"
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
</form>
