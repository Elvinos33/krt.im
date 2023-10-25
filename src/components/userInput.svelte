<script context="module" lang="ts">
  export type InputProps = {
    title: string,
    type: string,
    placeholder: string,
    icon: string,
  }
</script>

<script lang="ts">
  import Icon from "@iconify/svelte"

  export let inputProps: InputProps;
  export let onSubmit: (input: string) => void;

  let input: string = ''
</script>
<div class="flex w-full flex-col items-center gap-8">
  <h3 class="h4">{inputProps.title}</h3>
  <form class="flex gap-2 w-1/3 min-w-[300px]" on:submit={e => {e.preventDefault(); onSubmit(input); input = ''} }>
    <input bind:value={input} autofocus required type="text" class="peer input variant-ghost w-full p-5" placeholder="{inputProps.placeholder}" name="" id="">
    <button disabled={input === ''} class="btn variant-filled-secondary">
      <Icon icon="{inputProps.icon}" />
    </button>
  </form>
</div>

