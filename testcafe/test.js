import { Selector } from 'testcafe';

fixture `Github Search`
    .page `https://github.com`;

test('should github search work as expected', async t => {
    const searchInput = Selector('.js-site-search-focus');
    const searchList = Selector('.repo-list-item');
    const resultItem = Selector('.repo-list-item h3 a');
    const repoContent = Selector('.repository-content');

    await t.setTestSpeed(0.8);
    await t.expect(searchInput.exists).eql(true, 'should search input visible');
    await t.typeText(searchInput, 'testcafe');
    await t.pressKey('enter');

    await t.expect(searchList.count).eql(10, 'should show 10 results');
    await t.click(resultItem);

    await t.expect(repoContent.exists).eql(true, 'should repo detail visible');

    const location = await t.eval(() => window.location);
    await t.expect(location.pathname).eql('/DevExpress/testcafe', 'should testcafe repo found');
});
