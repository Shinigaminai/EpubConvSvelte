<script lang="ts">
	import { enhance } from '$app/forms';

	import MaterialSymbolsUploadRounded from '~icons/material-symbols/upload-rounded';
	import LineMdLoadingTwotoneLoop from '~icons/line-md/loading-twotone-loop';

	const authorizedExtension = ['.doc', '.docx', '.odt'];
	let loading = $state(false);

	function handleResponse(response: any) {
		console.log('Server response');
		console.log(response);
		loading = false;
	}

	function sendToServer() {
		console.log('Sending...');
		loading = true;
		return handleResponse;
	}
</script>

<form
	method="POST"
	class="mb-2 flex flex-col gap-2 md:flex-row"
	use:enhance={sendToServer}
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
