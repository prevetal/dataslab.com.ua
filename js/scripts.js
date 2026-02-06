WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			lazy: true
		})
	}


	// Industries images slider
	const industriesImagesSliders = [],
		industriesImages = document.querySelectorAll('.industries .image .swiper')

	industriesImages.forEach((el, i) => {
		el.classList.add('industries_s' + i)

		let options = {
			loop: true,
			speed: 1000,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			allowTouchMove: false,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			}
		}

		industriesImagesSliders.push(new Swiper('.industries_s' + i, options))
	})


	// Cases slider
	const casesSliders = [],
		cases = document.querySelectorAll('.cases .swiper')

	cases.forEach((el, i) => {
		el.classList.add('cases_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		}

		casesSliders.push(new Swiper('.cases_s' + i, options))
	})


	// Tabs slider
	const tabsSliders = [],
		tabsSlider = document.querySelectorAll('.swiper.tabs')

	tabsSlider.forEach((el, i) => {
		el.classList.add('tabs_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			loopAdditionalSlides: 1,
			slidesPerView: 'auto',
			breakpoints: {
				0: {
					spaceBetween: 48
				},
				768: {
					spaceBetween: 60
				},
				1024: {
					spaceBetween: 80
				},
				1280: {
					spaceBetween: 120
				}
			}
		}

		tabsSliders.push(new Swiper('.tabs_s' + i, options))
	})


	// Mini popups
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when clicking outside of it
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Mob. menu
	$('.mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Why we - Logos
	whyWeLogos()

	$('.why_we .col .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.why_we .col .logos_wrap').toggleClass('full')
	})


	// Products
	initProductsSliders()


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Footer
	$('.contacts_info .item .head').click(function(e) {
		e.preventDefault()

		$(this)
			.toggleClass('active')
			.next('.info').slideToggle(300)
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Why we - Logos
		whyWeLogos()

		// Products
		initProductsSliders()


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})


// Why we - Logos
function whyWeLogos() {
	let logosWrapH = $('.why_we .col .logos_wrap').outerHeight(),
		logosH = $('.why_we .col .logos').outerHeight()

	logosWrapH < logosH
		? $('.why_we .col .spoler_btn').addClass('show')
		: $('.why_we .col .spoler_btn').removeClass('show')
}


// Products
productsSliders = []

function initProductsSliders() {
	if ($(window).width() < 768) {
		if ($('.products .grid').length) {
			$('.products .grid > *').addClass('swiper-slide')
			$('.products .grid').addClass('swiper-wrapper').removeClass('grid')

			$('.products .swiper').each(function (i) {
				$(this).addClass('products_s' + i)

				let options = {
					loop: false,
					loopAdditionalSlides: 1,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					slidesPerView: 'auto',
					spaceBetween: 16,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
						bulletActiveClass: 'active'
					},
					on: {
						init: swiper => setHeight(swiper.el.querySelectorAll('.product')),
						resize: swiper => {
							let items = swiper.el.querySelectorAll('.product')

							items.forEach(el => el.style.height = 'auto')

							setHeight(items)
						}
					}
				}

				productsSliders.push(new Swiper('.products_s' + i, options))
			})
		}
	} else {
		productsSliders.forEach(element => element.destroy(true, true))

		productsSliders = []

		$('.products .swiper-wrapper').addClass('grid').removeClass('swiper-wrapper')
		$('.products .grid > *').removeClass('swiper-slide')
	}
}