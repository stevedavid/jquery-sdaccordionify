/*!
    jQuery.sdAccordionify v0.1
    (c) 2015 Steve David <http://www.steve-david.com>
    
    MIT-style license.
*/

;(function($) {

    $.fn.extend({
        sdAccordionify: function(options) {
            if (options && typeof(options) == 'object') {
                options = $.extend({}, $.sdAccordionify.defaults, options);
            }

            if($(this).length == 1) {
                new $.sdAccordionify(this, options);
            }

            return this;
        }
    });

    $.sdAccordionify = function(el, option) {
        var options  = option || $.sdAccordionify.defaults;

        var $ul = $(el)
        , $lis = $ul.find('> li')
        , accordion = $.sdAccordionify.buildAccordion($lis)
        ;
        
        $container = $.sdAccordionify.createAndFillDiv(el, accordion, options);

        $lis.each(function(i) {
            if($(this).hasClass('active')) {
                $.sdAccordionify.extend($container.find('> .sda-content').eq(i), options);
            }
        });

        $container.find('> .sda-title').on('click', function(e) {
            e.preventDefault();

            $.sdAccordionify.extend(this, options);
        });

        return;
    };

    $.sdAccordionify.buildAccordion = function($lis) {
    
        var accordion = {};

        $lis.each(function(i) {
            accordion[$(this).data('title')] = $.trim($(this).html());
        });

        return accordion;

    };

    $.sdAccordionify.createAndFillDiv = function(el, accordion, options) {
        var length = $(el).find('> li').length
        , i
        , $div = $('<div>').attr('id', 'sdAccordionify').css({
            width: options.width,
            border: '1px solid ' + options.colors.containerBorder
        })
        ;

        $(el).css('padding', 0).empty().append($div);

        keys = Object.keys(accordion);
        for(i = 0; i < length; ++i) {
            
            $slideContainer = $('<div/>')
                                .addClass('sda-container')
                                .attr('data-id', i);
            $div.append($slideContainer);

            $i = $('<i/>')
                    .addClass('fa fa-arrow-right')
                    .attr('data-toggle', 'closed')
                    .css({
                        'display': 'inline-block',
                        'margin-left': '5px',
                    });           
            $divTitle = $('<div />')
                            .addClass('sda-title')
                            .css({
                                'background-color': options.colors.backgroundTitle,
                                'border': '1px solid ' + options.colors.borderTitle,
                                'cursor': 'pointer'
                            })
                            .html($('<span />').html(keys[i]).css({
                                'padding-left':'20px',
                                'padding-top':'5px',
                                'padding-bottom':'5px',
                                'display':'inline-block'
                            }))
                            .prepend($i);
            $slideContainer.append($divTitle);
            
            $divContent = $('<div />')
                            .addClass('sda-content')
                            .html(accordion[keys[i]])
                            .hide()
                            .css({
                                'overflow': 'hidden',
                                'padding': '20px'
                            });
            if(options.centered) {
                $divContent.css('text-align: center');
                $divContent.children().css({
                    'margin': 'auto',
                    'text-align': 'center'
                });
            }
            $slideContainer.append($divContent);
        }

        return $('.sda-container');
    };

    $.sdAccordionify.extend = function(title, options) {

        var $container = $(title).parent()
            , $content = $container.find('> .sda-content')
            , id = $container.data('id');


        if(!$('.sda-container').is(':animated')) {
            if(!$content.is(':visible')) {
                $.sdAccordionify.toggleArrow(id, 'open');
                if(options.animation) {
                    $content.slideDown(options.duration);
                } else {
                    $content.show();
                }
            } else {
                $.sdAccordionify.toggleArrow(id, 'closed');
                if(options.animation) {
                    $content.slideUp(options.duration);
                } else {
                    $content.hide();
                }
            }

            if(!options.fixed) {
                $('.sda-container').each(function(i) {
                    if(i != id) {
                        $content = $(this).find('> .sda-content')
                        $.sdAccordionify.toggleArrow(i, 'closed');;
                        if(options.animation) {
                            $content.slideUp(options.duration);
                        } else {
                            $content.hide();

                        }
                    }
                });
            }
        };
    };

    $.sdAccordionify.toggleArrow = function(id, toggle) {
        var $i = $('.sda-container[data-id=' + id + ']').find('i.fa');

        if(toggle == 'open') {
            $i
            .removeClass('fa-arrow-right')
            .addClass('fa-arrow-down')
            .attr('data-toggle', 'open'); 
        } else if(toggle == 'closed') {
            $i
            .removeClass('fa-arrow-down')
            .addClass('fa-arrow-right')
            .attr('data-toggle', 'closed'); 
        }
    }


    $.sdAccordionify.defaults = {
        fixed: false,
        animation: false,
        duration: 500,
        width: 500,
        centered: false,
        colors: {
            backgroundTitle: '#eee',
            borderTitle: '#ddd',
            containerBorder: '#ccc'
        } 
    };

})(jQuery);
