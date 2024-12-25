<script lang="ts">
	import { enhance } from '$app/forms';
	const authorizedExtension = ['.doc', '.docx', '.odt'];
	let loading = false;
	import MaterialSymbolsUploadRounded from '~icons/material-symbols/upload-rounded';
	import LineMdLoadingTwotoneLoop from '~icons/line-md/loading-twotone-loop';

	function handleResponse(response: any) {
		console.log('Server response');
		console.log(response);
	}

	function sendToServer() {
		console.log('Sending...');
		return handleResponse;
	}
</script>

<form
	method="POST"
	class="mb-2 flex flex-col gap-2 md:flex-row"
	use:enhance={sendToServer()}
	enctype="multipart/form-data"
	action="/upload"
>
	<input
		class="block grow"
		id="file_input"
		type="file"
		name="fileToUpload"
		accept={authorizedExtension.join(',')}
		required
	/>
	<button type="button" class="form-button flex items-center justify-center">
		{#if loading}
			<LineMdLoadingTwotoneLoop />
		{:else}
			<MaterialSymbolsUploadRounded />
		{/if}
		Konvertieren
	</button>
</form>
