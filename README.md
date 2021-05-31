# Foost
A simple Fetch API wrapper for the browser.
No polyfills, no fallbacks, nothing special, just the minimal code to make your requests a little cleaner and reusable.

## Install
```
npm install foost
```

## Examples

### Just a Fetch
```js
const foost = new Foost();

foost.get('https://example.com/things').then(res => {
  console.log('We got some things!');
});

// This body will be JSON stringified on the way out
foost.post('https://example.com/things', {
  name: 'Extra Thing',
  comment: 'Here, take this thing. I have too many.'
});

let form = document.getElementById('form');
let formData = new FormData(form);
// This body will remain a FormData
foost.post('https://example.com/files', formData);
```

### API Communication
```js
const api = new Foost({baseUrl: 'https://example.com'});

api.get('/things');

api.post('/things', {
  name: 'Extra Thing',
  comment: 'Here, take this thing. I have too many.'
});
```