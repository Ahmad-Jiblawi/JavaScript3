'use strict';

{
  async function fetchJSON(url) {
    try {
      const result = await axios.get(url);
      if (result.status >= 200 && result.status <= 299) {
        return result.data;
      } else {
        throw new Error(`Network error : ${result.status} - ${result.statusText}`);
      }
    } catch (error) {
      throw new Error(error);
    }
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

    fetchJSON(url)
      .then((repos) => {

        reposList.addEventListener('change', createRepo);
        repos.sort((currentRepo, nextRepo) => currentRepo.name.localeCompare(nextRepo.name));
        repos.forEach((repo, index) => { renderRepoList(repo, index, reposList) });
        const ulRepo = createAndAppend('ul', reposContainer, { class: 'repo-list' });
        const ulCont = createAndAppend('ul', reposContributors, { class: 'cont-list' });

        function createRepo() {
          ulRepo.innerHTML = '';
          const lastUpdate = new Date(repos[reposList.value].updated_at);
          const liRepo = createAndAppend('li', ulRepo);
          createAndAppend('a', liRepo, { text: `Repository: ${repos[reposList.value].name}`, href: repos[reposList.value].html_url });
          createAndAppend('li', ulRepo, { text: `Description: ${repos[reposList.value].description}` });
          createAndAppend('li', ulRepo, { text: `Forks: ${repos[reposList.value].forks}` });
          createAndAppend('li', ulRepo, { text: `Updated: ${lastUpdate.toLocaleString('en-US')}` });
          createContributer();
        }

        createRepo();

        function createContributer() {
          fetchJSON(repos[reposList.value].contributors_url)
            .then((ContributerRepo) => {
              ulCont.innerHTML = '';
              ContributerRepo.forEach(repo => {
                const liCont = createAndAppend('li', ulCont);
                createAndAppend('img', liCont, { src: repo.avatar_url, class: 'cont-img' });
                createAndAppend('a', liCont, { text: repo.login, href: repo.html_url, target: '_blank' });
                createAndAppend('span', liCont, { text: repo.contributions });
              });

            })

        }
      })




  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);

}
