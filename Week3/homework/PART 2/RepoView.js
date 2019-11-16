'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */

    
    render(repo) {
      // TODO: replace this comment and the console.log with your own code

      const timeFormat = new Date(repo.updated_at);
      const repoContainer = document.querySelector('.repo-container');
      repoContainer.innerHTML = '';
      const infoList = createAndAppend('ul', repoContainer, {class: 'info-list'});
      createAndAppend('li', infoList, {text: `Repository: ${repo.name}`});
      createAndAppend('li', infoList, {text: `Description: ${repo.description}`});
      createAndAppend('li', infoList, {text: `Forks: ${repo.forks}`});
      createAndAppend('li', infoList, {text: `Updated: ${timeFormat.toLocaleString('en-US')}`});
      // console.log('RepoView', repo);
      // console.log('hellooooo');
    }
  }

  window.RepoView = RepoView;
}
