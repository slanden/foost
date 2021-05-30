import { shouldJsonify } from './util.js';

export class Foost {
  constructor({ headers = {}, baseUrl = '', options = {} } = {}) {
    this._headers = new Headers({
      'content-type': 'application/json',
      ...headers,
    });
    this.baseUrl = baseUrl;
    this._options = options;
  }

  get headers() {
    return this._headers;
  }

  async delete(url, options = {}) {
    return (await this.request(url, { ...options, method: 'delete' })).body;
  }

  async get(url, options = {}) {
    return (await this.request(url, options)).body;
  }

  async patch(url, body, options = {}) {
    return (await this.request(url, { ...options, method: 'patch', body }))
      .body;
  }

  async post(url, body, options = {}) {
    return (await this.request(url, { ...options, method: 'post', body })).body;
  }

  async put(url, body, options = {}) {
    return (await this.request(url, { ...options, method: 'put', body })).body;
  }

  async request(url, options = {}) {
    if (shouldJsonify(options.body)) {
      options.body = JSON.stringify(options.body);
    }

    return fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: this._headers,
      ...this._options,
      ...options,
    }).then(async (r) => {
      // return response-like object with the resolved body

      const res = {
        headers: r.headers,
        ok: r.ok,
        redirected: r.redirected,
        status: r.status,
        statusText: r.statusText,
      };

      const contentType = r.headers.get('content-type');
      res.body = await (contentType &&
      // TODO: what about other content types?
      contentType.includes('application/json')
        ? r.json()
        : r.text());

      if (!r.ok) throw res;
      return res;
    });
  }
}
