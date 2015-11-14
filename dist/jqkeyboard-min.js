/* jqKeyboard | v0.1.0 | https://github.com/hAWKdv/jqKeyboard#readme | MIT | b1 */
var jqKeyboard=function(t){"use strict";var e=10,a="normal",n="shift-b",i="special",s="jqk-btn",o="jqk-lang-btn",c="selected",r="jqk-hide",d="jq-keyboard",l="jqk-lang-cont",u="-lang",h=0,f=3,v={},p={},g={},b={};return g={insertCharacter:function(t,e,a){return t.slice(0,e.start)+a+t.slice(e.end)},backspaceStrManipulation:function(t,e,a){return 0===e.start&&0===e.end?t:t.slice(0,e.start-a)+t.slice(e.end)},setCaretPosition:function(t,e){var a;null!==t&&(t.createTextRange?(a=t.createTextRange(),a.move("character",e),a.select()):t.selectionStart?(t.focus(),t.setSelectionRange(e,e)):t.focus())}},v={createBase:function(){var e,a,n;this.$base=t("<div>").attr("id",d),this.$langCont=t("<div>").attr("id",l),this.$base.append(this.$langCont),this.createLayout(),t("body").append(this.$base),b.options&&b.options.containment?(e=t(b.options.containment),v.setBaseDefaultPos(e.width(),e.height())):(a=t(window).outerWidth()-this.$base.outerWidth(),n=t(window).outerHeight()-this.$base.outerHeight(),e=[h,h,a,n],this.maintainContainment()),this.$base.draggable({containment:e,cursor:"move"})},maintainContainment:function(){var e;t(window).resize(function(){clearTimeout(e),e=setTimeout(function(){var e=t(window).outerWidth()-v.$base.outerWidth(),a=t(window).outerHeight()-v.$base.outerHeight(),n=[h,h,e,a];v.$base.draggable("option","containment",n)},100)})},setBaseDefaultPos:function(t,a){this.$base.css({top:t-this.$base.outerWidth()-e,left:a-this.$base.outerHeight()-e})},createLayout:function(){var t,e,a,n=jqKeyboard.layouts.length;for(a=0;n>a&&f>a;a+=1)e=jqKeyboard.layouts[a],t=this.createButtons(e,a),this.createLangSwitchBtn(e.lang,a),this.$base.append(t)},createButtons:function(e,a){var n,i,s,o,c,d=t("<div>").addClass(e.lang+u);for(a>0&&d.addClass(r),o=0;o<e.layout.length;o+=1){for(n=t("<div>"),s=e.layout[o].split(" "),c=0;c<s.length;c+=1)i=this.buildButtonFromString(s[c]),n.append(i);d.append(n)}return d},buildButtonFromString:function(e){var i=t("<button>").addClass(s);return 1===e.length?i.addClass(a).data("val",e).html(e):3===e.length?i.addClass(n).data("val",e[0]).data("shift",e[2]).html(e[0]):-1!==e.indexOf("<<")&&-1!==e.indexOf(">>")&&(i=this.createSpecialBtn(i,e)),i},createLangSwitchBtn:function(e,a){var n=t("<button>").addClass(o).data("lang",e).html(e.toUpperCase());0===a&&(n.addClass(c),b.selectedLanguage=e),this.$langCont.append(n)},createSpecialBtn:function(t,e){var a=e.replace("<<","").replace(">>","");return t.addClass(i),"space"===a?t.data("val"," ").addClass("space"):t.addClass(a),t}},p={loadLanguageSwitcher:function(){t("."+o).click(function(){var e=t(this),a=e.data("lang");t("."+b.selectedLanguage+u).addClass(r),t("."+a+u).removeClass(r),t("."+o+"."+c).removeClass(c),e.addClass(c),b.selectedLanguage=a})},loadCapsLockEvent:function(){var e="."+b.selectedLanguage+u;v.$base.find(e).find("."+i+".capslock").click(function(){var n=t(this).closest(e);b.capsLock?(b.capsLock=!1,t(this).removeClass(c)):(b.capsLock=!0,t(this).addClass(c)),n.find("."+a).each(function(){var e=t(this),a=e.data("val");a=b.capsLock?a.toUpperCase():a.toLowerCase(),e.html(a)})})},loadShiftEvent:function(){var e="."+i+".shift",s="."+b.selectedLanguage+u;v.$base.find(s).find(e).click(function(){var i=t(this).closest(e);b.shift=!0,t(e).addClass(c),i.find("."+a).each(function(){var e=t(this),a=e.data("val").toUpperCase();e.html(a).data("val",a)}),i.find("."+n).each(function(){var e=t(this),a=e.data("shift");e.html(a).data("val",a)})})},unshift:function(){var e="."+i+".shift",a=t(e);b.shift=!1,a.removeClass(c)},loadBackspaceEvent:function(){t("."+i+".backspace").click(function(){p.onDirectTextManip(function(t,e){var a;return a=t.start===t.end?1:0,{updatedContent:g.backspaceStrManipulation(e,t,a),caretOffset:-a}})})},loadInputButtonEvent:function(){v.$base.find("."+a).add("."+n).add("."+i+".space").click(function(){var e=t(this).data("val");p.onDirectTextManip(function(t,a){return{updatedContent:g.insertCharacter(a,t,e),caretOffset:1}})})},onDirectTextManip:function(t){var e,a,n,i;p.$activeElement&&(p.resetActiveElementFocus(),a=p.$activeElement.val()||"",e=p.$activeElement[0],i={start:e.selectionStart,end:e.selectionEnd},n=t(i,a),p.$activeElement.val(n.updatedContent),g.setCaretPosition(e,i.start+n.caretOffset))},activeElementListener:function(){t("input, textarea").focus(function(){p.$activeElement=t(this)})},resetActiveElementFocus:function(){this.$activeElement.blur(function(){setTimeout(function(){p.$activeElement.focus(function(t){t.stopPropagation()})},25)})},loadEvents:function(){this.activeElementListener(),this.loadLanguageSwitcher(),this.loadInputButtonEvent(),this.loadBackspaceEvent(),this.loadCapsLockEvent(),this.loadShiftEvent()}},b={init:function(t){return jqKeyboard.layouts?(b.options=t,v.createBase(),void p.loadEvents()):void console.error("jqKeyboard: The keyboard layout configuration file hasn't been loaded.")}},{init:b.init}}(jQuery);