/*
	TITLE: HeightEqualizer

	DESCRIPTION: Sets equal height on a collection of DOM ELs

	VERSION: 0.1.0

	USAGE: var myHeightEqualizer = new HeightEqualizer('Elements', 'Options')
		@param {jQuery Object}
		@param {Object}

	AUTHORS: CN

	DEPENDENCIES:
		- jQuery 1.10+

*/

var HeightEqualizer = function($items, objOptions) {
	this.$items = $items;
	this.options = $.extend({
		setParentHeight: false
	}, objOptions || {});

	this.$elParent = this.options.setParentHeight ? this.$items.first().parent() : null;

	this._len = this.$items.length;
	if (this._len <= 1) {return;}

	this.maxHeight = 0;

	this.getHeight();
	this.setHeight();

};
HeightEqualizer.prototype = {
	getHeight: function() {
		var heightCheck = 0;
		for (var i=0; i<this._len; i++) {
			heightCheck = $(this.$items[i]).innerHeight();
			if (heightCheck > this.maxHeight) {
				this.maxHeight = heightCheck;
			}
		}
	},
	setHeight: function() {
		this.$items.css({height: this.maxHeight});
		if (this.options.setParentHeight) {
			this.$elParent.css({height: this.maxHeight});
		}
	},
	resetHeight: function() {
		this.maxHeight = 0;
		this.$items.css({height: ''});
		if (this.options.setParentHeight) {
			this.$elParent.css({height: ''});
		}
		this.getHeight();
		this.setHeight();
	}
};


//uncomment to use as a browserify module
//module.exports = HeightEqualizer;
