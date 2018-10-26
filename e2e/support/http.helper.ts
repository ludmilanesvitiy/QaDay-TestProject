import { browser } from 'protractor';

export async function headersPost(EncodingParam?: string) {
  return {
    'Accept': 'application/json',
    'Origin': browser.baseUrl,
    'Content-Type': 'application/json',
    'x-requested-with': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
    'Referer': browser.baseUrl,
    'Accept-Encoding': EncodingParam ? EncodingParam : 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cookie': await this.getFreshBrowserCookies(),
   'Authorization': 'Bearer ' + 'token'
  };
}

export async function getFreshBrowserCookies() {
  return await browser.manage().getCookies().then((cookie) => {
    return cookie.map(data => {
      return `${data.name}=${data.value}`;
    }).join('; ')
  });
}
