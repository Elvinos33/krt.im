<script lang="ts">
	import '../app.postcss';
	import { AppShell, LightSwitch, Toast, getToastStore, initializeStores  } from '@skeletonlabs/skeleton';

  initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toast />

<!-- App Shell -->
<AppShell>
  <LightSwitch class="z-50 absolute m-5" />
	<slot />
</AppShell>
