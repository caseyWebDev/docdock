// Generated by CoffeeScript 1.2.1-pre

/*!
docdock main js
Casey Foster
caseyWebDev
caseywebdev.com
*/


(function() {
  var $,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if (typeof docdock === "undefined" || docdock === null) {
    $ = jQuery;
    window.docdock = (function(_super) {

      __extends(_Class, _super);

      function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
      }

      _Class.Ui = (function() {

        function _Class() {}

        _Class.xhr = {};

        _Class.load = function() {
          var _this = this;
          return $("#main").on("click", "#saveDoc", function() {
            var _base;
            if (typeof (_base = _this.xhr).abort === "function") _base.abort();
            docdock.PopUp.show("Saving doc...");
            return _this.xhr = $.post("/", {
              doc: $("#doc").val()
            }, function(data) {
              if (data.status === "doc empty") {
                docdock.PopUp.show("The doc is empty!", 1000);
                return $("#doc").val("").focus();
              } else {
                docdock.Poll.call();
                docdock.PopUp.show("Doc saved!");
                docdock.State.cache = [];
                return docdock.State.push("/" + data.status);
              }
            }, "json").error(function() {
              return docdock.PopUp.show("Save error! Try again...");
            });
          });
        };

        return _Class;

      })();

      _Class.Poll = (function() {

        function _Class() {}

        _Class.xhr = {};

        _Class.interval = 0;

        _Class.wait = 5;

        _Class.load = function() {
          var _this = this;
          if (!this.interval) {
            return this.interval = setInterval(function() {
              return _this.call();
            }, this.wait * 1000);
          }
        };

        _Class.call = function() {
          var _base,
            _this = this;
          if (typeof (_base = this.xhr).abort === "function") _base.abort();
          return this.xhr = $.getJSON("/docs/recent", null, function(data) {
            var doc, html, _i, _len;
            html = "";
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              doc = data[_i];
              html += "<a href=\"/" + doc.id + "\" data-push-state>" + ($.escapeHtml(doc.doc)) + "</a>";
            }
            return $("#recentDocs").html(html);
          }).error(function() {});
        };

        return _Class;

      })();

      _Class.State = (function(_super2) {

        __extends(_Class, _super2);

        function _Class() {
          return _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.load = function() {
          return this.updateCache(location.href, {
            title: document.title,
            html: $("#pushState").html()
          });
        };

        _Class.clear = function(url) {
          var _base;
          $.scrollTo();
          if (typeof (_base = docdock.Ui.xhr).abort === "function") _base.abort();
          return clearTimeout(this.loadingTimeout);
        };

        _Class.before = function(url) {
          return this.loadingTimeout = setTimeout(function() {
            return docdock.PopUp.show("Loading...");
          }, 200);
        };

        _Class.after = function(url) {
          clearTimeout(this.loadingTimeout);
          return docdock.PopUp.hide();
        };

        _Class.parse = function(url) {
          document.title = this.cache[url].title;
          return $("#pushState").html(this.cache[url].html);
        };

        return _Class;

      })(caseyWebDev.State);

      return _Class;

    }).call(this, caseyWebDev);
    docdock.init();
  }

}).call(this);
