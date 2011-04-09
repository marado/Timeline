/* **********************************************************************************
 * Timeline.class.js - v0.1 - 2011/04/09
 * 
 * Timeline is a Javascript class to help you create in a simple way an HTML timeline
 * 
 * - This first version was made in a rush and I'm sleepy. Probably buggy, only has
 *   the features I needed at the moment, and no documentation or comments, sorry. 
 *   Check out the html file that was with this, it has an example of how to use it.
 * 
 * Latest version at: https://github.com/marado/Timeline
 * 
 * (C) 2011 Marcos Marado <mindboosternoori@gmail.com>
 * This code is copylefted with the GPLv3 license. It means it is free software and
 * you can do lots of cool things with it. Read the license at 
 * http://www.gnu.org/licenses/gpl.html
 * **********************************************************************************/

var Timeline = {
	// attributes
	start : 0,
	end : 0,
	resolution : 1,
	slices : [],

	// functions
	init : function (s,e,r) {
		this.start = s;
		this.end = e;
		this.resolution = r;
	},
	add : function (sliceStart,sliceEnd,sliceLabel,sliceColor,supressDate) {
		this.slices[sliceStart] = {length: sliceEnd - sliceStart, label: sliceLabel, color: sliceColor, supressDate: supressDate};
	},
	show : function () {
		var html = "<div id='timeline' style='width:" + (this.end-this.start)/this.resolution  + "px;'>";
		for (var i in this.slices) {
			html += "<div class='slice' style='float:left; left:" + i 
				+ "px; width:" + this.slices[i].length/this.resolution + "px; background: " + this.slices[i].color + "'>" + this.slices[i].label + "</div>";
		}
		html += "</div><br/>";
		return html;
	},
	caption : function (yearMode,ninetiesWithTwoDigits) {
		var html = "<div id='caption'>";
		for (var i in this.slices) {
			html += "<div class='point' style='float:left; left:" + i + "px; width:" + this.slices[i].length/this.resolution + "px;'>";
			if (!this.slices[i].supressDate) {
				if (yearMode) {
					var date = new Date(i).getFullYear();
					if (ninetiesWithTwoDigits) {if (Math.floor(date/100) == 19) { date = date-1900; date = "'"+date;}}
					html += date + "</div>";
				} else {
					html += i + "</div>";
				}
			} else { html += "&nbsp;</div>"; }
		}
		html += "<div class='point' style='float:left; left:" + this.end + "px;'>";
		if (yearMode) {
			var date = new Date(this.end).getFullYear();
			if (ninetiesWithTwoDigits) {if ((date/100) == 19) date = date-1900; }
			html += date + "</div>";
		} else {
			html += this.end+ "</div>";
		}

		html += "</div>";
		return html;
	},
};
