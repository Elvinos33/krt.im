<script context="module" lang="ts">
  export type InputProps = {
    title: string,
    type: string,
    placeholder: string,
    icon: string,
    selection: Array<string>,
    selectDefault: string,
    divArg: string,
  }
</script>

<script lang="ts">
  import Icon from "@iconify/svelte"

  export let inputProps: InputProps;
  export let onSubmit: (input: string, metric: string) => void;
  export let isDisabled: boolean;

  let input: string = ''
  let selected: string = inputProps.selectDefault
</script>
<div class="flex w-full flex-col items-center gap-8">
  <h4 class="h4">{inputProps.title}</h4>
  <form class="flex w-1/3 min-w-[300px]" on:submit={e => {e.preventDefault(); onSubmit(input, selected); input = '';} }>
    {#if inputProps.selection.length > 0}
      <select bind:value={selected} class="w-fit select variant-ghost" name="" id="">
        {#each inputProps.selection as select}
          <option value="{select}">{select}</option>
        {/each}
      </select>
    {/if}
    {#if inputProps.divArg}
      <div class="flex justify-center items-center w-fit input variant-ghost p-4">{inputProps.divArg}</div>
    {/if}
    <input disabled={isDisabled} bind:value={input} autofocus required type="text" class="peer input variant-ghost w-full p-5 pl-2" placeholder="{inputProps.placeholder}">
    <button disabled={input === '' || isDisabled} class="btn variant-filled-secondary">
      <Icon icon="{inputProps.icon}" />
    </button>
  </form>
</div>
