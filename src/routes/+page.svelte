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
      selection: ["https://", "http://"],
      selectDefault: "https://",
      divArg: '',
    },
    {
      title: "What is the shortened name?",
      type: "url",
      placeholder: "Path...",
      icon: "mdi:arrow-right",
      selection: [],
      selectDefault: '',
      divArg: 'krt.im/'
    },
    {
      title: "How long would you like the link to last?",
      type: "url",
      placeholder: "Time...",
      icon: "icons8:finish-flag",
      selection: ["Seconds", "Minutes", "Hours", "Days", "Years"],
      selectDefault: "Days",
      divArg: ''
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


 async function onSubmit(input: string, selectArg: string) {
    if (currentStage === 0) {
      isDisabled = true
      if (isValidURL(input)) {
        if (!input.includes("https://")) {
          input = selectArg + input
        }
        currentStage++
        requestData.url = input
      } else {
        toastError("Invalid URL! Please try again.")
      }
      isDisabled = false

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
            
            // Probably the worst code i've ever written
            if (selectArg === 'Seconds') {
              requestData.timer = requestData.timer * 1000
              await sendRequest(requestData)
              currentStage++
            } else if (selectArg === 'Minutes') {
              requestData.timer = requestData.timer * 60000
              await sendRequest(requestData)
              currentStage++
            } else if (selectArg === 'Hours') {
              requestData.timer = requestData.timer * 3600000
              await sendRequest(requestData)
              currentStage++
            } else if (selectArg === 'Days') {
              requestData.timer = requestData.timer * 86400000
              await sendRequest(requestData)
              currentStage++
            } else if (selectArg === 'Years') {
              if (requestData.timer > 1000) {
                toastError("You can only store a link up to 1000 years. Please try again.")
              } else {
                  requestData.timer = requestData.timer * 31536000000
                  await sendRequest(requestData)
                  currentStage++
                }
            } else {
              await sendRequest(requestData)
              currentStage++
            } 
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
