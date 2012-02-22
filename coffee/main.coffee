###!
docdock main js
Casey Foster
caseyWebDev
caseywebdev.com
###
unless docdock?
	$ = jQuery
	window.docdock = class extends caseyWebDev
		@Ui: class
			@xhr: {}
			@load: ->
				$("#main").on "click", "#saveDoc", =>
					@xhr.abort?()
					docdock.PopUp.show "Saving doc..."
					@xhr = $.post "/"
						doc: $("#doc").val()
					, (data) ->
							if data.status is "doc empty"
								docdock.PopUp.show "The doc is empty!", 1000
								$("#doc").val("").focus()
							else
								docdock.PopUp.show "Doc saved!"
								docdock.State.cache = []
								docdock.State.push "/"+data.status
					, "json"
		@State: class extends caseyWebDev.State
			@load: ->
				@updateCache location.href,
					title: document.title
					html: $("#main").html()
			@clear = (url) ->
				$.scrollTo()
				docdock.Ui.xhr.abort?()
				clearTimeout @loadingTimeout
			@before = (url) ->
				@loadingTimeout = setTimeout ->
					docdock.PopUp.show "Loading..."
				, 200
			@after = (url) ->
				clearTimeout @loadingTimeout
				docdock.PopUp.hide()
			@parse = (url) ->
				document.title = @cache[url].title
				$("#main").html @cache[url].html
	docdock.init()