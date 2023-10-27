<script context="module" lang="ts">
  export type InputProps = {
    title: string,
    type: string,
    placeholder: string,
    icon: string,
    isNumber: boolean
  }
</script>

<script lang="ts">
  import Icon from "@iconify/svelte"

  export let inputProps: InputProps;
  export let onSubmit: (input: string, metric: string) => void;
  export let isDisabled: boolean;

  let input: string = ''
  let metric: string = 'ms'
</script>
<div class="flex w-full flex-col items-center gap-8">
  <h4 class="h4">{inputProps.title}</h4>
  <form class="flex w-1/3 min-w-[300px]" on:submit={e => {e.preventDefault(); onSubmit(input, metric); input = ''; metric = 'ms'} }>
    {#if inputProps.isNumber}
      <select bind:value={metric} class="w-fit select variant-ghost" name="" id="">
        <option value="ms">Milliseconds</option>
        <option value="s">Seconds</option>
        <option value="h">Hours</option>
        <option value="d">Days</option>
        <option value="yr">Years</option>
      </select>
    {/if}
    <input disabled={isDisabled} bind:value={input} autofocus required type="text" class="peer input variant-ghost w-full p-5" placeholder="{inputProps.placeholder}">
    <button disabled={input === '' || isDisabled} class="btn variant-filled-secondary">
      <Icon icon="{inputProps.icon}" />
    </button>
  </form>
</div>
