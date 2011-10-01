var tl;
function onLoad() {
	
	var theme = Timeline.ClassicTheme.create();
	theme.event.track.gap = 15.0;
	theme.event.tape.height = 2.0;
	theme.event.instant.icon = 'media/bullet.png';
	theme.event.duration.color = '#FF6666';
	theme.ether.backgroundColors[3] = "#E8E8F4";

	var events = new Timeline.DefaultEventSource();
	var releases = new Timeline.DefaultEventSource();
	var release_eras = new Timeline.DefaultEventSource();

	var start_date = new Date();
	start_date.setDate(start_date.getDate() - 90);

	var bandInfos = [
		Timeline.createBandInfo({
			eventSource:    events,
			width:          "57%", 
			intervalUnit:   Timeline.DateTime.MONTH, 
			intervalPixels: 100,
			date:		start_date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    release_eras,
			width:          "10%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 500,
			date:		start_date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    releases,
			width:          "26%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 500,
			date:		start_date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    releases,
			width:          "7%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 70,
			date:		start_date,
			theme:		theme,
			overview:	true
		})
	];
	bandInfos[1].highlight = true;
	bandInfos[1].syncWith = 0;
	bandInfos[2].highlight = true;
	bandInfos[2].syncWith = 0;
	bandInfos[3].highlight = true;
	bandInfos[3].syncWith = 0;

	tl = Timeline.create(document.getElementById("the-timeline"), bandInfos);
	var random = Math.floor(Math.random() * 100000);
	Timeline.loadXML("xml/events.xml?" + random, function(xml, url) { events.loadXML(xml, url); });
	Timeline.loadXML("xml/releases.xml?" + random, function(xml, url) { releases.loadXML(xml, url); });
	Timeline.loadXML("xml/release_eras.xml?" + random, function(xml, url) { release_eras.loadXML(xml, url); });
}

var resizeTimerID = null;
function onResize() {
    if (resizeTimerID === null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}
