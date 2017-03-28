casper.options.verbose = false
casper.options.logLevel = 'info'
casper.options.viewportSize =
  width: 1440
  height: 900

casper.test.begin 'find casperjs repo', (test) ->
  casper.start 'https://github.com', ->
    test.assertVisible '.js-site-search-form', 'search input is visible'
    @fill '.js-site-search-form', { q: 'casperjs' }, true
    return

  casper.then ->
    test.assertEval (->
      __utils__.findAll('.repo-list-item').length >= 10
    ), 'should show 10 results'
    return

  casper.then ->
    @click '.repo-list-item h3 a'
    return

  location = null
  casper.then ->
    test.assertVisible '.repository-content', 'repo detail is visible'
    location = @evaluate(->
      window.location
    )
    return

  casper.then ->
    test.assertEquals location.pathname, '/casperjs/casperjs', 'casperjs repo is found'
    return

  casper.run ->
    test.done()
    return

  return
