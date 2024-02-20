      // Clock script from Parlor by Ben. Thank you Ben! 
      setInterval(() => {
        var now = new Date();
        hourHand.object3D.rotation.z = 2 * Math.PI*(now.getHours()*60+now.getMinutes())/720;
        minuteHand.object3D.rotation.z = 2 * Math.PI*(now.getMinutes()+now.getSeconds()/60)/60;
        secondHand.object3D.rotation.z = 2 * Math.PI*now.getSeconds()/60;
      }, 1000);