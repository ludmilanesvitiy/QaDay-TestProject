/**
 * This file contains all methods, which help to make api calls directly
 * All methods need to use in separate async functions
 * Other functions, which we need in pre-\post-conditions should be in separate .ts file
 */

import { browser } from 'protractor';

/**
 * This is a simple headers for post request, it could be changed, depend on request type
 */
export async function headersPost(EncodingParam?: string) {
  return {
    'Origin': browser.baseUrl,
    'Upgrade-Insecure-Requests': 1,
    'DNT': 1,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
    'Referer': 'https://github.com/ludmilanesvitiy/QaDay-TestProject/issues/new',
    'Accept-Encoding': EncodingParam ? EncodingParam : 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cookie': await this.getFreshBrowserCookies(),
  };
}

/**
 * This is an example of request payload for creating new github issue
 */
export function requestPayloadIssue(title: string, body: string) {
  const payload = {
    'authenticity_token': '', //TODO should be valid, if no - statusCode will be 422
    'issue[body]': body,
    'issue[title]': title,
    'line': '',
    'original-line': '',
    'path': '',
    'required_field_c8c3': '',
    'saved_reply_id': '',
    'timestamp': '1540801227323', //TODO need additional investigate what this date is about
    'timestamp_secret': 'f6729acb9f6de38ce7017990023fcaa0de45605fb2eec2246b20171b7dffde67', //TODO need additional investigate what this timestamp_secret is about
    'utf8': '✓' //TODO could be not necessary
  };
  return JSON.stringify(payload);
}

/**
 * This is an example of method, which take all browser cookies at current time
 */
export async function getFreshBrowserCookies() {
  return await browser.manage().getCookies().then((cookie) => {
    return cookie.map(data => {
      return `${data.name}=${data.value}`;
    }).join('; ');
  });
}
