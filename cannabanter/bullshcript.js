// Everyone who helped make this possible, HBR, Vanquisher, DedZed, Sebek and FireRat, And thank you to everyone who helped test it
// Enables Interaction for all the browser windows by HBR
	  AFRAME.registerComponent("enable-interaction", { init: async function() { await window.AframeInjection.waitFor(this.el, "browser");
			this.el.browser.ToggleInteraction(true) 			} });
			
// Listens for button clicks to open the urls on either Screen by HBR
  AFRAME.registerComponent("click-url", {
	schema: { url: { type: "string", default: "" }, },
	init: function () {
	  this.el.addEventListener("click", () => {                         
		const TheBrowser = this.el.parentElement;
		TheBrowser.setAttribute("sq-browser", { url: this.data.url, pixelsPerUnit: 1600, mipMaps: 1, mode: "local", });		
		});		},		});
		
 // Toggle Button for locking and unlocking either screen By Fire with help from HBR
  AFRAME.registerComponent("lockbutton", {
	init: function () {
	  this.el.addEventListener("click", () => {
		const lockToggle = this.el;
		const ColliderScreen = lockToggle.parentElement.children[0];
		if (ColliderScreen.getAttribute("visible")) {
			  lockToggle.setAttribute("color","#FF0000");
			  ColliderScreen.setAttribute("visible","false");
		} else {
			  lockToggle.setAttribute("color","#00FF00");
			  ColliderScreen.setAttribute("visible","true");
	  }		});  }, 	});

		
// Toggle Sound for browser screen By Fire with help from HBR
	AFRAME.registerComponent("toggle-mute", {
	init: function () {
		this.el.addEventListener("click", () => {
		const TheBrowser = this.el.parentElement;
		const MuteButton = this.el;
		if(TheBrowser.getAttribute("datamuted")=="true") {
			MuteButton.setAttribute("color","#FFFFFF");
			TheBrowser.setAttribute("datamuted", "false");
			TheBrowser.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
				"document.querySelectorAll('video, audio').forEach((elem) => elem.muted=false);", }, ]);
		} else {
			MuteButton.setAttribute("color","#FF0000");
			TheBrowser.setAttribute("datamuted", "true")
			TheBrowser.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
				  "document.querySelectorAll('video, audio').forEach((elem) => elem.muted=true);",
			  },			]);		  }		});	  },	});
		  
// Changes Scale of either Screen when button clicked with help from HBR
  AFRAME.registerComponent("scale-screen", {
	schema: {
	  size: { type: "string" },
	  avalue: { type: "number" },
	},
	init: function () {
	  this.el.addEventListener("click", () => {  
		var screenScale = this.el.parentElement;
		let scaleX = screenScale.object3D.scale.x;
		let scaleY = screenScale.object3D.scale.y;
		switch (this.data.size) {
		  case "grow":
			scaleX += this.data.avalue;
			scaleY += this.data.avalue;
			break;
		  case "shrink":
			scaleX += this.data.avalue;
			scaleY += this.data.avalue;
			break;
		}
		this.el.setAttribute("color","#AAAAAA");
		screenScale.setAttribute("scale", scaleX + " " + scaleY + " 1");
		setTimeout(() => {  this.el.setAttribute("color","#00FF00"); }, 100);
		});		},		});
		
  // Rotate either screen when buttons clicked by HBR
  AFRAME.registerComponent("rotate", {
	schema: {
	  axis: { type: "string" },
	  amount: { type: "number" },
	},
	init: function () {
	  this.el.addEventListener("click", () => {
		let browserRotation = this.el.parentElement;
		let x = browserRotation.object3D.rotation.x;
		let y = browserRotation.object3D.rotation.y;
		let z = browserRotation.object3D.rotation.z;
		switch (this.data.axis) {
		  case "x":
			x += this.data.amount;
			break;
		  case "y":
			y += this.data.amount;
			break;
		}
		this.el.setAttribute("color","#AAAAAA");
		browserRotation.setAttribute("rotation", x + " " + y + " " + z);  
		setTimeout(() => {  this.el.setAttribute("color","#00FF00"); }, 100); 
		});        },      });

	// Toggle for hiding and showing the scale buttons By Fire with help from HBR
  AFRAME.registerComponent("enablerot", {
	init: function () {
	  this.el.addEventListener("click", () => {
		const rotats = this.el;
		const rotatebutton = rotats.parentElement.children[6];
		var els = document.getElementsByClassName("tilt");
		if (rotatebutton.getAttribute("visible")) {
			  rotats.setAttribute("color","#FFFFFF");
			[].forEach.call(els, function (el) {
				el.setAttribute("visible","false");
			});
		} else {
			  rotats.setAttribute("color","#00FF00");
			[].forEach.call(els, function (el) {
				el.setAttribute("visible","true");
			});
		}		});  }, 	});
		
	
	// Toggle for hiding and showing buttons By Fire with help from HBR
  AFRAME.registerComponent("hidebuttons", {
	init: function () {
	  this.el.addEventListener("click", () => {
		const hidebut = this.el;
		const somebutton = hidebut.parentElement.children[2];
		var buttons = document.getElementsByClassName("buttons");
		if (somebutton.getAttribute("visible")) {
			  hidebut.setAttribute("color","#FF0000");
			[].forEach.call(buttons, function (el) {
				el.setAttribute("visible","false");
			});
		} else {
			  hidebut.setAttribute("color","#FFFFFF");
			[].forEach.call(buttons, function (el) {
				el.setAttribute("visible","true");
			});
		}		});  }, 	});
		
// Changes Volume of the Screen when button clicked By Fire with help from HBR
  AFRAME.registerComponent("volume-level", {
	schema: {
	  vvalue: { type: "number" },
	},
	init: function () {
	  this.el.addEventListener("click", () => {  
		var screenVolume = this.el.parentElement;
		let volume = parseFloat(screenVolume.getAttribute("volumelevel"));
		volume += this.data.vvalue;
		volume = volume.toFixed(2);
		if (volume > 1) {volume = 1};
		if (volume < 0) {volume = 0};
		screenVolume.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
	"document.querySelectorAll('video, audio').forEach((elem) => elem.volume=" + volume + ");", }, ]);
		this.el.setAttribute("color","#AAAAAA");
		screenVolume.setAttribute("volumelevel", volume);
		setTimeout(() => {  this.el.setAttribute("color","#00FF00"); }, 100);
		});		},		});
		
	
	// Navigates browser page Backwards/Forward
  AFRAME.registerComponent("navigate-browser", {
  schema: {
    action: { type: "string", default: "goback" }  // Default action is "goback"
  },
  init: function () {
    const browserElement = this.el.parentElement;
    this.el.addEventListener("click", () => {
      const actionType = this.data.action;
      this.el.setAttribute("color", "#AAAAAA");
      browserElement.components['sq-browser'].runActions([{
        actionType: actionType
      }]);
      setTimeout(() => {
        this.el.setAttribute("color", "#00FF00");
      }, 100);
    });
  },
});

 // Screencast toggle by HBR. Thank you HBR!
  window.aframeTriggerCallback = (msg, isLocal) => {
  console.log(msg);
  switch (msg) {
    case "MutePlayer":
      if (window.videoPlayerCore.params.mute == "false") {
        clickButton("mute");
      }
      break;
    case "Playlist":
      clickButton("playlist");
      break;
    case "UnmutePlayer":
      if (window.videoPlayerCore.params.mute == "true") {
        clickButton("mute");
      }
      break;
    case "PlusFive":
      clickButton("+ vol");
      break;
    case "MinusFive":
      clickButton("- vol");
      break;

    case "enableScreencast":
      enableScreencast();
      break;
    case "disableScreencast":
      disableScreencast();
      break;
  }
};

// Screencast toggle by HBR. Thank you HBR!
function disableScreencast() {
  let screencast = document.getElementById("cannabanter-screencast");
  if (screencast) {
    // Browser is on, remove it
    screencast.parentElement.removeChild(screencast);
  }
}

function enableScreencast() {
  //just to be sure we don't create multiple
  disableScreencast();
  //now add it
  const screencast = document.createElement("a-entity");
  screencast.id = "cannabanter-screencast";
  screencast.setAttribute("scale", "1 1 1");
  screencast.setAttribute("rotation", "0 0 0");
  screencast.setAttribute("position", "0 -3 10");
  screencast.setAttribute(
    "sq-browser",
    "url: https://sidequestvr.github.io/SideQuest.Banter.Spaces/screen-cast/?sid=4202024; mipMaps: 1; pixelsPerUnit: 1600; mode: local;"
  );
  document.querySelector("a-scene").appendChild(screencast);
  muteScreencast();
};

function muteScreencast() {
      var screenVolume = document.getElementById("cannabanter-screencast");
setTimeout(() => {  screenVolume.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
    "document.querySelectorAll('video, audio').forEach((elem) => elem.volume=0.1);", }, ]); }, 1000);
      var screenVolume = document.getElementById("theBrowser1");
setTimeout(() => {  screenVolume.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
    "document.querySelectorAll('video, audio').forEach((elem) => elem.volume=0.1);", }, ]); }, 5000);
      var screenVolume = document.getElementById("theBrowser1");
setTimeout(() => {  screenVolume.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
    "document.querySelectorAll('video, audio').forEach((elem) => elem.volume=0.1);", }, ]); }, 10000);
}


      // Toggle Sound for browser SCREENSHARE By Fire with help from HBR
    AFRAME.registerComponent("toggle-mute", {
    init: function () {
        this.el.addEventListener("click", () => {
        const TheBrowser = document.getElementById("cannabanter-screencast");
        const MuteButton = this.el;
        if(TheBrowser.getAttribute("datamuted")=="true") {
            MuteButton.setAttribute("color","#FFFFFF");
            TheBrowser.setAttribute("datamuted", "false");
            TheBrowser.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
                "document.querySelectorAll('video, audio').forEach((elem) => elem.muted=false);", }, ]);
        } else {
            MuteButton.setAttribute("color","#FF0000");
            TheBrowser.setAttribute("datamuted", "true")
            TheBrowser.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
                  "document.querySelectorAll('video, audio').forEach((elem) => elem.muted=true);",
              },            ]);          }        });      },    });

// Changes Volume of the SCREENSHARE when button clicked By Fire with help from HBR
  AFRAME.registerComponent("volume-level", {
    schema: {
      vvalue: { type: "number" },
    },
    init: function () {
      this.el.addEventListener("click", () => {  
        var screenVolume = document.getElementById("cannabanter-screencast");
        let volume = parseFloat(screenVolume.getAttribute("volumelevel"));
        volume += this.data.vvalue;
        volume = volume.toFixed(2);
        if (volume > 1) {volume = 1};
        if (volume < 0) {volume = 0};
        screenVolume.components["sq-browser"].runActions([ { actionType: "runscript", strparam1:
    "document.querySelectorAll('video, audio').forEach((elem) => elem.volume=" + volume + ");", }, ]);
        this.el.setAttribute("color","#AAAAAA");
        screenVolume.setAttribute("volumelevel", volume);
        setTimeout(() => {  this.el.setAttribute("color","#00FF00"); }, 100);
        });        },        });