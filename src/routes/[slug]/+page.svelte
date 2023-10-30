<script lang="ts">
  import { onMount } from "svelte";
  export let data;
    
  onMount(() => window.location = data.url);

</script>

<body class="absolute inset-0 flex justify-center items-center">
  <h2 class="h2">Redirecting...</h2>
</body>
