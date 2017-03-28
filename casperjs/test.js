casper.options.verbose = false;
casper.options.logLevel = 'info';
casper.options.viewportSize = { width: 1440, height: 900 };

casper.test.begin('Github Search', function suite(test) {
    casper.start('https://github.com', function () {    // 打开首页
        test.assertVisible('.js-site-search-form', 'should search input visible');
        this.fill('.js-site-search-form', { q: 'casperjs' }, true); // 键入搜索词、并提交
    });

    casper.then(function () {
        test.assertEval(function() {    // 确认搜索结果是 10
            return __utils__.findAll('.repo-list-item').length < 10;
        }, 'should show 10 results');
    });

    casper.then(function () {
        this.click('.repo-list-item h3 a'); // 点击第1条结果
    });

    var location = null;

    casper.then(function () {   // 这里是取环境变量
        test.assertVisible('.repository-content', 'should repo detail visible');
        location = this.evaluate(function () {
            return window.location;
        });
    });

    casper.then(function () {   // 确认目前跳转到了 casperjs 官方仓库
        test.assertEquals(location.pathname, '/casperjs/casperjs', 'should casperjs repo found');
    });

    casper.run(function () {
        test.done();
    });
});
