<template>
  <div class="home">
    <!-- img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" / -->
    <canvas id="canvas"></canvas>
    <div id="control">
      <div>{{ upDownCount }}</div>
      <div>{{ upDownStatus ? '立ち上がりました！' : 'しゃがみました！' }}</div>
      <div>{{ myLineId }}</div>
      <div>
        <input v-model="yourLineId" />
      </div>
      <div>
        <button v-on:click="connect">Connect!</button>
      </div>
      <div>
        <a href="javascript:window.location.reload(true);">reload</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as THREE from 'three';
// import CANNON from 'cannon';
import threeOrbitControls from 'three-orbit-controls';
import Peer from 'skyway-js';
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

    const upDownFlag = true;
    const upDownStatus: boolean = null;
    const upDownCount = 0;

    const myLineId = '';
    // const yourLineId = '';
    const connecting = false;
    const connection = null;
    const peer = new Peer({
      key: 'af9431e2-f5ef-434f-a9df-6626065e6fe6',
      debug: 3,
    });

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
      upDownFlag,
      upDownStatus,
      upDownCount,
      myLineId,
      connecting,
      connection,
      peer,
      // world,
      // phyBox,
    };
  },
  mounted() {
    (document.getElementsByClassName(
      'home'
    )[0] as HTMLElement).style.height = `${window.innerHeight}px`;
    const canvasSize = this.canvasSizeManager({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.peer.on('open', () => {
      this.myLineId = this.peer.id;
    });

    this.peer.on('error', err => {
      throw err;
    });

    this.peer.on('connection', connection => {
      connection.on('open', () => {
        this.connection = connection;
        this.connecting = true;
      });

      connection.on('data', this.webRtcHandler);
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

    window.addEventListener('resize', this.resized);
    window.addEventListener('devicemotion', this.devicemotionHandler);
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      // this.world.step(1 / 60);
      // this.box.position.copy(this.phyBox.position);
      // this.box.quaternion.copy(this.phyBox.quaternion);

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
      if (!this.helvetikerRegularFont) {
        return;
      }
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
      if (!this.helvetikerRegularFont) {
        return;
      }
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
    async devicemotionHandler(event) {
      const y = event.acceleration.y;

      if (!this.upDownFlag) {
        return;
      }
      this.upDownFlag = false;
      console.log(111);

      await delay(300);
      console.log(222);
      if (parseInt(y.toFixed(2)) > 0.6) {
        console.log(333);
        this.whenUpped();
      }

      await delay(300);
      if (parseInt(y.toFixed(2)) < -0.5) {
        console.log(444);
        ++this.upDownCount;
        this.whenDowned();
      }

      this.upDownFlag = true;
    },
    whenUpped() {
      this.upDownStatus = true;
      this.whenMoved();
      // if (this.myLineId === '') {
      //   return;
      // }

      // this.connection.send()
    },
    whenDowned() {
      this.upDownStatus = false;
      this.whenMoved();
      // if (this.myLineId === '') {
      //  return;
      // }

      // this.connection.send()
    },
    whenMoved() {
      this.updateBox({
        lineId: 'test',
        boxOp: {
          name: 'waricoma',
          icon:
            'https://pbs.twimg.com/profile_images/796716956585902081/ml1P8jqU.jpg',
          total: this.upDownCount,
          x: 0,
          z: 0,
          upDown: this.upDownStatus,
        },
      });
    },
    webRtcHandler(data) {
      console.log(data);
    },
    connect() {
      console.log(111);
      /*
      this.peer.on('open', () => {
        this.connection = this.peer.connect(this.yourLineId);

        this.connection.on('open', () => {
          console.log(100);
        });
      });
      */
    },
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
