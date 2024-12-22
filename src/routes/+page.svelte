<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	let loading = false;
	let { data }: { data: PageData } = $props();
	const authorizedExtension = ['.doc', '.docx', '.odt'];
</script>

<div class="p-4">
	<h1 class="mb-2 text-xl">Epub Conversion</h1>
	<p>Lade ein Libre Office Text oder Word Dokument hoch und lasse es zu epub konvertieren.</p>

	<form
		method="post"
		class="mb-2 flex flex-col gap-2 md:flex-row"
		use:enhance={() => {}}
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
		<button type="button" class="form-button flex items-center justify-center">
			{#if loading}
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
						opacity=".25"
					/>
					<path
						fill="currentColor"
						d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
					>
						<animateTransform
							attributeName="transform"
							dur="0.75s"
							repeatCount="indefinite"
							type="rotate"
							values="0 12 12;360 12 12"
						/>
					</path>
				</svg>
			{/if}
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M11.5 15.577v-8.65l-2.33 2.33l-.708-.718L12 5l3.539 3.539l-.708.719L12.5 6.927v8.65zM6.616 19q-.691 0-1.153-.462T5 17.384v-2.423h1v2.423q0 .231.192.424t.423.192h10.77q.23 0 .423-.192t.192-.424v-2.423h1v2.423q0 .691-.462 1.153T17.384 19z"
				/></svg
			>
			Konvertieren
		</button>
	</form>

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
