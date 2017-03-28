module.exports = {
    'Github Search': function (browser) {
        browser // 打开首页、填写搜索词、提交搜索表单
            .url('https://github.com')
            .assert.visible('.js-site-search-focus', 'should search input visible')
            .setValue('.js-site-search-focus', 'nightwatch')
            .submitForm('.js-site-search-form')
            .pause(1000);

        browser.execute(function () {   // 确认展示 10 条搜索结果
            return document.querySelectorAll('.repo-list-item').length;
        }, function (args) {
            browser.assert.equal(args.value, 11, 'should show 10 results');
        });

        browser.click('.repo-list-item h3 a').pause(1000);

        browser.assert.visible('.repository-content', 'should repo detail visible');

        browser.execute(function () {
            return window.location;
        }, function (args) {    // 确认打开了 nightwatch 官网
            browser.assert.equal(args.value.pathname, '/nightwatchjs/nightwatch', 'should nightwatch repo found');
        });

        browser.end();
    }
};
