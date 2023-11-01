<script lang="ts">
  import { clipboard } from "@skeletonlabs/skeleton";

  export let path: string;

  const finalURL = `krt.im/${path}`
</script>

<div class="w-full flex flex-col items-center gap-8">
  <h1 class="h1">Hooray!</h1> 
  <h4 class="h4">Your new shortened URL is</h4> 
  <div class="card input md:bg-opacity-100 variant-ghost bg-opacity-0 p-5 flex md:flex-row flex-col w-1/3 justify-between items-center gap-4">
    <a href={`https://${finalURL}`} class="h5">{finalURL}</a>
    <button class="btn h-full variant-filled-secondary" use:clipboard={finalURL}>
      Copy
    </button>
  </div>
  <h5 class="h5">Want another link?</h5>
  <a data-sveltekit-reload href="/" class="btn variant-filled-secondary">Create</a>
</div>
