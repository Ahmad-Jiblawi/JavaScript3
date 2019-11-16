'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */    
    // const contrContainer = document.querySelector('.contributors-container whiteframe');
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      const contribContainer = document.querySelector('.contributors-container');
      contribContainer.innerHTML = '';
      contributors.forEach((item) => {
      const contList = createAndAppend('div', contribContainer, {class: 'contributer-list'});
      createAndAppend('img', contList, {src: `${item.avatar_url}`});
      createAndAppend('p', contList, {text: `${item.login} ${item.contributions}`});
      // console.log('ContributorsView', contributors);
      })
    }
  }

  window.ContributorsView = ContributorsView;
}
