Feature('Github Search');

Scenario('search codecept repo', (I) => {
    I.amOnPage('https://github.com');
    I.seeElement('.js-site-search-focus');
    I.fillField('.js-site-search-focus', 'codeceptjs');
    I.pressKey('Enter');

    I.seeElement('.repo-list-item');
    I.click('.repo-list-item h3 a');
    I.seeElement('.repository-content');
    I.seeInCurrentUrl('/Codeception/CodeceptJS');
});
