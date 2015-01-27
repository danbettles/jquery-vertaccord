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
            animationDuration: 400
        }, config, inlineConfig);
    }

    VerticalAccordion.prototype = {

        getParent: function () {
            return this.config.$parent;
        },

        getChildren: function () {
            return this.getParent().children();
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

        closeOtherChildren: function ($child) {
            return this.closeChild(this.getChildren().not($child));
        },

        openChild: function ($child, animate) {
            var animationDuration = animate === false ? 0 : this.config.animationDuration,
                initialHeight = $child.data('vertaccord.initialHeight');

            $child.animate({height: String(initialHeight) + 'px'}, animationDuration, null, function () {
                $child
                    .removeClass('vertaccord-closed')
                    .addClass('vertaccord-open');
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
                (new VerticalAccordion(jQuery.extend({}, config, {
                    $parent: jQuery(this)
                }))).play();
            });
        }
    });

    jQuery.extend({
        vertaccord: function () {
            jQuery('.vertaccord').vertaccord();
        }
    });
}());