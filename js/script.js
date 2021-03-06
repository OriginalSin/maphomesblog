!function(a) {
    "use strict";
    var b = function() {
        this.$openBtn = a("#sidebar, #header").find("a[href*='#about']"),
        this.$closeBtn = a("#about-btn-close"),
        this.$blog = a("#blog"),
        this.$about = a("#about"),
        this.$aboutCard = a("#about-card")
    };
    b.prototype = {
        run: function() {
            var a = this;
            a.$openBtn.click(function(b) {
                b.preventDefault(),
                a.play()
            }),
            a.$closeBtn.click(function(b) {
                b.preventDefault(),
                a.playBack()
            })
        },
        play: function() {
            var a = this;
            a.$blog.fadeOut(),
            a.$about.fadeIn(),
            setTimeout(function() {
                a.dropAboutCard()
            }, 300)
        },
        playBack: function() {
            var a = this;
            a.liftAboutCard(),
            setTimeout(function() {
                a.$blog.fadeIn()
            }, 500),
            setTimeout(function() {
                a.$about.fadeOut()
            }, 500)
        },
        dropAboutCard: function() {
            var b = this
              , c = b.$aboutCard.innerHeight()
              , d = a(window).height() / 2 - c / 2 + c;
            c + 30 > a(window).height() && (d = c),
            b.$aboutCard.css("top", "0px").css("top", "-" + c + "px").show(500, function() {
                b.$aboutCard.animate({
                    top: "+=" + d + "px"
                })
            })
        },
        liftAboutCard: function() {
            var b = this
              , c = b.$aboutCard.innerHeight()
              , d = a(window).height() / 2 - c / 2 + c;
            c + 30 > a(window).height() && (d = c),
            b.$aboutCard.animate({
                top: "-=" + d + "px"
            }, 500, function() {
                b.$aboutCard.hide(),
                b.$aboutCard.removeAttr("style")
            })
        }
    },
    a(document).ready(function() {
        (new b).run()
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function(b) {
        this.$form = a(b).find("#filter-form"),
        this.$searchInput = a(b).find("input[name=date]"),
        this.$archiveResult = a(b).find(".archive-result"),
        this.$postsYear = a(b).find(".archive-year"),
        this.$postsMonth = a(b).find(".archive-month"),
        this.$postsDay = a(b).find(".archive-day"),
        this.postsYear = b + " .archive-year",
        this.postsMonth = b + " .archive-month",
        this.postsDay = b + " .archive-day",
        this.messages = {
            zero: this.$archiveResult.data("message-zero"),
            one: this.$archiveResult.data("message-one"),
            other: this.$archiveResult.data("message-other")
        }
    };
    b.prototype = {
        run: function() {
            var a = this;
            a.$searchInput.keyup(function() {
                a.filter(a.sliceDate(a.getSearch()))
            }),
            a.$form.submit(function(a) {
                a.preventDefault()
            })
        },
        getSearch: function() {
            return this.$searchInput.val().replace(/([\/|.|-])/g, "").toLowerCase()
        },
        sliceDate: function(a) {
            return [a.slice(0, 4), a.slice(4, 6), a.slice(6)]
        },
        filter: function(a) {
            var b;
            "" === a[0] ? (this.showAll(),
            this.showResult(-1)) : (b = this.countPosts(a),
            this.hideAll(),
            this.showResult(b),
            b > 0 && this.showPosts(a))
        },
        showResult: function(a) {
            -1 === a ? this.$archiveResult.html("").hide() : 0 === a ? this.$archiveResult.html(this.messages.zero).show() : 1 === a ? this.$archiveResult.html(this.messages.one).show() : this.$archiveResult.html(this.messages.other.replace(/\{n\}/, a)).show()
        },
        countPosts: function(b) {
            return a(this.postsDay + "[data-date^=" + b[0] + b[1] + b[2] + "]").length
        },
        showPosts: function(b) {
            a(this.postsYear + "[data-date^=" + b[0] + "]").show(),
            a(this.postsMonth + "[data-date^=" + b[0] + b[1] + "]").show(),
            a(this.postsDay + "[data-date^=" + b[0] + b[1] + b[2] + "]").show()
        },
        showAll: function() {
            this.$postsYear.show(),
            this.$postsMonth.show(),
            this.$postsDay.show()
        },
        hideAll: function() {
            this.$postsYear.hide(),
            this.$postsMonth.hide(),
            this.$postsDay.hide()
        }
    },
    a(document).ready(function() {
        if (a("#archives").length) {
            new b("#archives").run()
        }
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function(b) {
        this.$form = a(b).find("#filter-form"),
        this.$inputSearch = a(b).find("input[name=category]"),
        this.$archiveResult = a(b).find(".archive-result"),
        this.$posts = a(b).find(".archive"),
        this.$categories = a(b).find(".category-anchor"),
        this.posts = b + " .archive",
        this.categories = b + " .category-anchor",
        this.dataCategory = "category",
        this.dataParentCategories = "parent-categories",
        this.messages = {
            zero: this.$archiveResult.data("message-zero"),
            one: this.$archiveResult.data("message-one"),
            other: this.$archiveResult.data("message-other")
        }
    };
    b.prototype = {
        run: function() {
            var a = this;
            a.$inputSearch.keyup(function() {
                a.filter(a.getSearch())
            }),
            a.$form.submit(function(a) {
                a.preventDefault()
            })
        },
        getSearch: function() {
            return this.$inputSearch.val().toLowerCase()
        },
        filter: function(a) {
            "" === a ? (this.showAll(),
            this.showResult(-1)) : (this.hideAll(),
            this.showPosts(a),
            this.showResult(this.countCategories(a)))
        },
        showResult: function(a) {
            -1 === a ? this.$archiveResult.html("").hide() : 0 === a ? this.$archiveResult.html(this.messages.zero).show() : 1 === a ? this.$archiveResult.html(this.messages.one).show() : this.$archiveResult.html(this.messages.other.replace(/\{n\}/, a)).show()
        },
        countCategories: function(b) {
            return a(this.posts + "[data-" + this.dataCategory + "*='" + b + "']").length
        },
        showPosts: function(b) {
            var c, d = this, e = d.categories + "[data-" + d.dataCategory + "*='" + b + "']", f = d.posts + "[data-" + d.dataCategory + "*='" + b + "']";
            d.countCategories(b) > 0 && a(e + "[data-" + d.dataParentCategories + "]").length && a(e).each(function() {
                c = a(this).attr("data-" + d.dataParentCategories).split(","),
                c.forEach(function(b) {
                    var c = "[data-" + d.dataCategory + "='" + b + "']";
                    a(d.categories + c).show(),
                    a(d.posts + c).show(),
                    a(d.posts + c + " > .archive-posts > .archive-post").hide()
                })
            }),
            a(e).show(),
            a(f).show(),
            a(f + " > .archive-posts > .archive-post").show()
        },
        showAll: function() {
            this.$categories.show(),
            this.$posts.show(),
            a(this.posts + " > .archive-posts > .archive-post").show()
        },
        hideAll: function() {
            this.$categories.hide(),
            this.$posts.hide()
        }
    },
    a(document).ready(function() {
        if (a("#categories-archives").length) {
            new b("#categories-archives").run()
        }
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function(b) {
        this.$codeBlocks = a(b)
    };
    b.prototype = {
        run: function() {
            var b = this;
            b.resize(),
            a(window).smartresize(function() {
                b.resize()
            })
        },
        resize: function() {
            this.$codeBlocks.each(function() {
                var b = a(this).find(".gutter")
                  , c = a(this).find(".code")
                  , d = c.width() - c.innerWidth()
                  , e = a(this).outerWidth() - b.outerWidth() + d;
                c.css("width", e),
                c.children("pre").css("width", e)
            })
        }
    },
    a(document).ready(function() {
        a.fn.hasHorizontalScrollBar = function() {
            return this.get(0).scrollWidth > this.innerWidth()
        }
        ,
        new b("figure.highlight").run()
    })
}(jQuery),
function(a) {
    "use strict";
    a(document).ready(function() {
        function b() {
            var b = !0
              , c = null;
            a(window).height() > 480 && (b = !1,
            c = {
                width: 70,
                height: 70
            }),
            a(".fancybox").fancybox({
                maxWidth: 900,
                maxHeight: 800,
                fitToView: !0,
                width: "50%",
                height: "50%",
                autoSize: !0,
                arrows: b,
                closeClick: !1,
                openEffect: "elastic",
                closeEffect: "elastic",
                prevEffect: "none",
                nextEffect: "none",
                padding: "0",
                helpers: {
                    thumbs: c,
                    overlay: {
                        css: {
                            overflow: "hidden",
                            background: "rgba(0, 0, 0, 0.85)"
                        }
                    }
                },
                afterLoad: function() {
                    setTimeout(function() {
                        a(".fancybox-next > span, .fancybox-prev > span").css("visibility", "visible")
                    }, 400)
                }
            })
        }
        b(),
        a(window).smartresize(function() {
            b()
        })
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function() {
        this.$header = a("#header"),
        this.headerHeight = this.$header.height(),
        this.headerUpCSSClass = "header-up",
        this.delta = 5,
        this.lastScrollTop = 0
    };
    b.prototype = {
        run: function() {
            var b, c = this;
            a(window).scroll(function() {
                b = !0
            }),
            setInterval(function() {
                b && (c.animate(),
                b = !1)
            }, 250)
        },
        animate: function() {
            var b = a(window).scrollTop();
            Math.abs(this.lastScrollTop - b) <= this.delta || (b > this.lastScrollTop && b > this.headerHeight ? this.$header.addClass(this.headerUpCSSClass) : b + a(window).height() < a(document).height() && this.$header.removeClass(this.headerUpCSSClass),
            this.lastScrollTop = b)
        }
    },
    a(document).ready(function() {
        (new b).run()
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function() {
        this.photosBox = ".photo-box",
        this.$images = a(this.photosBox + " img")
    };
    b.prototype = {
        run: function() {
            var b = this;
            b.resizeImages(),
            a(window).smartresize(function() {
                b.resizeImages()
            })
        },
        resizeImages: function() {
            var b, c, d, e, f, g;
            this.$images.each(function() {
                g = a(this),
                b = g.parent().parent().width(),
                c = g.parent().parent().innerHeight(),
                d = g.width(),
                e = g.height(),
                e < c && (f = d / e,
                g.css({
                    height: c,
                    width: c * f
                }),
                g.parent().css({
                    left: "-" + (c * f / 2 - b / 2) + "px"
                })),
                d = g.width(),
                e = g.height(),
                d < b && (f = e / d,
                g.css({
                    width: b,
                    height: b * f
                }),
                g.parent().css({
                    top: "-" + (e / 2 - c / 2) + "px"
                })),
                e > c && g.parent().css({
                    top: "-" + (e / 2 - c / 2) + "px"
                })
            })
        }
    },
    a(document).ready(function() {
        if (a(".image-gallery").length) {
            var c = new b;
            setTimeout(function() {
                c.run()
            }, 500)
        }
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function() {
        this.$postBottomBar = a(".post-bottom-bar"),
        this.$postFooter = a(".post-actions-wrap"),
        this.$header = a("#header"),
        this.delta = 1,
        this.lastScrollTop = 0
    };
    b.prototype = {
        run: function() {
            var b, c = this;
            c.swipePostBottomBar(),
            a(window).scroll(function() {
                b = !0
            }),
            setInterval(function() {
                b && (c.swipePostBottomBar(),
                b = !1)
            }, 250)
        },
        swipePostBottomBar: function() {
            var b = a(window).scrollTop()
              , c = this.$postFooter.offset().top;
            this.lastScrollTop > b && (c + this.$postFooter.height() > b + a(window).height() || c < b + this.$header.height()) ? this.$postBottomBar.slideDown() : this.$postBottomBar.slideUp(),
            this.lastScrollTop = b
        }
    },
    a(document).ready(function() {
        if (a(".post-bottom-bar").length) {
            (new b).run()
        }
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function() {
        this.$openButton = a(".open-algolia-search"),
        this.$searchModal = a("#algolia-search-modal"),
        this.$closeButton = this.$searchModal.find(".close-button"),
        this.$searchForm = a("#algolia-search-form"),
        this.$searchInput = a("#algolia-search-input"),
        this.$results = this.$searchModal.find(".results"),
        this.$noResults = this.$searchModal.find(".no-result"),
        this.$resultsCount = this.$searchModal.find(".results-count"),
        this.algolia = algoliaIndex
    };
    b.prototype = {
        run: function() {
            var b = this;
            b.$openButton.click(function() {
                b.open()
            }),
            a(document).keyup(function(a) {
                var c = a.target || a.srcElement
                  , d = c.tagName.toUpperCase();
                "INPUT" !== d && "TEXTAREA" !== d && (83 !== a.keyCode || b.$searchModal.is(":visible") || b.open())
            }),
            b.$searchModal.click(function(a) {
                a.target === this && b.close()
            }),
            b.$closeButton.click(function() {
                b.close()
            }),
            a(document).keyup(function(a) {
                27 === a.keyCode && b.$searchModal.is(":visible") && b.close()
            }),
            b.$searchForm.submit(function(a) {
                a.preventDefault(),
                b.search(b.$searchInput.val())
            })
        },
        open: function() {
            this.showSearchModal(),
            this.showOverlay(),
            this.$searchInput.focus()
        },
        close: function() {
            this.hideSearchModal(),
            this.hideOverlay(),
            this.$searchInput.blur()
        },
        search: function(a) {
            var b = this;
            this.algolia.search(a, function(a, c) {
                a || (b.showResults(c.hits),
                b.showResultsCount(c.nbHits))
            })
        },
        showResults: function(a) {
            var b = "";
            a.forEach(function(a) {
                var c = window.navigator.userLanguage || window.navigator.language || a.lang;
                b += '<div class="media">',
                a.thumbnailImageUrl && (b += '<div class="media-left">',
                b += '<a class="link-unstyled" href="' + (a.link || a.permalink) + '">',
                b += '<img class="media-image" src="' + a.thumbnailImageUrl + '" width="90" height="90"/>',
                b += "</a>",
                b += "</div>"),
                b += '<div class="media-body">',
                b += '<a class="link-unstyled" href="' + (a.link || a.permalink) + '">',
                b += '<h3 class="media-heading">' + a.title + "</h3>",
                b += "</a>",
                b += '<span class="media-meta">',
                b += '<span class="media-date text-small">',
                b += moment(a.date).locale(c).format("ll"),
                b += "</span>",
                b += "</span>",
                b += '<div class="media-content hide-xs font-merryweather">' + a.excerpt + "</div>",
                b += "</div>",
                b += '<div style="clear:both;"></div>',
                b += "<hr>",
                b += "</div>"
            }),
            this.$results.html(b)
        },
        showSearchModal: function() {
            this.$searchModal.fadeIn()
        },
        hideSearchModal: function() {
            this.$searchModal.fadeOut()
        },
        showResultsCount: function(a) {
            var b = "";
            a < 1 ? (b = this.$resultsCount.data("message-zero"),
            this.$noResults.show()) : 1 === a ? (b = this.$resultsCount.data("message-one"),
            this.$noResults.hide()) : a > 1 && (b = this.$resultsCount.data("message-other").replace(/\{n\}/, a),
            this.$noResults.hide()),
            this.$resultsCount.html(b)
        },
        showOverlay: function() {
            a("body").append('<div class="overlay"></div>'),
            a(".overlay").fadeIn(),
            a("body").css("overflow", "hidden")
        },
        hideOverlay: function() {
            a(".overlay").fadeOut(function() {
                a(this).remove(),
                a("body").css("overflow", "auto")
            })
        }
    },
    a(document).ready(function() {
        if ("undefined" != typeof algoliaIndex) {
            (new b).run()
        }
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function() {
        this.$shareOptionsBar = a("#share-options-bar"),
        this.$openBtn = a(".btn-open-shareoptions"),
        this.$closeBtn = a("#btn-close-shareoptions"),
        this.$body = a("body")
    };
    b.prototype = {
        run: function() {
            var a = this;
            a.$openBtn.click(function() {
                a.$shareOptionsBar.hasClass("opened") || (a.openShareOptions(),
                a.$closeBtn.show())
            }),
            a.$closeBtn.click(function() {
                a.$shareOptionsBar.hasClass("opened") && (a.closeShareOptions(),
                a.$closeBtn.hide())
            })
        },
        openShareOptions: function() {
            var a = this;
            a.$shareOptionsBar.hasClass("opened") || this.$shareOptionsBar.hasClass("processing") || (a.$shareOptionsBar.addClass("processing opened"),
            a.$body.css("overflow", "hidden"),
            setTimeout(function() {
                a.$shareOptionsBar.removeClass("processing")
            }, 250))
        },
        closeShareOptions: function() {
            var a = this;
            a.$shareOptionsBar.hasClass("opened") && !this.$shareOptionsBar.hasClass("processing") && (a.$shareOptionsBar.addClass("processing").removeClass("opened"),
            setTimeout(function() {
                a.$shareOptionsBar.removeClass("processing"),
                a.$body.css("overflow", "")
            }, 250))
        }
    },
    a(document).ready(function() {
        (new b).run()
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function() {
        this.$sidebar = a("#sidebar"),
        this.$openBtn = a("#btn-open-sidebar"),
        this.$closeBtn = a("#header, #main, .post-header-cover"),
        this.$blog = a(".post-bottom-bar, #header, #main, .post-header-cover"),
        this.$body = a("body"),
        this.mediumScreenWidth = 768
    };
    b.prototype = {
        run: function() {
            var b = this;
            this.$openBtn.click(function() {
                b.$sidebar.hasClass("pushed") || b.openSidebar()
            }),
            this.$closeBtn.click(function() {
                b.$sidebar.hasClass("pushed") && b.closeSidebar()
            }),
            a(window).resize(function() {
                a(window).width() > b.mediumScreenWidth ? (b.resetSidebarPosition(),
                b.resetBlogPosition()) : b.closeSidebar()
            })
        },
        openSidebar: function() {
            this.swipeBlogToRight(),
            this.swipeSidebarToRight()
        },
        closeSidebar: function() {
            this.swipeSidebarToLeft(),
            this.swipeBlogToLeft()
        },
        resetSidebarPosition: function() {
            this.$sidebar.removeClass("pushed")
        },
        resetBlogPosition: function() {
            this.$blog.removeClass("pushed")
        },
        swipeSidebarToRight: function() {
            var a = this;
            this.$sidebar.hasClass("pushed") || this.$sidebar.hasClass("processing") || (this.$sidebar.addClass("processing pushed"),
            this.$body.css("overflow-x", "hidden"),
            setTimeout(function() {
                a.$sidebar.removeClass("processing")
            }, 250))
        },
        swipeSidebarToLeft: function() {
            this.$sidebar.hasClass("pushed") && !this.$sidebar.hasClass("processing") && (this.$sidebar.addClass("processing").removeClass("pushed processing"),
            this.$body.css("overflow-x", "auto"))
        },
        swipeBlogToRight: function() {
            var a = this;
            this.$blog.hasClass("pushed") || this.$blog.hasClass("processing") || (this.$blog.addClass("processing pushed"),
            setTimeout(function() {
                a.$blog.removeClass("processing")
            }, 250))
        },
        swipeBlogToLeft: function() {
            var a = this;
            a.$blog.hasClass("pushed") && !this.$blog.hasClass("processing") && (a.$blog.addClass("processing").removeClass("pushed"),
            setTimeout(function() {
                a.$blog.removeClass("processing")
            }, 250))
        }
    },
    a(document).ready(function() {
        (new b).run()
    })
}(jQuery),
function(a, b) {
    var c = function(a, b, c) {
        var d;
        return function() {
            function e() {
                c || a.apply(f, g),
                d = null
            }
            var f = this
              , g = arguments;
            d ? clearTimeout(d) : c && a.apply(f, g),
            d = setTimeout(e, b || 100)
        }
    };
    jQuery.fn[b] = function(a) {
        return a ? this.bind("resize", c(a)) : this.trigger(b)
    }
}(jQuery, "smartresize"),
function(a) {
    "use strict";
    var b = function(b) {
        this.$tabbedCodeBlocs = a(b)
    };
    b.prototype = {
        run: function() {
            this.$tabbedCodeBlocs.find(".tab").click(function() {
                var b = a(this).parent().parent().parent()
                  , c = b.find(".tabs-content").children("pre, .highlight");
                a(this).siblings().removeClass("active"),
                a(this).addClass("active"),
                c.hide(),
                c.eq(a(this).index()).show()
            })
        }
    },
    a(document).ready(function() {
        new b(".codeblock--tabbed").run()
    })
}(jQuery),
function(a) {
    "use strict";
    var b = function(b) {
        this.$form = a(b).find("#filter-form"),
        this.$inputSearch = a(b + " #filter-form input[name=tag]"),
        this.$archiveResult = a(b).find(".archive-result"),
        this.$tags = a(b).find(".tag"),
        this.$posts = a(b).find(".archive"),
        this.tags = b + " .tag",
        this.posts = b + " .archive",
        this.dataTag = "tag",
        this.messages = {
            zero: this.$archiveResult.data("message-zero"),
            one: this.$archiveResult.data("message-one"),
            other: this.$archiveResult.data("message-other")
        }
    };
    b.prototype = {
        run: function() {
            var a = this;
            a.$inputSearch.keyup(function() {
                a.filter(a.getSearch())
            }),
            a.$form.submit(function(a) {
                a.preventDefault()
            })
        },
        getSearch: function() {
            return this.$inputSearch.val().toLowerCase()
        },
        filter: function(a) {
            "" === a ? (this.showAll(),
            this.showResult(-1)) : (this.hideAll(),
            this.showPosts(a),
            this.showResult(this.countTags(a)))
        },
        showResult: function(a) {
            -1 === a ? this.$archiveResult.html("").hide() : 0 === a ? this.$archiveResult.html(this.messages.zero).show() : 1 === a ? this.$archiveResult.html(this.messages.one).show() : this.$archiveResult.html(this.messages.other.replace(/\{n\}/, a)).show()
        },
        countTags: function(b) {
            return a(this.posts + "[data-" + this.dataTag + "*='" + b + "']").length
        },
        showPosts: function(b) {
            a(this.tags + "[data-" + this.dataTag + "*='" + b + "']").show(),
            a(this.posts + "[data-" + this.dataTag + "*='" + b + "']").show()
        },
        showAll: function() {
            this.$tags.show(),
            this.$posts.show()
        },
        hideAll: function() {
            this.$tags.hide(),
            this.$posts.hide()
        }
    },
    a(document).ready(function() {
        if (a("#tags-archives").length) {
            new b("#tags-archives").run()
        }
    })
}(jQuery);

!function(glob) {
    "use strict";
    var templates = {
		header: '<i id="btn-open-sidebar" class="fa fa-lg fa-bars"></i><div class="header-title"><a class="header-title-link" href="/">Карты на основе Leaflet</a></div><a class="header-right-picture " href="/#about"><img class="header-picture" src="//www.gravatar.com/avatar/d09dc2d7aa5c467519e8af89f7b3d94c?s=90" alt="Author&#39;s picture" /></a>',
		sidebar: '<div class="sidebar-container"><div class="sidebar-profile"><a href="/#about"><img class="sidebar-profile-picture" src="/img/serg.jpg" alt="Author&#39;s picture" /></a><h4 class="sidebar-profile-name">Serg Alekseev</h4><h5 class="sidebar-profile-bio">Использование карт на основе <strong>Leaflet</strong></h5></div><ul class="sidebar-buttons"><li class="sidebar-button"><a class="sidebar-button-link " href="/"><i class="sidebar-button-icon fa fa-lg fa-home"></i><span class="sidebar-button-desc">Home</span></a></li><li class="sidebar-button"><a class="sidebar-button-link " href="/categories/payme.html"><i class="sidebar-button-icon fa fa-lg fa-cc-visa"></i><span class="sidebar-button-desc">Pay Me</span></a></li><li class="sidebar-button"><a class="sidebar-button-link " href="/categories"><i class="sidebar-button-icon fa fa-lg fa-bookmark"></i><span class="sidebar-button-desc">Categories</span></a></li><li class="sidebar-button"><a class="sidebar-button-link " href="/tags"><i class="sidebar-button-icon fa fa-lg fa-tags"></i><span class="sidebar-button-desc">Tags</span></a></li><li class="sidebar-button"><a class="sidebar-button-link " href="/archives"><i class="sidebar-button-icon fa fa-lg fa-archive"></i><span class="sidebar-button-desc">Archives</span></a></li><li class="sidebar-button"><a class="sidebar-button-link " href="/#about"><i class="sidebar-button-icon fa fa-lg fa-question"></i><span class="sidebar-button-desc">About</span></a></li></ul><ul class="sidebar-buttons"><li class="sidebar-button"><a class="sidebar-button-link " href="https://github.com/OriginalSin" target="_blank" rel="noopener"><i class="sidebar-button-icon fa fa-lg fa-github"></i><span class="sidebar-button-desc">GitHub</span></a></li><li class="sidebar-button"><a class="sidebar-button-link " href="https://stackexchange.com/users/12628109/serg-alekseev" target="_blank" rel="noopener"><i class="sidebar-button-icon fa fa-lg fa-stack-overflow"></i><span class="sidebar-button-desc">Stack Overflow</span></a></li></ul><ul class="sidebar-buttons"><li class="sidebar-button"><a class="sidebar-button-link " href="./index.xml"><i class="sidebar-button-icon fa fa-lg fa-rss"></i><span class="sidebar-button-desc">RSS</span></a></li></ul></div>',
		about: '<div id="about-card"><div id="about-btn-close"><i class="fa fa-remove"></i></div><img id="about-card-picture" src="/img/serg.jpg" alt="Author&#39;s picture" /><h4 id="about-card-name">Serg Alekseev</h4><div id="about-card-bio">Vanilla es6 javascript <strong>COOL</strong></div><div id="about-card-job"><i class="fa fa-briefcase"></i><br/>Scanex</div><div id="about-card-location"><i class="fa fa-map-marker"></i><br/>Russia</div></div>',
		footer: '<span class="copyrights">&copy; 2018 Alex Brothers. All Rights Reserved</span>',
		'share-options-bar': '<i id="btn-close-shareoptions" class="fa fa-close"></i><ul class="share-options"><li class="share-option"><a class="share-option-btn" target="new" href="https://www.facebook.com/sharer/sharer.php?u={href}"><i class="fa fa-facebook-official"></i><span>Share on Facebook</span></a></li><li class="share-option"><a class="share-option-btn" target="new" href="https://twitter.com/intent/tweet?text={href}"><i class="fa fa-twitter"></i><span>Share on Twitter</span></a></li><li class="share-option"><a class="share-option-btn" target="new" href="https://plus.google.com/share?url={href}"><i class="fa fa-google-plus"></i><span>Share on Google&#43;</span></a></li></ul>',
		'bottom-bar': '<div class="post-actions-wrap"><nav ><ul class="post-actions post-action-nav"><li class="post-action"><a class="post-action-btn btn btn--default tooltip--top" href="{nextUrl}" data-tooltip="{nextTitle}"><i class="fa fa-angle-left"></i><span class="hide-xs hide-sm text-small icon-ml">NEXT</span></a></li><li class="post-action"><a class="post-action-btn btn btn--default tooltip--top" href="{prevUrl}" data-tooltip="{prevTitle}"><span class="hide-xs hide-sm text-small icon-mr">PREVIOUS</span><i class="fa fa-angle-right"></i></a></li></ul></nav><ul class="post-actions post-action-share" ><li class="post-action hide-lg hide-md hide-sm"><a class="post-action-btn btn btn--default btn-open-shareoptions" href="#btn-open-shareoptions"><i class="fa fa-share-alt"></i></a></li><li class="post-action hide-xs"><a class="post-action-btn btn btn--default" target="new" href="https://www.facebook.com/sharer/sharer.php?u={href}"><i class="fa fa-facebook-official"></i></a></li><li class="post-action hide-xs"><a class="post-action-btn btn btn--default" target="new" href="https://twitter.com/intent/tweet?text={href}"><i class="fa fa-twitter"></i></a></li><li class="post-action hide-xs"><a class="post-action-btn btn btn--default" target="new" href="https://plus.google.com/share?url={href}"><i class="fa fa-google-plus"></i></a></li><li class="post-action"><a class="post-action-btn btn btn--default" href="#disqus_thread"><i class="fa fa-comment-o"></i></a></li><li class="post-action"><a class="post-action-btn btn btn--default" href="#"><i class="fa fa-list"></i></a></li></ul></div>',
		'post-footer': '<div class="post-footer-tags"><span class="text-color-light text-small">TAGGED IN</span><br/><a class="tag tag--primary tag--small" href="./tags/map/">map</a><a class="tag tag--primary tag--small" href="./tags/leaflet/">leaflet</a><a class="tag tag--primary tag--small" href="./tags/leaflet/">rosreestr</a></div><div class="post-actions-wrap"><nav ><ul class="post-actions post-action-nav"><li class="post-action"><a class="post-action-btn btn btn--default tooltip--top" href="{nextUrl}" data-tooltip="{nextTitle}"><i class="fa fa-angle-left"></i><span class="hide-xs hide-sm text-small icon-ml">NEXT</span></a></li><li class="post-action"><a class="post-action-btn btn btn--default tooltip--top" href="{prevUrl}" data-tooltip="{prevTitle}"><span class="hide-xs hide-sm text-small icon-mr">PREVIOUS</span><i class="fa fa-angle-right"></i></a></li></ul></nav><ul class="post-actions post-action-share" ><li class="post-action hide-lg hide-md hide-sm"><a class="post-action-btn btn btn--default btn-open-shareoptions" href="#btn-open-shareoptions"><i class="fa fa-share-alt"></i></a></li><li class="post-action hide-xs"><a class="post-action-btn btn btn--default" target="new" href="https://www.facebook.com/sharer/sharer.php?u={href}"><i class="fa fa-facebook-official"></i></a></li><li class="post-action hide-xs"><a class="post-action-btn btn btn--default" target="new" href="https://twitter.com/intent/tweet?text={href}"><i class="fa fa-twitter"></i></a></li><li class="post-action hide-xs"><a class="post-action-btn btn btn--default" target="new" href="https://plus.google.com/share?url={href}"><i class="fa fa-google-plus"></i></a></li><li class="post-action"><a class="post-action-btn btn btn--default" href="#disqus_thread"><i class="fa fa-comment-o"></i></a></li><li class="post-action"><a class="post-action-btn btn btn--default" href="#"><i class="fa fa-list"></i></a></li></ul></div><div id="disqus_thread"></div>'
	};
    var hash = {
		href: location.origin + location.pathname
	};
	if (window.postParams) {
		for (var key in window.postParams) {
			hash[key] = window.postParams[key];
		}
	}
	for (var id in templates) {
		var cont = document.getElementById(id),
			str = templates[id];
		if (cont) {
			for (var key in hash) {
				var rg = new RegExp('{' + key + '}', 'g');
				str = str.replace(rg, hash[key]);
			}
			cont.innerHTML = str;
		}
	}
    var ab = function() {
        //this.$blog = a("#blog"),
    };
    ab.prototype = {
        run: function() {
            var a = this;
         }
	};
}(this);