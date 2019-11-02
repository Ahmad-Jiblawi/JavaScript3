'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, div) {
    const lastUpdate = new Date(repo.updated_at);
    const ul = createAndAppend('ul', div, {class: 'repo-list'});
    const li = createAndAppend('li', ul);
    createAndAppend('a', li, {text: `Repository: ${repo.name}`, href: repo.html_url});
    createAndAppend('li', ul, {text: `Description: ${repo.description}`});
    createAndAppend('li', ul, {text: `Forks: ${repo.forks}`});
    createAndAppend('li', ul, {text: `Updated: ${lastUpdate.toLocaleString('en-US')}`});
  }

  function main(url) {
    const header = createAndAppend('header', root);
    createAndAppend('h1', header, {text: 'HYF Repositories'});
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const div = createAndAppend('div', root, {class: 'repos-container'});
      repos.sort((currentRepo,nextRepo) => (currentRepo.name > nextRepo.name) ? 1 : ((nextRepo.name > currentRepo.name) ? -1 : 0));
      repos.forEach((repo, order) => {if(order < 10) renderRepoDetails(repo, div)});
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);

}
