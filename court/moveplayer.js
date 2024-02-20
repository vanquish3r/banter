    // Cage exit and enter spawn point, script from AFK Jail by Moto. Thank you Moto!
    // A simple aframe component to handle the click
      AFRAME.registerComponent('handle-click', {
          init: function () {
              // When you click on an element, run the animation on the parent element
              this.el.addEventListener('click', () => {
                 movePlayer({x: -10.61, y: 0.035, z: -102.095});
              })
          }
      });
            
     function multispaw() {
        const spawpoints = [];
        spawpoints[0] = new THREE.Vector3(0, 0, 0);

        const randomspawpoint = Math.floor(Math.random() * 1);
        movePlayer(spawpoints[randomspawpoint]);
      }
      window.loadDoneCallback = () => multispaw();      