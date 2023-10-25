<script lang="ts">
  import UserInput from "../components/userInput.svelte";
  import type { InputProps } from "../components/userInput.svelte";
  import { fly } from "svelte/transition";
  
  let currentStage = 0;
  const allStages: Array<InputProps> = [
    {
      title: "Where would you like to redirect to?",
      type: "url",
      placeholder: "Please enter a URL...",
      icon: "mdi:arrow-right",
    },
    {
      title: "Where would you like to redirect from?",
      type: "url",
      placeholder: "krt.im/...",
      icon: "mdi:arrow-right",
    },
    {
      title: "How long would you like the link to last?",
      type: "url",
      placeholder: "krt.im/...",
      icon: "icons8:finish-flag",
    },
  ]

  $: UserInputProps = allStages[currentStage]

  function isValidURL(url: string) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(url);
  }

  async function doesPathExist(path: string) {
    const response = await fetch(`/?path=${path}`)

    if (response.status == 302) {
      return true;
    } else {
      return false;
    }
  }
  
  async function onSubmit(input: string) {
    if (currentStage === 0) {
      if (isValidURL(input)) {
        currentStage++
      } else {
        console.log("URL is not valid!")
      }
    } else if (currentStage === 1) {
      if (await doesPathExist(input)) {
        console.log("Path already exists")
      } else {
        currentStage++
      }
    }
    console.log(input)
  }
</script>


<div class="w-full h-full flex flex-col gap-10 items-center justify-center">
  {#if UserInputProps == allStages[0]}
    <h1 out:fly={{x: 300}} class="h1 mb-56">Welcome to krt.im</h1>
  {/if}
  {#key UserInputProps}
    <div in:fly={{delay: 200, x:-300}} out:fly={{x: 300}} class="w-full absolute">
      <UserInput inputProps={UserInputProps} onSubmit={onSubmit}/>
    </div>
  {/key}
</div>
