'use strict';
const root = document.getElementById('root');

{
  function fetchJSON(url, cb) {
    fetch(url)
      .then(result => result.json().then(data => ({ status: result.status, body: data })))
      .then(obj => {
        cb(null, obj.body);
      })
      .catch(function(error) {
        cb(error);
      });
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

  function renderRepoList(repo, index, tag) {
    const option = createAndAppend('option', tag, { value: index, text: repo.name });
  }

  function main(url) {
    const header = createAndAppend('header', root, { class: 'repos-header' });
    const h1 = createAndAppend('h1', header, { text: 'HYF Repositories' });
    const reposList = createAndAppend('select', header, { class: 'repos-list' });
    const reposContainer = createAndAppend('section', root, { class: 'repo-container' });
    const reposContributors = createAndAppend('section', root, { class: 'contributors-container' });
    const contHeader = createAndAppend('h3', reposContributors, { text: 'Contributions' });

    fetchJSON(url, (err, repos) => {
      if (err) {
        createAndAppend('div', reposContainer, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }

      reposList.addEventListener('change', createRepo);
      repos.sort((currentRepo, nextRepo) => currentRepo.name > nextRepo.name ? 1 : nextRepo.name > currentRepo.name ? -1 : 0,);
      repos.forEach((repo, index) => {
        renderRepoList(repo, index, reposList);
      });
      const ulRepo = createAndAppend('ul', reposContainer, { class: 'repo-list'});
      const ulCont = createAndAppend('ul', reposContributors, { class: 'cont-list'});

      function createRepo() {
        ulRepo.innerHTML = ' ';
        const lastUpdate = new Date(repos[reposList.value].updated_at);
        const liRepo = createAndAppend('li', ulRepo);
        createAndAppend('a', liRepo, {text: `Repository: ${repos[reposList.value].name}`,href: repos[reposList.value].html_url,target: '_blank'});
        createAndAppend('li', ulRepo, {text: `Description: ${repos[reposList.value].description}`});
        createAndAppend('li', ulRepo, { text: `Forks: ${repos[reposList.value].forks}`});
        createAndAppend('li', ulRepo, { text: `Updated: ${lastUpdate.toLocaleString('en-US')}`});
        createCont();
      }

      createRepo();

      function createCont() {
        ulCont.innerHTML = ' ';
        fetchJSON(repos[reposList.value].contributors_url, (err, contRepo) => {
          if (err) {
            createAndAppend('div', reposContributors, {
              text: err.message,
              class: 'alert-error',
            });
            return;
          }
          contRepo.forEach(repo => {
            const liCont = createAndAppend('li', ulCont);
            createAndAppend('img', liCont, { src: repo.avatar_url, class: 'cont-img' });
            createAndAppend('a', liCont, { text: repo.login, href: repo.html_url, target: '_blank' });
            createAndAppend('span', liCont, { text: repo.contributions });
          });
        });
      }
    });
  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
  window.onload = () => main(HYF_REPOS_URL);
}