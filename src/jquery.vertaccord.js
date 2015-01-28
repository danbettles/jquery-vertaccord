/*globals jQuery*/
/**
 * @author Dan Bettles <danbettles@yahoo.co.uk>
 */

(function () {
    'use strict';

    function VerticalAccordion(config) {
        var inlineConfigJson = config.$parent.attr('data-vertaccord'),
            inlineConfig = inlineConfigJson ? jQuery.parseJSON(inlineConfigJson) : {};

        this.config = jQuery.extend({
            closedHeight: undefined,
            animationDuration: 400,
            beforeOpen: undefined,
            afterOpen: undefined
        }, config, inlineConfig);
    }

    VerticalAccordion.prototype = {

        getParent: function () {
            return this.config.$parent;
        },

        getChildren: function (selector) {
            return this.getParent().children(selector);
        },

        closeChild: function ($child, animate) {
            var animationDuration = animate === false ? 0 : this.config.animationDuration;

            $child.animate({height: String(this.config.closedHeight) + 'px'}, animationDuration, null, function () {
                $child
                    .removeClass('vertaccord-open')
                    .addClass('vertaccord-closed');
            });

            return this;
        },

        closeOtherChildren: function ($openingChild) {
            return this.closeChild(this.getChildren().not($openingChild));
        },

        callEventHandler: function (name) {
            if (typeof this.config[name] === 'function') {
                //In true jQuery style, call the event handler in the context of the DOM element
                this.config[name].call(this.getParent().get(0));
            }
        },

        /**
         * Returns the child that's currently open.
         * 
         * @returns {jQuery}
         */
        getOpenChild: function () {
            return this.getChildren('.vertaccord-open');
        },

        openChild: function ($child, animate) {
            var vertaccord = this,
                animationDuration = animate === false ? 0 : this.config.animationDuration,
                initialHeight = $child.data('vertaccord.initialHeight');

            this.callEventHandler('beforeOpen');

            $child.animate({height: String(initialHeight) + 'px'}, animationDuration, null, function () {
                $child
                    .removeClass('vertaccord-closed')
                    .addClass('vertaccord-open');

                vertaccord.callEventHandler('afterOpen');
            });

            return this;
        },

        play: function () {
            var accordion = this;

            this.getChildren().each(function (childNo) {
                var $child = jQuery(this);

                //Make a note of the child's initial height so we'll know what to animate to later
                $child.data('vertaccord.initialHeight', $child.height());

                //Open the first child
                if (childNo === 0) {
                    accordion.openChild($child, false);
                } else {
                    accordion.closeChild($child, false);
                }

                $child.hover(function () {
                    //Don't animate if the child is already open
                    if ($child.hasClass('vertaccord-open')) {
                        return;
                    }

                    accordion
                        .closeOtherChildren($child)
                        .openChild($child);
                });
            });

            //Now that we're done, identify the parent as a vertical accordion
            this.getParent().addClass('vertaccord');

            return this;
        }
    };

    jQuery.fn.extend({
        vertaccord: function (config) {
            return this.each(function () {
                var $parent = jQuery(this),
                    vertaccord = new VerticalAccordion(jQuery.extend({}, config, {
                        $parent: $parent
                    }));

                $parent
                    .data('vertaccord', vertaccord)
                    .data('vertaccord')
                        .play();
            });
        }
    });

    jQuery.extend({
        vertaccord: function () {
            jQuery('.vertaccord').vertaccord();
        }
    });
}());