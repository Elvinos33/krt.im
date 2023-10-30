<script lang="ts">
  import UserInput from "../components/userInput.svelte";
  import type { InputProps } from "../components/userInput.svelte";
  import { fly } from "svelte/transition";
  import { isValidURL, doesPathExist, sendRequest } from "$lib/validation"
  import Complete from "../components/complete.svelte";
  import { getToastStore } from '@skeletonlabs/skeleton'
  import type { ToastSettings } from "@skeletonlabs/skeleton";

  
  const toastStore = getToastStore();
  let currentStage: number = 0;
  let isDisabled: boolean = false;
  type requestType = {
    url: string,
    path: string,
    timer: number
  }

  const allStages: Array<InputProps> = [
    {
      title: "Where would you like to redirect to?",
      type: "url",
      placeholder: "Please enter a URL...",
      icon: "mdi:arrow-right",
      isNumber: false
    },
    {
      title: "What is the shortened name?",
      type: "url",
      placeholder: "Path...",
      icon: "mdi:arrow-right",
      isNumber: false
    },
    {
      title: "How long would you like the link to last?",
      type: "url",
      placeholder: "Time...",
      icon: "icons8:finish-flag",
      isNumber: true,
    },
  ]

  $: UserInputProps = allStages[currentStage]

  let requestData:requestType = {
    url: "",
    path: "",
    timer: 0
    
  }

  function toastError(message: string) {
    const toast: ToastSettings = {
      message: message,
      hideDismiss: true,
      background: 'variant-filled-error'
    }
    toastStore.trigger(toast)
  } 


 async function onSubmit(input: string, metric: string) {
    if (currentStage === 0) {
      
      if (isValidURL(input)) {
        if (!input.includes("https://")) {
          input = `https://${input}`
        }
        currentStage++
        requestData.url = input
      } else {
        toastError("Invalid URL! Please try again.")
      }

    } else if (currentStage === 1) {
      isDisabled = true
      if (await doesPathExist(input)) {
        toastError("This path is already exists. Please try another path.")
        } else {
        currentStage++
        requestData.path = input
      }
      isDisabled = false;

    } else if (currentStage === 2) {
          requestData.timer = Number(input)
        if (isNaN(requestData.timer)) {
          toastError("Invalid number! Please try again.")
          } else {
            isDisabled = true
            console.log(metric)
            if (metric === 's') {
              requestData.timer = requestData.timer * 1000
            } else if (metric === 'h') {
              requestData.timer = requestData.timer * 3600000
            } else if (metric === 'd') {
              requestData.timer = requestData.timer * 86400000
            } else if (metric === 'yr') {
              if (requestData.timer > 1000) {
                toastError("You can only store a link up to 1000 years. Please try again.")
              } else {
                  requestData.timer = requestData.timer * 31536000000
                }
              }
            await sendRequest(requestData)
            currentStage++
            }
        isDisabled = false
      }
  }

</script>


<div class="absolute inset-0 overflow-hidden flex flex-col gap-10 items-center justify-center">
  {#if UserInputProps == allStages[0]}
    <h1 out:fly={{x: 300}} class="h1 mb-56">Welcome to krt.im</h1>
  {/if}
  {#if currentStage === 3}
    <div in:fly={{delay: 400, x: -300}} out:fly={{x: 300}} class="w-full absolute">
      <Complete path={requestData.path} />
    </div>
  {/if}
  {#key UserInputProps}
    <div in:fly={{delay: 200, x:-300}} out:fly={{x: 300}} class="w-full absolute">
      <UserInput inputProps={UserInputProps} onSubmit={onSubmit} isDisabled={isDisabled}/>
    </div>
  {/key}
</div>
