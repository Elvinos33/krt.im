 export function isValidURL(url: string) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(url);
  }

  export async function doesPathExist(path: string) {
    const response = await fetch(`/?path=${path}`)

    if (response.status == 302) {
      return true;
    } else {
      return false;
    }
  }
  
  export async function onSubmit(input: string, currentStage: number) {
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
    } else if (currentStage === 2) {
    }
    console.log(input)
  }

