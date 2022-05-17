/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});


(function( $ ) {

  function getKeyByIndex(obj, index) {
    var i = 0;

    if(obj)
      for (var attr in obj) {

        if(obj.hasOwnProperty(atfhtr)) {

            if (index === i){
              return attr;
            }
            i++;
        }
      }
    
    return null;
  };


  $.fn.post_timeline = function(_options) {

    var options = $.extend({},_options);


    /////////////////////////
    ///// Vertical Methods //
    /////////////////////////
    var ptl_navigation_vertical = {
        initialize: function($_container) {

            this.$cont = $_container;


            var max_li = (_options.nav_max && !isNaN(_options.nav_max))?parseInt(_options.nav_max):6,
                $cont  = $_container.find('.yr_list');

            //set limit
            if(max_li <= 2 || max_li > 15) {
              max_li = 6;
            }


            var $cont_inner = $cont.find('.yr_list-inner'),
                $cont_view  = $cont.find('.yr_list-view');

            this.$cont_inner = $cont_inner;
            var cin_height   = $cont_inner.height();
            var $c_li        = $cont.find('.yr_list-inner li');
            this.li_count    = $c_li.length; 

            this.li_width        = cin_height / this.li_count; //pad
            this.iterate_width   = this.li_width * max_li;
            this.total_iterate   = Math.ceil(cin_height / this.iterate_width) - 1;
            this.current_iterate = 0;

            //NOT FOR PTL ADMIN
            if(window['ptl_admin_pan'])
              return;

            //the iteration wrapper
            var c_iterate = 0,
                n_iterate = 0;
            for(var i = 0; i <= this.total_iterate; i++) {

              c_iterate  = i * max_li;
              n_iterate += max_li;
              var $temp_div = $c_li.slice(c_iterate,n_iterate).wrapAll('<div class="ptl-yr-list"/>');
              if(i == 0) {
                $temp_div.parent().addClass('ptl-active');
              }
            }

            this.in_wrap_height = $('.ptl-yr-list.ptl-active').outerHeight();
            this.iterate_width  = this.in_wrap_height;


            this.btn_top     = $cont.find('.btn-top'),
            this.btn_bottom  = $cont.find('.btn-bottom');
            
            if(this.li_count <= max_li) {

                this.btn_top.hide();
                this.btn_bottom.hide();
            }
            else{

              this.btn_top.show();
              this.btn_bottom.show();
              $(this.btn_top).addClass('ptl-disabled');
            }


            var padding = 0;
            $cont_view.height(((this.in_wrap_height) + padding)+ 'px');
            //$cont_view.height(((max_li * this.li_width) + padding)+ 'px');
            this.btn_top.unbind().bind('click',$.proxy(this.topArrow,this));
            this.btn_bottom.unbind().bind('click',$.proxy(this.bottomArrow,this));
        },
        topArrow: function(e) {

            var that = this;
            if(this.current_iterate > 0) {

                this.current_iterate--;

                this.$cont_inner.find('.ptl-yr-list').eq(this.current_iterate).addClass('ptl-active');

                //add disable
                if(this.current_iterate == 0) {
                    $(this.btn_top).addClass('ptl-disabled');
                }
                $(this.btn_bottom).removeClass('ptl-disabled');

                var to_top =  -(this.current_iterate * this.iterate_width);

                //console.log(this.current_iterate,'   ',to_left);
                that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate + 1).removeClass('ptl-active');
                this.$cont_inner.animate({'top':to_top+'px'},500,'swing',function(e) {

                    //that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate + 1).removeClass('ptl-active');
                    //console.log('===> post-timeline-public-display-12-h.php ===> 165 complete');
                });
            }
        },
        bottomArrow: function(e) {

            var that = this;
            if(this.current_iterate < this.total_iterate) {

                this.current_iterate++;

                this.$cont_inner.find('.ptl-yr-list').eq(this.current_iterate).addClass('ptl-active');

                if(this.current_iterate == this.total_iterate) {
                    $(this.btn_bottom).addClass('ptl-disabled');
                }
            
                $(this.btn_top).removeClass('ptl-disabled');
                  
                var to_top =  -(this.current_iterate * this.iterate_width);

                //console.log(this.current_iterate,'   ',to_left);
                that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate - 1).removeClass('ptl-active');
                this.$cont_inner.animate({'top':to_top+'px'},500,'swing',function(e) {
                    //console.log('===> post-timeline-public-display-12-h.php ===> 165 complete');
                    //that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate - 1).removeClass('ptl-active');
                    //that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate - 1).removeClass('ptl-active');
                });
            }
        },
        //vertical
        goTo: function(_iterate) {

            var that = this;

            var prev_iterate     = that.current_iterate;
            that.current_iterate = _iterate;

            //same iteration return
            if(prev_iterate == that.current_iterate)return;


            that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate).addClass('ptl-active');
            that.$cont_inner.find('.ptl-yr-list').eq(prev_iterate).removeClass('ptl-active');
            //that.$cont_inner.find('.ptl-yr-list').eq(prev_iterate).addClass('ptl-rem');

            //add Disable
            $(this.btn_top).removeClass('ptl-disabled');
            $(this.btn_bottom).removeClass('ptl-disabled');

            if(this.current_iterate == 0) {
                $(this.btn_top).addClass('ptl-disabled');
            }

            if(this.current_iterate == this.total_iterate) {
                $(this.btn_bottom).addClass('ptl-disabled');
            }

            var to_top = -(this.current_iterate * this.iterate_width);

            //console.log('Goto Index: ',_iterate,' prev_iterate: '+prev_iterate,'current_iterate: '+this.current_iterate);


            this.$cont_inner.animate({'top':to_top+'px'},500,'swing',function(e) {

                //that.$cont_inner.find('.ptl-yr-list').eq(prev_iterate).removeClass('ptl-active');
            });
        },
        //Update tags List
        update_tags: function(_tag_list) {

          var that  = this,
              count = 0;

          for(var y in _tag_list) {

              if(_tag_list.hasOwnProperty(y)) {
                
                if(that.$cont_inner.find('li[data-tag="'+y+'"]').length == 0) {
                  count++;
                  that.$cont_inner.append('<li data-tag="'+y+'"><a data-scroll data-options=\'{ "easing": "Quart" }\'  data-href="#ptl-tag-'+y+'"><span>'+_tag_list[y]+'</span></a></li>');
                }
              }
          }

          //fix the tag list
          if(count > 0) {

              var _iterate = ptl_navigation_vertical.current_iterate;
              that.$cont_inner.find('.ptl-yr-list li').unwrap();
              ptl_navigation_vertical.initialize(ptl_navigation_vertical.$cont);

              //make current iteration
              ptl_navigation_vertical.current_iterate = _iterate;

          }
        }
    };


    var ptl_masonry_inst = null;

    /**
     * [add_masonry Add Masonry]
     * @param {[type]} $container [description]
     * @param {[type]} _options   [description]
     */
    var add_masonry = function($container,_options) {

        //Add Masonry for limited templates
        if(["3","7"].indexOf(_options.template) != -1) {

          $container.find('.ptl-preloder').addClass('hide');
          return;
        }


        var _callback = function() {
          
            $container.find('.timeline-box').removeClass('hide');

            var params = {
                childrenClass: 'timeline-box', // default is a div
                //childrenClass: 'div:not(.ptl-h-box) > .timeline-box', // default is a div
                columnClasses: 'padding', //add classes to items
                breakpoints: {
                  lg: 6, 
                  md: 6, 
                  sm: 12,
                  xs: 12
                },
                distributeBy: { order: false, height: true , attr: 'data-order', attrOrder: 'asc' }, //default distribute by order, options => order: true/false, height: true/false, attr => 'data-order', attrOrder=> 'asc'/'desc'
                onload: function (items) {
                  //make somthing with items
                } 
            };
            
            if(_options.grid) {
              params.breakpoints = _options.grid;
            }

            
            ptl_masonry_inst = $container.find(".timeline-section:not(.ptl-mp-class)").ptlmansory(params);
            ptl_masonry_inst.addClass('ptl-mp-class');

            $container.find('.ptl-preloder').addClass('hide');
        };

        //Pre-load the Images
        _callback();
        /*
        $container.imagesLoaded()
        .always(_callback)
        .done( function( instance ) {
          console.log('all images successfully loaded');
        })
        .fail( function() {
          console.log('all images loaded, at least one is broken');
        });
        */
    };


    /**
     * [debounce description]
     * @param  {[type]} func      [description]
     * @param  {[type]} wait      [description]
     * @param  {[type]} immediate [description]
     * @return {[type]}           [description]
     */
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    /**
     * [add_animation Add Animation]
     * @param {[type]} _options [description]
     * @param {[type]} $cont    [description]
     */
    var add_animation  = function(_options, $cont) {

      _options.offset = _options.offset || 0;

      //activate first li 
      $cont.find('.yr_list li:first-child a').addClass('active');
      var active_node = null;
      
      _options.scroller = _options.scroller || null;

      var panim = new PTLAnim({
          boxClass:     'panim', 
          animateClass: 'animated',
          scrollContainer: (window['ptl_admin_pan'])?'.modaal-wrapper':_options.scroller,
          //scrollContainer: null,
          offset:       _options.offset,
          callbackloop: debounce(function(box) {

            var _tag = $(box).data('tag');
            

            //console.log('===> post-timeline.js ===> 254',_tag);
            if(_options.scrolling)return;

            if(!active_node || _tag != active_node.data('tag')) {
            
              var $node = $cont.find('.yr_list li[data-tag="'+_tag+'"]');
              active_node = $node;
              $cont.find('.yr_list li a.active').removeClass('active');
              $node.children(0).addClass('active');

              //goto navigation
              var _nav_index = $cont.find('.ptl-yr-list.ptl-active').index();
              var _index = $node.parent().index();

              
              //console.log('_tag',_tag,'_nav_ind',_nav_index,'_index',_index);
              
              if(_nav_index != _index) {

                ptl_navigation_vertical.goTo(_index);
              }
            }
          }, 100)
      });
      window['panim'] = panim;  
        
      panim.init();
      //console.log(panim.stop());
    };


    /**
     * [add_more_buttom Add Load More]
     * @param {[type]} $cont    [description]
     * @param {[type]} _options [description]
     */
    var add_more_buttom = function($cont,_options) {

      //Load More Button
      $cont.find('.ptl-more-btn').bind('click', function (e) {

          e.preventDefault();

          var $that  = $(this),
            page_url = PTL_REMOTE.ajax_url,
            nextPage = parseInt($that.attr('data-page'), 10) + 1,
            maxPages = parseInt($that.attr('data-max-pages'), 10);

          $that.addClass('ptl-loading');

          var last_index = $cont.find('.timeline-box:last-child').data('row');


          var _params = _options;

          /*
          var _params = { 'paged':nextPage,'action':'ptl_load_posts','template':_options.template,
                          'paginate':_options['ptl_post_load'],'per_page':_options['ptl-post-per-page'],
                          'last': last_index
                        };
                        */

          _params['paged']    = nextPage;
          _params['last']     = last_index;
          _params['action']   = 'ptl_load_posts';
          _params['paginate'] = _options['ptl_post_load'];
          _params['per_page'] = _options['ptl-post-per-page'];

          //ajax request
          $.get(page_url,_params,function(_response) {

            $that.removeClass('ptl-loading');

            var $new_resp = $('<output>').append($.parseHTML(_response.html));
            
            //new response
            //var $new_resp = $.parseHTML(_response.html);
            //var $new_resp = $(_response.html);

            
            //GET the Previous tag
            var prev_tag = $cont.find('.ptl-posts-cont > .ptl-last-tag .tag > span').data('tag');

            if(_options.template == '1') {

                //var tag_key  = getKeyByIndex(_response.tags,0);
                var tag_key  = $new_resp.find('.timeline-box:first').data('tag');


                //remove it from existing nodes
                $cont.find('.ptl-posts-cont > .ptl-last-tag:last').remove();

                //same tag :: remove it
                //if(prev_tag == _response.tags[0]) {
                if(prev_tag == tag_key) {

                  //remove it from new nodes
                  $new_resp.find('#ptl-tag-'+prev_tag).parent().empty().remove();
                }
            }

            ///for template 2 only  : : //2,5,6,7,8
            if(_options.template == '2') {

              var last_tag = $cont.find('.timeline:last').data('tag'),
                  //new_tag  = $new_resp.find('.timeline:first-child').data('tag');
                  new_tag  = $new_resp.find('.timeline:first').data('tag');


              //when tags matches
              if(last_tag == new_tag) {

                var $ptl_mp = $cont.find('.timeline:last .ptl-mp-class');
                $ptl_mp.find('.ptl-h-box > div').unwrap();
                $ptl_mp.find('.ptl-h-box').remove();
                $ptl_mp.removeClass('ptl-mp-class');

                var $new_boxes = $new_resp.find('.timeline:first .timeline-box');
                $new_boxes.appendTo($ptl_mp);
                $new_resp.find('.timeline:first').remove();  
              }
            }

            else if(_options.template == '5' || _options.template == '6' || _options.template == '8') {
              
              var last_tag = $cont.find('.timeline-section:last').data('tag'),
                  new_tag  = $new_resp.find('.timeline-section:first').data('tag');

              

              //when tags matches
              if(last_tag == new_tag) {

                var $ptl_mp = $cont.find('.timeline-section:last');
                $ptl_mp.find('.ptl-h-box > div').unwrap();
                $ptl_mp.find('.ptl-h-box').remove();
                $ptl_mp.removeClass('ptl-mp-class');

                var $new_boxes = $new_resp.find('.timeline-section:first .timeline-box');
                $new_boxes.appendTo($ptl_mp);
                $new_resp.find('.timeline-section:first').remove();
              }
            }
            //big number
            else if(_options.template == '7') {
              
              var last_tag = $cont.find('.timeline-section:last').data('tag'),
                  new_tag  = $new_resp.find('.timeline-section:first').data('tag');

              //console.log(last_tag,'   ',new_tag);
              //when tags matches
              if(last_tag == new_tag) {

                var $ptl_mp     = $cont.find('.timeline-section:last');
                var $new_boxes = $new_resp.find('.timeline-section:first .timeline-box');

                $new_boxes.appendTo($ptl_mp);
                $new_resp.find('.timeline-section:first').remove();
              }
            }

            ///append the new data
            $cont.find('.ptl-posts-cont').append($new_resp.html());


            //change text of last node IF Exist
            if(_response.range && _response.range[1]) {

              $cont.find('.ptl-sec-yr.ptl-last').text(_response.range[1]);
            }

            //reset masonry
            add_masonry($cont,_options);

            //Update tag list
            ptl_navigation_vertical.update_tags(_response.tags);

            ( nextPage == maxPages )?$that.remove():$that.attr('data-page', nextPage);

          },'json');
      });
    };


    
    //////////////////////////
    //// Horizontal Methods //
    //////////////////////////
    
    // Navigation
    var ptl_navigation = {
      initialize: function($container) {

        var max_li     = (_options.nav_max && !isNaN(_options.nav_max))?parseInt(_options.nav_max):6,
                $cont  = $container.find('.yr_box');

        //set limit
        if(max_li <= 2 || max_li > 15) {
          max_li = 6;
        }       

        this.$cont = $cont;

        var $cont_inner = $cont.find('.yr_list-inner'),
            $cont_view  = $cont.find('.yr_list-view');

        this.max_li      = max_li; 
        this.$cont_inner = $cont_inner;
        var cin_width    = $cont_inner.width();
        var $c_li        = $cont.find('.yr_list-inner li');
        this.li_count    = $cont.find('.yr_list-inner li').length; 
        this.li_width    = cin_width / this.li_count;//pad
        

        //Validate if that max_li count is possible
        
        if((this.li_width * max_li) > $cont.width()) {
          
          max_li = Math.floor($cont.width() / this.li_width);
          this.max_li = max_li;
        }



        this.iterate_width   = this.li_width * max_li;
        this.total_iterate   = Math.ceil(cin_width / this.iterate_width) - 1;
        this.current_iterate = 0;

        //the iteration wrapper
        var c_iterate = 0,
            n_iterate = 0;

        for(var i = 0; i <= this.total_iterate; i++) {

          c_iterate  = i * max_li;
          n_iterate += max_li;
          var $temp_div = $c_li.slice(c_iterate,n_iterate).wrapAll('<div class="ptl-yr-list"/>');
          if(i == 0) {
            $temp_div.parent().addClass('ptl-active');
          }
        }

        this.in_wrap_width  = $('.ptl-yr-list.ptl-active').outerWidth();
        this.iterate_width  = this.in_wrap_width;
        
        this.li_width    = cin_width / this.li_count;//pad
        this.btn_left    = $cont.find('.btn-left'),
        this.btn_right   = $cont.find('.btn-right');
        
        if(this.li_count <= this.max_li) {

            max_li = this.li_count;
            this.btn_left.hide();
            this.btn_right.hide();
        }
        else {
          this.btn_left.show();
          this.btn_right.show();
          $(this.btn_left).addClass('ptl-disabled');
        }

        var padding = 0;
        $cont_view.width((this.in_wrap_width + padding)+ 'px');
        //$cont_view.width((max_li * this.li_width)+ 'px');
        this.btn_left.bind('click', $.proxy(this.leftArrow,this));
        this.btn_right.bind('click',$.proxy(this.rightArrow,this));
      },
      /**
       * [resize Resize Window Horizontal Navigation]
       * @param  {[type]} $container [description]
       * @return {[type]}            [description]
       */
      resize: function($container) {

        var max_li      = (_options.nav_max && !isNaN(_options.nav_max))?parseInt(_options.nav_max):6,
            $cont       = $container.find('.yr_box');

        //set limit
        if(max_li <= 2 || max_li > 15) {
          max_li = 6;
        }            


        this.$cont = $cont;

        var $cont_inner = $cont.find('.yr_list-inner'),
            $cont_view  = $cont.find('.yr_list-view');

        this.max_li      = max_li; 
        this.$cont_inner = $cont_inner;
        var cin_width    = $cont_inner.width();
        var $c_li        = $cont.find('.yr_list-inner li');
        this.li_count    = $cont.find('.yr_list-inner li').length; 
        this.li_width    = cin_width / this.li_count;//pad
        

        //Validate if that max_li count is possible
        
        
        if((this.li_width * max_li) > $cont.width()) {
          
          max_li = Math.floor($cont.width() / this.li_width);
          this.max_li = max_li;
        }

        this.iterate_width   = this.li_width * max_li;
        this.total_iterate   = Math.ceil(cin_width / this.iterate_width) - 1;
        this.current_iterate = 0;

        //RESET
        $cont.find('.yr_list-inner .ptl-yr-list').children().unwrap();

        //the iteration wrapper
        var c_iterate = 0,
            n_iterate = 0;
        for(var i = 0; i <= this.total_iterate; i++) {

          c_iterate  = i * max_li;
          n_iterate += max_li;
          var $temp_div = $c_li.slice(c_iterate,n_iterate).wrapAll('<div class="ptl-yr-list"/>');
          if(i == 0) {
            $temp_div.parent().addClass('ptl-active');
          }
        }
        
       
        this.in_wrap_width  = $('.ptl-yr-list.ptl-active').outerWidth();
        this.iterate_width  = this.in_wrap_width;
        
        //this.li_width   = $cont.find('li').eq(0).outerWidth() + 28;//pad
        this.li_width    = cin_width / this.li_count;//pad
        
        if(this.li_count <= this.max_li) {

            max_li = this.li_count;
            this.btn_left.hide();
            this.btn_right.hide();
        }
        else {
          this.btn_left.show();
          this.btn_right.show();
          $(this.btn_left).addClass('ptl-disabled');
        }

        var padding = 0;
        $cont_view.width((this.in_wrap_width + padding)+ 'px');
      },
      /**
       * [leftArrow Left Arrow Horizontal Navigation]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      leftArrow: function(e) {

        var that = this;

        if(this.current_iterate > 0) {

            this.current_iterate--;

            this.$cont_inner.find('.ptl-yr-list').eq(this.current_iterate).addClass('ptl-active');

            // Add disable
            if(this.current_iterate == 0) {
                $(this.btn_left).addClass('ptl-disabled');
            }

            $(this.btn_right).removeClass('ptl-disabled');

            var to_left =  -(this.current_iterate * this.iterate_width);

            //console.log(this.current_iterate,'   ',to_left);
            that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate + 1).removeClass('ptl-active');
            that.$cont_inner.animate({'left':to_left+'px'},500,'swing',function(e) {

                that.get_first();
            });
        }
      },
      /**
       * [rightArrow Right Arrow Horizontal Navigation]
       * @param  {[type]} e [description]
       * @return {[type]}   [description]
       */
      rightArrow: function(e) {

        var that = this;

        if(this.current_iterate < this.total_iterate) {

            this.current_iterate++;

            this.$cont_inner.find('.ptl-yr-list').eq(this.current_iterate).addClass('ptl-active');

            if(this.current_iterate == this.total_iterate) {
                $(this.btn_right).addClass('ptl-disabled');
            }

            $(this.btn_left).removeClass('ptl-disabled');
                

            var to_left =  -(this.current_iterate * this.iterate_width);

            //console.log(this.current_iterate,'   ',to_left);
            that.$cont_inner.find('.ptl-yr-list').eq(that.current_iterate - 1).removeClass('ptl-active');
            that.$cont_inner.animate({'left':to_left+'px'},500,'swing',function(e) {
                
                that.get_first();

            });
        }
      },

      
      /**
       * [get_first Horizontal Navigation, Get First Post of the Tag]
       * @param  {[type]} _no_trigger [description]
       * @return {[type]}             [description]
       */
      get_first: function(_no_trigger) {

        var that    = this;
        var p_index = (that.max_li * that.current_iterate);

        //console.log(p_index);
        
        //show the current
        if(!_no_trigger)
          this.$cont_inner.find('li').eq(p_index).trigger('click');
      },
      /**
       * [load_tag Load Tags Horizontal Navigation]
       * @param  {[type]} _tag  [description]
       * @param  {[type]} $cont [description]
       * @return {[type]}       [description]
       */
      load_tag: function(_tag, $cont) {

        var that = this;

        $cont.find('li.active').removeClass('active');
        
        var $tag_li   = $cont.find('li[data-tag="'+_tag+'"]'),
            $p_tag    = $tag_li.parent(),
            tag_index = ($tag_li.index() + (this.max_li * $p_tag.index()));

        //tag_index = ($tag_li.index() + (this.max_li * that.current_iterate));
        //console.log('_tag',_tag,'   ',$tag_li,' that.current_iterate:',that.current_iterate,'    tag_index:',tag_index,'   ',$p_tag.index());
        
        console.log('===> post-timeline.js ===> 792', tag_index);
        $tag_li.addClass('active');

        var iterate = Math.floor(tag_index / this.max_li);

        console.log('iterate:',iterate,'this.current_iterate:',this.current_iterate);

        //If iterate is not same
        if(this.current_iterate != iterate) {

          this.current_iterate = iterate;
          
          $(this.btn_left).removeClass('ptl-disabled');
          $(this.btn_right).removeClass('ptl-disabled');
          
          //if Max
          if(iterate == this.total_iterate) {
              $(this.btn_right).addClass('ptl-disabled');
          }

          //If Below
          if(this.current_iterate == 0) {
              $(this.btn_left).addClass('ptl-disabled');
          }

          var to_left =  -(iterate * this.iterate_width);

          console.log(this.$cont_inner[0], '===> post-timeline.js ===> 819', to_left);
          //console.log(this.current_iterate,'   ',to_left);
          this.$cont_inner.animate({'left':to_left+'px'}, 500,'swing',function(e) {
              
              that.get_first(true);//no trigger
          });

        }
      }
    };

    /**
     * [make_horz_navigation Make Horizontal Navigation]
     * @param  {[type]} $cont      [description]
     * @param  {[type]} slick_inst [description]
     * @return {[type]}            [description]
     */
    function make_horz_navigation($cont, slick_inst) {


      $cont.find('.yr_list li').eq(0).addClass('active');

      window['slick_inst'] = slick_inst;


      $cont.find('.yr_list li').bind('click',function(e) {

          var _tag     = $(this).data('tag'); 

          slick_inst[0].agile_slick.the_tag = _tag;

          var $node   = $cont.find('.timeline-box[data-tag="'+_tag+'"]').parent();
          var _index  = $node.not('.agile_slick-cloned').data('agile_slick-index');
          
          //reduce of next sibling is null
          if(!$node[0].nextSibling && slick_inst[0].agile_slick.options.slidesToShow > 1) {
            _index--;
          }
          
          //console.log('_index to go:',_index,$cont.find('.timeline-box[data-tag="'+_tag+'"]').parent().not('.agile_slick-cloned'));

          slick_inst[0].agile_slick.goTo(_index);
      });


      //initialize horizontal navigation
      ptl_navigation.initialize($cont);

      /**
       * [On Slide Change]
       * @param  {[type]} _e  [description]
       * @param  {[type]} _s) {                               var $_slide [description]
       * @return {[type]}     [description]
       */
      slick_inst.on('afterChange',function(_e,_s) {
          
          var $_slide = $(_s.$slides[_s.getCurrent()]),
              _tag    = $_slide.find('.timeline-box').data('tag');
              //_tag    = slick_inst[0].agile_slick.the_tag || $_slide.find('.timeline-box').data('tag');
          console.log('===> post-timeline.js ===> 876');
          ptl_navigation.load_tag(_tag, $cont);

          the_tag = null;
      });
    };


    /**
     * [ptl_main Post Timeline Main method]
     * @return {[type]} [description]
     */
    function ptl_main() {
      
      var $this = $(this);


      var $section   = $this.find('.timeline-section');

      
      if(options.horiz) {

        var slider_params = {
          slidesToShow: (options.slides)? parseInt(options.slides): 2,
          slidesToScroll: 1,
          infinite: false
        };

        //set slick count
        var _w = $section.width();

        if(_w <= 768) {

          slider_params.slidesToShow = 1;
          //$section.attr('data-agile_slick','{"slidesToShow": 1, "slidesToScroll": 1}');
        }
        
        //  Slider
        var slick_inst = $section.agile_slick(slider_params);  


        //Make Navigation
        if(options['ptl-nav-status'])
          make_horz_navigation($this, slick_inst);


        //  Pre-scroll
        if(window.location.hash) {

          //  For Year Node
          var ptl_hash  = window.location.hash;

          var node_li   = $this.find('.yr_list li a[href="'+ptl_hash+'"]');

          if(node_li.length) {

            window.setTimeout(function(e) {
              node_li.parent().trigger('click');
            
            }, 500);
          }
          /*
          //  For Posts
          var ptl_hash  = window.location.hash.replace('#','');
          
          var hash_node = $section.find('[data-href="'+ptl_hash+'"]');

          if(hash_node && hash_node[0]) {

            var hash_post = hash_node.parents('.ptl-post-div');

            if(hash_post && hash_post[0]) {

              var post_list  = Array.prototype.slice.call( hash_post[0].parentNode.children );

              var post_index = post_list.indexOf( hash_post[0] );

              if(post_index) {

                slider_params.initialSlide = post_index;
              }
            }
          }
          */
        }

        /**
         * [Resize Event]
         * @param  {[type]} e)
         * @return {[type]}    [description]
         */
        $(window).on('resize',function(e) {
          
           //set slick count
          var _w = $section.width();

          if(_w <= 768) {
            
            //$section.attr('data-agile_slick','{"slidesToShow": 1, "slidesToScroll": 1}');
            slick_inst[0].agile_slick.options.slidesToShow = 1;
          }
          else {

            var slides = (options.slides)? parseInt(options.slides): ((options.template == "3-h" || options.template == "7-h")?1:2);

            //$section.attr('data-agile_slick','{"slidesToShow": 2, "slidesToScroll": 1}');
            slick_inst[0].agile_slick.options.slidesToShow = slides;
          }

          slick_inst.agile_slick('resize');

          //Reset the Navigation
          ptl_navigation.resize($this);

        });

        $this.find('.ptl-preloder').addClass('hide');
      }
      else {
          
          options.scroller = _options.scroller || null;

          //console.log(options.nav_offset);
          //Add ptl scroll :: once
          $.fn.ptlScroller({
            //selector: '[data-scroll]',
            nav_offset: (options.nav_offset)?parseInt(options.nav_offset):null,
            selector: '[data-scroll]',
            doc: (window['ptl_admin_pan'])?'.modaal-wrapper':options.scroller,
            before: function(e){

              options.scrolling = true;
              
            },
            after: function(e){

              options.scrolling = false; 
            }
          });
          
          //Add Animation :: Once
          if(options['ptl-anim-status'])
            add_animation(options, $this);


          add_masonry($this, options);

          add_more_buttom($this, options);

          if(options['ptl-nav-status']) {

            ptl_navigation_vertical.initialize($this);

            //sticky navigation func
            function ptl_yrmenu(fixmeTop) {

                var currentScroll = $(window).scrollTop();

                if (currentScroll >= fixmeTop) {
                    
                    $this.addClass('nav-fixed');
                    
                    $this.find('.yr_list').css({                      
                        position: 'fixed'
                    });
                }
                else {
                    
                    $this.removeClass('nav-fixed');
                    $this.find('.yr_list').css({
                        position: 'absolute'
                    });
                }
            }

            //sticky navigation
            var TopDistance = ($this.offset().top) + 50;
            ptl_yrmenu(TopDistance);

            $(window).scroll(function() {
                
              ptl_yrmenu(TopDistance);
            });
          }     
      }

      /////////////////
      //  Video Link //
      /////////////////
      var ptl_video_link;  
      var $agile_modal = $('#ptl-video-modal');
      $section.find('.ptl-video-btn').click(function() {
        
        ptl_video_link = $(this).data( "src" );
        ptl_video_link = ptl_video_link.replace('watch?v=', 'embed/');
        ptl_video_link = ptl_video_link.split('&')[0];

        $("#ptl-video").attr('src', ptl_video_link + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
        
        $agile_modal.css('display', 'block');
        
        window.setTimeout(function() {
          $agile_modal.addClass('in');
        }, 300);
      });

      ////////////////////////////
      //  Close the Video modal //
      ////////////////////////////
      $('.ptl-modal-backdrop-in').bind('click', function() {

        $agile_modal.removeClass('in');
        window.setTimeout(function() {
          $agile_modal.css('display', 'none');
          $("#ptl-video").attr('src', '' ); 
        }, 300);
      });

      $this.find('.ptl-preloder').addClass('hide');
    };

    /*Useless loop for each*/
    
    var That = this;    

    //for admin load ,set time out
    if(window['ptl_admin_pan']) {

      window.setTimeout(function() {
        
        That.each(ptl_main);

      },1000);
    }
    else
      That.each(ptl_main);

    return this;
  };

  //   Main Loop
  $('.p-tl-cont').each(function(e){

      var ptl_config_id = $(this).attr('data-id'),
          ptl_config    = window['ptl_config_' + ptl_config_id];

      if(ptl_config) {
        console.log('===> post-timeline.js init ===> ',ptl_config_id);
        $(this).post_timeline(ptl_config);
      }
  });
}( jQuery ));


