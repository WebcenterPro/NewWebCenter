'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Surfingbird (https://surfingbird.ru) provider.
 */

var Surfingbird = function () {
  function Surfingbird() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.href;
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.title;
    var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.querySelector('meta[name=description]');

    _classCallCheck(this, Surfingbird);

    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = description ? encodeURIComponent(description.content) : '';
  }

  _createClass(Surfingbird, [{
    key: 'shareWindow',
    value: function shareWindow() {
      var share_elements = document.querySelectorAll('[data-social=surfingbird]');
      var share_url = 'https://surfingbird.ru/share?url=' + this.url + '&title=' + this.title + '&description=' + this.description;

      [].concat(_toConsumableArray(share_elements)).forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
      });
    }
  }, {
    key: 'getCounter',
    value: function getCounter() {
      var script = document.createElement('script');
      var callback = ('goodshare_' + Math.random()).replace('.', '');
      var count_elements = document.querySelectorAll('[data-counter=surfingbird]');
      var count_url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="https://surfingbird.ru/button?url=' + this.url + '" and xpath="*"') + '&callback=' + callback;

      if (count_elements.length > 0) {
        window[callback] = function (counter) {
          [].concat(_toConsumableArray(count_elements)).forEach(function (item) {
            item.innerHTML = counter.results.length > 0 ? counter.results[0].match(/span class="stats-num">(\d+)</)[1] / 1 : 0;
          });

          script.parentNode.removeChild(script);
        };

        script.src = count_url;
        document.body.appendChild(script);
      }
    }
  }]);

  return Surfingbird;
}();

var surfingbird_share = exports.surfingbird_share = new Surfingbird().shareWindow();
var surfingbird_counter = exports.surfingbird_counter = new Surfingbird().getCounter();