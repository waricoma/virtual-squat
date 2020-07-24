<template>
  <div class="home">
    <!-- img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" / -->
    <canvas id="canvas"></canvas>
    <div id="control">
      control
      <div id="result_acc"></div>
      <br />
      <div id="count"></div>
      <br />
      <div id="status"></div>
      <br />
      <div id="result_gyro"></div>
      <a href="javascript:window.location.reload(true);">reload</a>
     </div>
  </div>
</template>

<script lang="ts">
import * as THREE from 'three';
// import CANNON from 'cannon';
import threeOrbitControls from 'three-orbit-controls';
import delay from 'delay';

const OrbitControls = threeOrbitControls(THREE);

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

type BoxOp = {
  name: string;
  icon: string;
  total: number;
  x: number;
  z: number;
  upDown: boolean;
};

type BoxMap = {
  [key: string]: {
    boxOp: BoxOp;
    box: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  };
};

export default {
  name: 'Home',
  components: {
    /* HelloWorld, */
  },
  data() {
    const scene = new THREE.Scene();
    const renderer = null;
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const light = new THREE.DirectionalLight(0xffffff);

    const blueMaterial = new THREE.MeshStandardMaterial({
      color: 0x0097e6,
    });
    const grayMaterial = new THREE.MeshStandardMaterial({
      color: 0x7f8c8d,
    });

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const box = new THREE.Mesh(boxGeometry, blueMaterial);
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const plane = new THREE.Mesh(planeGeometry, grayMaterial);

    const boxMap: BoxMap = {};

    const fontLoader = new THREE.FontLoader();
    const helvetikerRegularFont = null;

    const uppedKeyA = false;
    const uppedKeyB = false;

    /*
    const world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 8;
    world.solver.tolerance = 0.1;

    const cannonBox = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    const phyBox = new CANNON.Body({ mass: 1, shape: cannonBox });
    phyBox.angularVelocity.set(0, 5, 10);
    phyBox.angularDamping = 0.1;
    world.add(phyBox);

    const cannonPlane = new CANNON.Plane();
    const phyPlane = new CANNON.Body({ mass: 0, shape: cannonPlane });
    phyPlane.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );
    world.add(phyPlane);
    */

    return {
      scene,
      renderer,
      camera,
      light,
      blueMaterial,
      boxGeometry,
      // boxMaterial,
      // box,
      boxMap,
      plane,
      OrbitControls,
      fontLoader,
      helvetikerRegularFont,
      // world,
      // phyBox,
      uppedKeyA,
      uppedKeyB,
    };
  },
  mounted() {
    let count = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let flag = true;

    window.addEventListener('devicemotion', async event => {
      x = event.accelerationIncludingGravity.x;
      y = event.acceleration.y;
      z = event.accelerationIncludingGravity.z;

      const result1 = document.getElementById('result_acc');
      result1.innerHTML = `
    重力加速度<br />
    X：${x.toFixed(2)}(m/s^2)<br />
    Y：${y.toFixed(2)}(m/s^2)<br />
    Z：${z.toFixed(2)}(m/s^2)<br />
    `;

      const countTarget = document.getElementById('count');
      const statusTarget = document.getElementById('status');

      if (!flag) {
        return;
      }

      flag = false;

      await delay(300);
      // しゃがみ
      if (parseInt(y.toFixed(2)) > 0.6) {
        statusTarget.innerHTML = 'しゃがみました！';
      }
      await delay(300);
      // 立ち上がり
      if (parseInt(y.toFixed(2)) < -0.5) {
        count++;
        countTarget.innerHTML = Math.floor(count) + ' 回';
        statusTarget.innerHTML = '立ち上がりました！';
      }
      flag = true;
    });
  
    (document.getElementsByClassName(
      'home'
    )[0] as HTMLElement).style.height = `${window.innerHeight}px`;
    const canvasSize = this.canvasSizeManager({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.fontLoader.load(
      './helvetiker_regular.typeface.json',
      helvetikerRegularFont => {
        this.helvetikerRegularFont = helvetikerRegularFont;
      }
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
    });
    this.renderer.setSize(canvasSize.width, canvasSize.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect = canvasSize.width / canvasSize.height;
    this.camera.updateProjectionMatrix();

    this.camera.position.set(0, 2, 2);
    this.light.intensity = 2;
    this.light.position.set(1, 1, 1);
    this.scene.updateMatrixWorld(true);
    this.scene.background = new THREE.Color(0xf1f2f6);
    this.plane.rotation.x = -90 * (Math.PI / 180);
    // this.box.position.set(0, 1, 0);
    this.scene.add(this.plane);
    // this.scene.add(this.box);
    this.scene.add(this.light);

    new OrbitControls(this.camera, this.renderer.domElement);
    this.animate();

    window.addEventListener('keyup', this.keyUp);
    window.addEventListener('resize', this.resized);
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      // this.world.step(1 / 60);
      // this.box.position.copy(this.phyBox.position);
      // this.box.quaternion.copy(this.phyBox.quaternion);

      if (this.uppedKeyA) {
        this.addBox({
          lineId: 'test',
          boxOp: {
            name: 'waricoma',
            icon:
              'https://pbs.twimg.com/profile_images/796716956585902081/ml1P8jqU.jpg',
            total: 10,
            x: 3,
            z: 5,
            upDown: true,
          },
        });
        this.uppedKeyA = false;
      }

      if (this.uppedKeyB) {
        this.updateBox({
          lineId: 'test',
          boxOp: {
            name: 'waricoma',
            icon:
              'https://pbs.twimg.com/profile_images/796716956585902081/ml1P8jqU.jpg',
            total: 11,
            x: 3,
            z: 5,
            upDown: false,
          },
        });
        this.uppedKeyB = false;
      }

      this.renderer.render(this.scene, this.camera);
    },
    resized() {
      (document.getElementsByClassName(
        'home'
      )[0] as HTMLElement).style.height = `${window.innerHeight}px`;
      const canvasSize = this.canvasSizeManager({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(canvasSize.width, canvasSize.height);
      this.camera.aspect = canvasSize.width / canvasSize.height;
      this.camera.updateProjectionMatrix();
    },
    keyUp(e) {
      if (e.code === 'KeyA') {
        this.uppedKeyA = true;
      }
      if (e.code === 'KeyB') {
        this.uppedKeyB = true;
      }
    },
    canvasSizeManager(winSize: {
      width: number;
      height: number;
    }): { width: number; height: number } {
      const result = { width: 0, height: 0 };

      /* PC */
      if (winSize.width >= 992) {
        result.width = winSize.width * 0.7;
        result.height = winSize.height;
      }

      /* Tablet */
      if (winSize.width <= 991.98) {
        result.width = winSize.width * 0.7;
        result.height = winSize.height;
      }

      /* horizontal SP */
      if (winSize.width <= 767.98) {
        result.width = winSize.width * 0.7;
        result.height = winSize.height;
      }

      /* SP */
      if (winSize.width <= 575.98) {
        result.width = winSize.width;
        result.height = winSize.height * 0.7;
      }

      return result;
    },
    addBox(options: { lineId: string; boxOp: BoxOp }) {
      if (options.lineId in this.boxMap) {
        return;
      }

      const iconTexture = new THREE.TextureLoader().load(options.boxOp.icon);
      const iconMaterial = new THREE.MeshBasicMaterial({ map: iconTexture });

      const draft = {
        boxOp: options.boxOp,
        box: new THREE.Mesh(this.boxGeometry, iconMaterial),
        total: new THREE.Mesh(
          new THREE.TextGeometry(`${options.boxOp.total}`, {
            font: this.helvetikerRegularFont,
            size: 0.5,
            height: 0.5,
            curveSegments: 0.5,
          }),
          this.blueMaterial
        ),
      };
      this.boxMap[options.lineId] = draft;

      this.boxMap[options.lineId].box.position.set(
        options.boxOp.x,
        options.boxOp.upDown ? 1 : 0.5,
        options.boxOp.z
      );
      this.boxMap[options.lineId].total.position.set(
        options.boxOp.x - 0.5,
        options.boxOp.upDown ? 2 : 1.5,
        options.boxOp.z - 0.5
      );

      this.scene.add(this.boxMap[options.lineId].box);
      this.scene.add(this.boxMap[options.lineId].total);
    },
    updateBox(options: { lineId: string; boxOp: BoxOp }) {
      this.addBox(options);

      this.boxMap[options.lineId].box.position.set(
        options.boxOp.x,
        options.boxOp.upDown ? 1 : 0.5,
        options.boxOp.z
      );

      this.scene.remove(this.boxMap[options.lineId].total);
      this.boxMap[options.lineId].total = new THREE.Mesh(
        new THREE.TextGeometry(`${options.boxOp.total}`, {
          font: this.helvetikerRegularFont,
          size: 0.5,
          height: 0.5,
          curveSegments: 0.5,
        }),
        this.blueMaterial
      );

      this.boxMap[options.lineId].total.position.set(
        options.boxOp.x - 0.5,
        options.boxOp.upDown ? 2 : 1.5,
        options.boxOp.z - 0.5
      );

      this.scene.add(this.boxMap[options.lineId].box);
      this.scene.add(this.boxMap[options.lineId].total);
    },
};
</script>

<style lang="scss" scoped>
#canvas {
  position: absolute;
  top: 0px;
  left: 0px;
}

#control {
  position: absolute;
  padding: 0px;
  border: 1px solid;
  box-sizing: border-box;
}

/* PC */
@media (min-width: 992px) {
  #canvas {
    width: 70%;
    height: 100%;
  }

  #control {
    left: 70%;
    width: 30%;
    height: 100%;
  }
}

/* Tablet */
@media (max-width: 991.98px) {
  #canvas {
    width: 70%;
    height: 100%;
  }

  #control {
    left: 70%;
    width: 30%;
    height: 100%;
  }
}

/* horizontal SP */
@media (max-width: 767.98px) {
  #canvas {
    width: 70%;
    height: 100%;
  }

  #control {
    left: 70%;
    width: 30%;
    height: 100%;
  }
}

/* SP */
@media (max-width: 575.98px) {
  #canvas {
    width: 100%;
    height: 70%;
  }

  #control {
    left: 0px;
    top: 70%;
    width: 100%;
    height: 30%;
  }
}
</style>
