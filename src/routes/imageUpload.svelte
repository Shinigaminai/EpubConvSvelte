<script lang="ts">
	import cover_img from '$lib/cover.webp';
	import IconUpload from '~icons/material-symbols/upload-rounded';
	import IconDelete from '~icons/mdi/delete-outline';

	let fileInput: HTMLInputElement;
	let files: FileList;
	let customCover: string;

	function getBase64(image: File) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			if (e.target) {
				customCover = String(e.target.result);
			}
		};
	}

	function clearImage() {
		customCover = '';
		fileInput.value = '';
	}
</script>

<div class="align-center flex flex-row justify-center">
	<input
		class="hidden"
		id="customCoverUpload"
		name="cover"
		type="file"
		accept=".png,.jpg"
		bind:this={fileInput}
		bind:files
		on:change={() => getBase64(files[0])}
	/>
	{#if customCover}
		<button class="upload-btn" on:click={() => clearImage()}>
			<img id="cover" src={customCover} alt="custom cover" />
			<div class="edit p-2">
				<IconDelete></IconDelete>
			</div>
		</button>
	{:else}
		<button class="upload-btn" on:click={() => fileInput.click()}>
			<img id="cover" class="blur-sm brightness-50" src={cover_img} alt="cover" />
			<div class="absolute inset-0 content-center p-4">
				Cover automatisch erkennen oder generieren.
			</div>
			<div class="edit p-2">
				<IconUpload></IconUpload>
			</div>
		</button>
	{/if}
</div>

<style>
	#cover {
		border-radius: 1.5mm;
		max-height: 25rem;
	}

	.hidden {
		display: none;
	}

	.upload-btn {
		position: relative;
		overflow: hidden;
	}

	.edit {
		margin: auto;
		position: absolute;
		border-radius: 1.5mm;
		top: 1.5mm;
		left: 1.5mm;
		background-color: rgba(53, 38, 7, 0.6);
		z-index: 5;
		backdrop-filter: blur(1.5mm);
	}
</style>
