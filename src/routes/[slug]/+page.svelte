<script lang="ts">
  import { onMount } from "svelte";
  export let data;
    
  onMount(() => window.location = data.url);

</script>
