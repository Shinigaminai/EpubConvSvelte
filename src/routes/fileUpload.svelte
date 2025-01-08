<script lang="ts">
	import IconUpload from '~icons/material-symbols/upload-rounded';

	let fileInput: HTMLInputElement;
	let files: FileList;
	const authorizedExtension = ['.doc', '.docx', '.odt', '.pdf', '.rtf'];
</script>

<button
	class="flex grow flex-row flex-nowrap items-center justify-center gap-1"
	type="button"
	on:click={() => fileInput.click()}
>
	<div class="hidden-visible">
		<input
			class="p-1"
			id="file_input"
			type="file"
			name="fileToUpload"
			accept={authorizedExtension.join(',')}
			required
			bind:this={fileInput}
			bind:files
			tabindex="-1"
		/>
	</div>
	<IconUpload />
	{#if files && files.length}
		{#each Array.from(files) as f}
			<div class="text-wrap">
				{f.name}
			</div>
		{/each}
	{:else}
		<div class="text-nowrap">Datei auswählen</div>
	{/if}
</button>
