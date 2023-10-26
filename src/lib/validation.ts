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
  
  export async function sendRequest(requestData: object) {
    const response = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({requestData}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  }



