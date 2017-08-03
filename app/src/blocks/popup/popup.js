/* Модалка */
(function() {
	var
		$links = $('.js-btn_pop'),
		$body = $('body'),
		bodyNoScrollClass = 'noscroll',
		popupVisClass = 'popup_visible',
		wrapVisClass = 'popup__wrap_visible',
		delay = 150;

	if (!$links.length) return;

	$links.each(function() {
		var id = $(this).attr('data-target');

		if (!$(id).length) return;

		// Клик по кнопке, открывающей модалку
		$(this).on('click', function() {
			popup('open', id);
			return false;
		});
		// =====

		// Клик по кнопке "закрыть"
		$(id).find('.popup__close').on('click', function() {
			popup('close', id);
		});
		// =====

		// Клик по серому фону
		$(id).on('click', function(event) {
			if (!$(event.target).hasClass('popup')) return;
			popup('close', id);
		});
		// =====
	});

	// Фикс скролла у body при ресайзе
	$(window).on('resize', function() {
		var isVisible = false;

		$('.popup').each(function() {
			if ($(this).is(':hidden')) return;
			isVisible = true;
		});

		if (isVisible) {
			$body.removeClass(bodyNoScrollClass);

			if (hasScroll('Height')) {
				$body.addClass(bodyNoScrollClass);
			}
		}
	});
	// =====

	// Закрытие модалки при нажатии ESC
	var closeOnEsc = function(event) {
		if (event.keyCode != 27) return;

		$links.each(function() {
			var id = $(this).attr('data-target');
			popup('close', id);
		});
	};
	// =====

	function popup(action, id) {
		var
			$popup = $(id),
			$wrap = $popup.find('.popup__wrap'),
			$inputs = $popup.find('input:not([type="hidden"]):not([type="submit"]), textarea');

		if (action == 'open') {
			$popup.addClass(popupVisClass);

			if (hasScroll('Height')) {
				$body.addClass(bodyNoScrollClass);
			}
			$body.append('<div class="popup__fog"></div>');

			$('.popup__fog').fadeIn(delay * 2);

			$(document).on('keydown', closeOnEsc);

			setTimeout(function() {
				$wrap.addClass(wrapVisClass);
			}, 0);

			setTimeout(function() {
				$inputs.first().focus();
			}, delay * 2);
		}

		if (action == 'close') {
			$(document).off('keydown', closeOnEsc);

			$inputs.val('');
			$wrap.removeClass(wrapVisClass);
			$('.popup__fog').fadeOut(delay);

			setTimeout(function() {
				$popup.removeClass(popupVisClass);
				$body.removeClass(bodyNoScrollClass);
				$('.popup__fog').remove();
			}, delay);
		}
	}

	function hasScroll(a) { // Проверка наличия скролла на странице
		var d = document,
			b = d.body,
			e = d.documentElement,
			c = "client" + a;
		a = "scroll" + a;
		return /CSS/.test(d.compatMode)? (e[c]< e[a]) : (b[c]< b[a])
	}
}());
/* ========== */
