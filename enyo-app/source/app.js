enyo.kind({
	name: "enyo.app",
	kind: enyo.VFlexBox,
	components: [
		{kind: "PageHeader", components: [
			{kind: "VFlexBox", flex: 1, align: "center", components: [
				{content: "Enyo 1 App", domStyles: {"font-weight": "bold"}},
				{content: "webOS Forever!", className: "enyo-item-secondary" }
			]},
		]},
		{name: "PageContent", kind: "SlidingPane", flex: 1, onSelectView: "slidingSelected", components: [
			{name: "panelImage", components: [
				{kind: "Scroller", flex:1, domStyles: {"margin-top": "0px", "min-width": "130px"}, components: [
					{kind: "VFlexBox", flex: 2, pack: "center", components: [
						{w: "fill", domStyles: {"text-align": "center"}, components: [
							{kind: "Image", flex:1, name: "imgCow", src: "images/cow.png", domStyles: { "margin-left": "auto", "margin-right": "auto"}},
						]},
					]},
				]},
				{kind: "Toolbar", components: [
					{kind: "GrabButton", onclick: "selectNextView"},
					{caption: "Do Something!", onclick: "showPopup"}
				]}
			]},
		]},
		{name: "PopupHello", kind: "Popup", lazy: false, layoutKind: "VFlexLayout", style: "width: 60%;height:150px", components: [
			{content: "<b>Popup Message</b>" },
			{kind: "BasicScroller", flex: 1, components: [
				{ name: "popupMessage", kind: "HtmlContent", flex: 1, pack: "center", align: "left", style: "text-align: left;padding-top:10px;padding-bottom: 10px" }
			]},
			{layoutKind: "HFlexLayout", pack: "center", components: [
					{ kind: "Button", caption: "OK", onclick: "closePopup" },
			]}
		]},
	],
	create: function() {
		this.inherited(arguments);
		enyo.log("App Starting Up!");	
	},
	listSetupRow: function(inSender, inIndex) {
		if (this.data) {
			var record = this.data[inIndex];
			if (record) {
				this.$.itemCaption.setContent(record.caption);
				this.$.itemValue.setContent(record.value);
				return true;
			}
		}
	},
	closePopup: function(inSender) {
		this.$.PopupHello.close();
	},
	showPopup: function(inSender) {
		message = "Hello world!";
		this.$.popupMessage.setContent(message);
		this.$.PopupHello.openAtCenter();
	},
	selectNextView: function () {
		var pane    = this.$.slidingPane;
		var viewIdx = pane.getViewIndex();
		if (viewIdx < pane.views.length - 1) {
			viewIdx = viewIdx + 1;
		} else {
			return;	// we've selected the last available view.
		}
		pane.selectViewByIndex(viewIdx);
	},
});