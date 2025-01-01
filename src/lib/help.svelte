<script lang="ts">
	import HelpIcon from '~icons/material-symbols/help-outline-rounded';

	let { children } = $props();
</script>

<div class="nogrow containerHelp relative">
	<HelpIcon class="opacity-30 hover:opacity-100"></HelpIcon>
	<div class="help hidden">{@render children()}</div>
</div>

<style>
	.containerHelp:hover > .help {
		display: block;
	}
	.help {
		display: hidden;
		position: absolute;
		padding: 1.5mm;
		background-color: rgba(53, 38, 7, 0.6);
		border-radius: 1.5mm;
		backdrop-filter: blur(1.5mm);
		z-index: 1;
	}
</style>
