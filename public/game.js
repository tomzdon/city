const NORTH = 1,
  EAST = -0.5,
  SOUTH = 2,
  WEST = 0.5,
  LEAP = 240;

var clusterNames = [
  "factory",
  "house2",
  "shoparea1",
  "house",
  "apartments",
  "shops",
  "fastfood",
  "house3",
  "stadium1",
  "gas",
  "supermarket1",
  "coffeeshop",
  "residence",
  "bus",
  "park",
  "supermarket1",
];

let carList = [];

const cluster = [
  { x: 1, z: 0, cluster: "road" },

  { x: 2, z: 2, cluster: clusterNames[0], direction: SOUTH },
  { x: 2, z: 1, cluster: clusterNames[1], direction: SOUTH },
  { x: 2, z: 0, cluster: clusterNames[2], direction: SOUTH },
  { x: 2, z: -1, cluster: clusterNames[3], direction: SOUTH },
  { x: 2, z: -2, cluster: clusterNames[0], direction: SOUTH },
  { x: 2, z: -3, cluster: clusterNames[1], direction: SOUTH },
  { x: 2, z: -4, cluster: clusterNames[2], direction: SOUTH },
  { x: 2, z: -5, cluster: clusterNames[3], direction: SOUTH },

  { x: 1, z: 2, cluster: clusterNames[4], direction: SOUTH },
  { x: 1, z: 1, cluster: clusterNames[7], direction: SOUTH },
  { x: 1, z: 0, cluster: clusterNames[8], direction: SOUTH },
  { x: 1, z: -1, cluster: clusterNames[9], direction: SOUTH },
  { x: 1, z: -2, cluster: clusterNames[4], direction: SOUTH },
  { x: 1, z: -3, cluster: clusterNames[7], direction: SOUTH },
  { x: 1, z: -4, cluster: clusterNames[8], direction: SOUTH },
  { x: 1, z: -5, cluster: clusterNames[9], direction: SOUTH },

  { x: 0, z: 2, cluster: clusterNames[5], direction: SOUTH },
  { x: 0, z: 1, cluster: clusterNames[10], direction: SOUTH },
  { x: 0, z: 0, cluster: clusterNames[12], direction: SOUTH },
  { x: 0, z: -1, cluster: clusterNames[13], direction: SOUTH },
  { x: 0, z: -2, cluster: clusterNames[5], direction: SOUTH },
  { x: 0, z: -3, cluster: clusterNames[10], direction: SOUTH },
  { x: 0, z: -4, cluster: clusterNames[12], direction: SOUTH },
  { x: 0, z: -5, cluster: clusterNames[13], direction: SOUTH },

  { x: -1, z: 2, cluster: clusterNames[6], direction: SOUTH },
  { x: -1, z: 1, cluster: clusterNames[11], direction: SOUTH },
  { x: -1, z: 0, cluster: clusterNames[14], direction: SOUTH },
  { x: -1, z: -1, cluster: clusterNames[15], direction: SOUTH },
  { x: -1, z: -2, cluster: clusterNames[6], direction: SOUTH },
  { x: -1, z: -3, cluster: clusterNames[11], direction: SOUTH },
  { x: -1, z: -4, cluster: clusterNames[14], direction: SOUTH },
  { x: -1, z: -5, cluster: clusterNames[15], direction: SOUTH },

  { x: -2, z: 2, cluster: clusterNames[0], direction: SOUTH },
  { x: -2, z: 1, cluster: clusterNames[1], direction: SOUTH },
  { x: -2, z: 0, cluster: clusterNames[2], direction: SOUTH },
  { x: -2, z: -1, cluster: clusterNames[3], direction: SOUTH },
  { x: -2, z: -2, cluster: clusterNames[0], direction: SOUTH },
  { x: -2, z: -3, cluster: clusterNames[1], direction: SOUTH },
  { x: -2, z: -4, cluster: clusterNames[2], direction: SOUTH },
  { x: -2, z: -5, cluster: clusterNames[3], direction: SOUTH },

  { x: -3, z: 2, cluster: clusterNames[4], direction: SOUTH },
  { x: -3, z: 1, cluster: clusterNames[7], direction: SOUTH },
  { x: -3, z: 0, cluster: clusterNames[8], direction: SOUTH },
  { x: -3, z: -1, cluster: clusterNames[9], direction: SOUTH },
  { x: -3, z: -2, cluster: clusterNames[4], direction: SOUTH },
  { x: -3, z: -3, cluster: clusterNames[7], direction: SOUTH },
  { x: -3, z: -4, cluster: clusterNames[8], direction: SOUTH },
  { x: -3, z: -5, cluster: clusterNames[9], direction: SOUTH },

  { x: -4, z: 2, cluster: clusterNames[5], direction: SOUTH },
  { x: -4, z: 1, cluster: clusterNames[10], direction: SOUTH },
  { x: -4, z: 0, cluster: clusterNames[12], direction: SOUTH },
  { x: -4, z: -1, cluster: clusterNames[13], direction: SOUTH },
  { x: -4, z: -2, cluster: clusterNames[5], direction: SOUTH },
  { x: -4, z: -3, cluster: clusterNames[10], direction: SOUTH },
  { x: -4, z: -4, cluster: clusterNames[12], direction: SOUTH },
  { x: -4, z: -5, cluster: clusterNames[13], direction: SOUTH },

  { x: -5, z: 2, cluster: clusterNames[6], direction: SOUTH },
  { x: -5, z: 1, cluster: clusterNames[11], direction: SOUTH },
  { x: -5, z: 0, cluster: clusterNames[14], direction: SOUTH },
  { x: -5, z: -1, cluster: clusterNames[15], direction: SOUTH },
  { x: -5, z: -2, cluster: clusterNames[6], direction: SOUTH },
  { x: -5, z: -3, cluster: clusterNames[11], direction: SOUTH },
  { x: -5, z: -4, cluster: clusterNames[14], direction: SOUTH },
  { x: -5, z: -5, cluster: clusterNames[15], direction: SOUTH },
];
class Game {
  constructor() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    this.modes = Object.freeze({
      NONE: Symbol("none"),
      PRELOAD: Symbol("preload"),
      INITIALISING: Symbol("initialising"),
      CREATING_LEVEL: Symbol("creating_level"),
      ACTIVE: Symbol("active"),
      GAMEOVER: Symbol("gameover"),
    });
    this.mode = this.modes.NONE;

    this.container;
    this.player;
    this.cameras;
    this.camera;
    this.scene;
    this.renderer;
    this.animations = {};
    this.assetsPath = "assets/";
    this.viewSmallMap = true;
    this.clicable = [];
    this.onMouseMove = this.onMouseMove.bind(this);
    this.speechMarket = 0;
    this.textMarket = 0;
    this.speechStadium = 0;
    this.textStadium = 0;
    this.speechPost = 0;
    this.textPost = 0;
    this.imagesStadium = [];
    this.imagesMarket = [];
    this.imagesPost = [];
    this.positionStadium = {};
    this.positionPost = {};
    this.positionMarket = {};

    this.remotePlayers = [];
    this.remoteColliders = [];
    this.initialisingPlayers = [];
    this.remoteData = [];

    this.messages = {
      text: ["Welcome to Blockland", "GOOD LUCK!"],
      index: 0,
    };
    document.getElementById("target").onclick = function () {
      game.switchCamera();
    };
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        this.imagesMarket.push(...data);
      });
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        this.imagesStadium.push(...data);
      });

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        this.imagesPost.push(...data);
      });

    this.container = document.createElement("div");
    this.container.style.height = "100%";
    document.body.appendChild(this.container);

    const sfxExt = SFX.supportsAudioType("mp3") ? "mp3" : "ogg";

    const game = this;
    this.anims = [
      "Walking",
      "Walking Backwards",
      "Turn",
      "Running",
      "Pointing",
      "Talking",
      "Pointing Gesture",
    ];

    const options = {
      assets: [
        `${this.assetsPath}images/nx.jpg`,
        `${this.assetsPath}images/px.jpg`,
        `${this.assetsPath}images/ny.jpg`,
        `${this.assetsPath}images/py.jpg`,
        `${this.assetsPath}images/nz.jpg`,
        `${this.assetsPath}images/pz.jpg`,
      ],
      oncomplete: function () {
        game.init();
      },
    };

    this.anims.forEach(function (anim) {
      console.log(anim);
      options.assets.push(`${game.assetsPath}fbx/anims/${anim}.fbx`);
    });
    options.assets.push(`${game.assetsPath}fbx/town.fbx`);

    this.mode = this.modes.PRELOAD;

    this.clock = new THREE.Clock();

    const preloader = new Preloader(options);

    window.onError = function (error) {
      console.error(JSON.stringify(error));
    };
  }

  switchCamera() {
    this.viewSmallMap = false;
  }

  initSfx() {
    this.sfx = {};
    this.sfx.context = new (window.AudioContext || window.webkitAudioContext)();
    this.sfx.gliss = new SFX({
      context: this.sfx.context,
      src: {
        mp3: `${this.assetsPath}sfx/gliss.mp3`,
        ogg: `${this.assetsPath}sfx/gliss.ogg`,
      },
      loop: false,
      volume: 0.3,
    });
  }

  set activeCamera(object) {
    this.cameras.active = object;
  }

  init() {
    this.mode = this.modes.INITIALISING;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      10,
      200000
    );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x00a0f0);

    const ambient = new THREE.AmbientLight(0xaaaaaa);
    this.scene.add(ambient);

    const light = new THREE.DirectionalLight(0xaaaaaa);
    light.position.set(30, 100, 40);
    light.target.position.set(0, 0, 0);

    light.castShadow = true;

    const lightSize = 500;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
    light.shadow.camera.right = light.shadow.camera.top = lightSize;

    light.shadow.bias = 0.0039;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    this.sun = light;
    this.scene.add(light);
    let light1 = new THREE.HemisphereLight(0xffffff, 0x444444);
    light1.position.set(0, 200, 0);
    this.scene.add(light1);
    light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(0, 200, 100);
    light1.castShadow = true;
    light1.shadow.mapSize.width = 2048;
    light1.shadow.mapSize.height = 2048;
    light1.shadow.camera.top = 3000;
    light1.shadow.camera.bottom = -3000;
    light1.shadow.camera.left = -3000;
    light1.shadow.camera.right = 3000;
    light1.shadow.camera.far = 3000;
    this.scene.add(light1);

    // model
    const loader = new THREE.FBXLoader();
    const loaderGLTF = new THREE.GLTFLoader();
    const game = this;
    this.player = new PlayerLocal(this);
    setTimeout(() => {
      cluster.forEach((cls) => game.loadCluster(cls));
      game.loadCars({ x: 1, z: 0, cluster: "cars" });
    }, 2000);

    this.speechBubble = new SpeechBubble(this, "", 150);
    this.speechBubble.mesh.position.set(0, 50, 0);

    this.joystick = new JoyStick({
      onMove: this.playerControl,
      game: this,
    });

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    if ("ontouchstart" in window) {
      window.addEventListener(
        "touchdown",
        (event) => game.onMouseDown(event),
        false
      );
    } else {
      this.container.addEventListener(
        "mousedown",
        (event) => game.onMouseDown(event),
        false
      );
    }
    this.container.addEventListener("mousedown", this.onMouseMove, false);
    window.addEventListener("resize", () => game.onWindowResize(), false);
  }

  loadCluster({ x, z, cluster, direction }) {
    const game = this;
    let loader = new THREE.GLTFLoader();
    loader.load(`${this.assetsPath}clusters/${cluster}.glb`, (gltf) => {
      gltf.scene.scale.set(50, 50, 50);
      gltf.scene.traverse(function (child) {
        if (child.name == "stadium_speech") {
          game.positionStadium = {
            x: -8000,
            y: 0,
            z: 1000,
          };
        }
        if (child.name == "speech_shop") {
          console.log(gltf.scene);
          game.positionPost = {
            x: 6000,
            y: 0,
            z: 0,
          };
        }
        if (child.name == "Mesh_0") {
          game.positionMarket = {
            x: 0,
            y: 0,
            z: 3000,
          };
        }
        if (child.isMesh) {
          if (child.name == "Mesh_0" && game.speechMarket == 0) {
            game.clicable.push(child);
            game.speechMarket++;
            gltf.scene.name = "stadium";
          } else if (child.name == "Mesh_0") {
            child.visible = false;
          }

          if (child.name == "text" && game.textMarket == 0) {
            game.clicable.push(child);
            game.textMarket++;
          } else if (child.name == "text") {
            child.visible = false;
          }

          if (child.name == "stadium_speech" && game.speechStadium == 2) {
            game.clicable.push(child);
            game.speechStadium++;
          } else if (child.name == "stadium_speech") {
            child.visible = false;
            game.speechStadium++;
          }

          if (child.name == "stadium_text" && game.textStadium == 2) {
            game.clicable.push(child);
            game.textStadium++;
            gltf.scene.name = "stadium";
          } else if (child.name == "stadium_text") {
            child.visible = false;
            game.textStadium++;
          }

          if (child.name == "speech_shop" && game.speechPost == 0) {
            game.clicable.push(child);
            game.speechPost++;
            gltf.scene.name = "stadium";
          } else if (child.name == "speech_shop") {
            child.visible = false;
            game.speechPost++;
          }

          if (child.name == "speech_text" && game.textPost == 0) {
            game.clicable.push(child);
            game.textPost++;
          } else if (child.name == "speech_text") {
            child.visible = false;
            game.textPost++;
          }
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      gltf.scene.position.set(x * 3000, 0, z * 3000);
      // gltf.scene.scale.set(8.8, 8.8, 8.8);
      if (direction) gltf.scene.rotation.y = Math.PI * direction;
      else if (direction === EAST) gltf.scene.position.x += 1000;
      else if (direction === WEST) gltf.scene.position.z += 1000;
      else if (direction === NORTH)
        gltf.scene.position.set(
          gltf.scene.position.x + 1000,
          0,
          gltfbj.scene.position.z + 1000
        );
      if (gltf.scene.name.includes("stadium")) {
        game.loadCubeStadium(gltf, game);
      }
      if (gltf.scene.name.includes("speech_shop")) {
        game.loadCubePost(gltf, game);
      }

      if (gltf.scene.name.includes("Mesh_0")) {
        game.loadCubeMarket(gltf, game);
      }

      game.scene.add(gltf.scene);
      const tloader = new THREE.CubeTextureLoader();
      tloader.setPath(`${game.assetsPath}/images/`);

      var textureCube = tloader.load([
        "px.jpg",
        "nx.jpg",
        "py.jpg",
        "ny.jpg",
        "pz.jpg",
        "nz.jpg",
      ]);

      game.scene.background = textureCube;
      if (game.anims.length > 0) {
        game.loadNextAnim();
      }
    });
  }
  loadCubeStadium(gltf, game) {
    let pos = 200;
    for (let i = 0; i < 4; i++) {
      const loader = new THREE.TextureLoader();
      // loader.setCrossOrigin('')
      const mapOverlay = loader.load(game.imagesStadium[i].url);
      let dice = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200, 1, 1, 1),

        new THREE.MeshLambertMaterial({
          map: mapOverlay,
        })
      );
      dice.position.set(
        gltf.scene.position.x + pos,
        gltf.scene.position.y,
        gltf.scene.position.z
      );
      game.scene.add(dice);
      pos += 220;
    }
  }

  loadCubeMarket(gltf, game) {
    let pos = 200;
    for (let i = 0; i < 4; i++) {
      const loader = new THREE.TextureLoader();
      const mapOverlay = loader.load(game.imagesMarket[i].url);
      let dice = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200, 1, 1, 1),

        new THREE.MeshLambertMaterial({
          map: mapOverlay,
        })
      );
      dice.position.set(
        gltf.scene.position.x + pos,
        gltf.scene.position.y,
        gltf.scene.position.z
      );
      game.scene.add(dice);
      pos += 220;
    }
  }

  loadCubePost(gltf, game) {
    let pos = 200;
    for (let i = 0; i < 4; i++) {
      const loader = new THREE.TextureLoader();
      const mapOverlay = loader.load(game.imagesPost[i].url);
      let dice = new THREE.Mesh(
        new THREE.BoxGeometry(200, 200, 200, 1, 1, 1),

        new THREE.MeshLambertMaterial({
          map: mapOverlay,
        })
      );
      dice.position.set(
        gltf.scene.position.x + pos,
        gltf.scene.position.y,
        gltf.scene.position.z
      );
      game.scene.add(dice);
      pos += 220;
    }
  }

  loadCars({ x, z, cluster, direction }) {
    let loader = new THREE.GLTFLoader();
    const game = this;
    loader.load(`${this.assetsPath}clusters/${cluster}.gltf`, (gltf) => {
      gltf.scene.scale.set(50, 50, 50);
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });

      gltf.scene.position.set(x * 3000, 0, z * 3000);

      if (direction) gltf.scene.rotation.y = Math.PI * direction;
      else if (direction === EAST) gltf.scene.position.x += 1000;
      else if (direction === WEST) gltf.scene.position.z += 1000;
      else if (direction === NORTH)
        gltf.scene.position.set(
          gltf.scene.position.x + 1000,
          0,
          ogltfbj.scene.position.z + 1000
        );

      game.scene.add(gltf.scene);

      gltf.scene.children.forEach((e) => {
        e.distance = 0;
        e.maxSpeed = 0.3;
        e.speed = e.maxSpeed;
        e.r = new THREE.Raycaster(
          new THREE.Vector3(e.position.x, 2, e.position.z),
          new THREE.Vector3(e.userData.x, 0, e.userData.z),
          5,
          15
        );
        carList.push(e);
      });
    });
  }

  onMouseMove(e) {
    e.preventDefault();
    console.log("jestem");
    var raycaster = new THREE.Raycaster(); // create once
    var mouse = new THREE.Vector2(); // create once
    let containerWidth = window.innerWidth;
    let containerHeight = window.innerHeight;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    let camera2 = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      92900
    );
    this.scene.add(camera2);
    camera2.position.set(-2180, 6650, 19690);
    camera2.parent = this.scene;
    let camera = new THREE.PerspectiveCamera(
      70,
      containerWidth / containerHeight,
      1,
      100000
    );
    camera.position.set(-2180, 6650, 19690);
    camera.lookAt(this.scene.position);

    var raycaster = new THREE.Raycaster(); // create once
    raycaster.setFromCamera(mouse, camera);
    console.log(this.clicable);
    var intersects = raycaster.intersectObjects(this.clicable, true); // Circle element which you want to identify

    if (intersects.length > 0) {
      console.log("kliklem", intersects[0].object.name);
      console.log("kliklem1", this.positionStadium, this.scene);
      if (intersects[0].object.name == "stadium_speech") {
        this.scene.children.forEach((ele) => {
          if (ele.name == "Person") {
            ele.position.x = this.positionStadium.x;
            ele.position.y = 0;
            ele.position.z = this.positionStadium.z;
          }
        });
      }
      if (intersects[0].object.name == "speech_shop") {
        this.scene.children.forEach((ele) => {
          if (ele.name == "Person") {
            ele.position.x = this.positionPost.x;
            ele.position.y = 0;
            ele.position.z = this.positionPost.z;
          }
        });
      }
      if (intersects[0].object.name == "Mesh_0") {
        this.scene.children.forEach((ele) => {
          if (ele.name == "Person") {
            ele.position.x = this.positionMarket.x;
            ele.position.y = 0;
            ele.position.z = this.positionMarket.z;
          }
        });
      }

      this.viewSmallMap = true;
    }
  }

  loadNextAnim() {
    const loader = new THREE.FBXLoader();
    let anim = this.anims.pop();
    const game = this;
    loader.load(`${this.assetsPath}fbx/anims/${anim}.fbx`, function (object) {
      game.player.animations[anim] = object.animations[0];
      if (game.anims.length > 0) {
        game.loadNextAnim(loader);
      } else {
        delete game.anims;
        game.action = "Idle";
        game.mode = game.modes.ACTIVE;
        game.animate();
      }
    });
  }

  playerControl(forward, turn) {
    turn = -turn;

    if (forward > 0.3) {
      if (this.player.action != "Walking" && this.player.action != "Running")
        this.player.action = "Walking";
    } else if (forward < -0.3) {
      if (this.player.action != "Walking Backwards")
        this.player.action = "Walking Backwards";
    } else {
      forward = 0;
      if (Math.abs(turn) > 0.1) {
        if (this.player.action != "Turn") this.player.action = "Turn";
      } else if (this.player.action != "Idle") {
        this.player.action = "Idle";
      }
    }

    if (forward == 0 && turn == 0) {
      delete this.player.motion;
    } else {
      this.player.motion = { forward, turn };
    }

    this.player.updateSocket();
  }

  createCameras() {
    const offset = new THREE.Vector3(0, 80, 0);
    const front = new THREE.Object3D();
    front.position.set(112, 100, 600);
    front.parent = this.player.object;
    const back = new THREE.Object3D();
    back.position.set(0, 1100, -1850);
    back.parent = this.player.object;
    const chat = new THREE.Object3D();
    chat.position.set(0, 600, -950);
    chat.parent = this.player.object;
    const wide = new THREE.Object3D();
    wide.position.set(178, 139, 1665);
    wide.parent = this.player.object;
    const overhead = new THREE.Object3D();
    overhead.position.set(0, 400, 0);
    overhead.parent = this.player.object;
    const collect = new THREE.Object3D();
    collect.position.set(40, 82, 94);
    collect.parent = this.player.object;
    this.cameras = { front, back, wide, overhead, collect, chat };
    this.activeCamera = this.cameras.back;
  }

  showMessage(msg, fontSize = 20, onOK = null) {
    const txt = document.getElementById("message_text");
    txt.innerHTML = msg;
    txt.style.fontSize = fontSize + "px";
    const btn = document.getElementById("message_ok");
    const panel = document.getElementById("message");
    const game = this;
    if (onOK != null) {
      btn.onclick = function () {
        panel.style.display = "none";
        onOK.call(game);
      };
    } else {
      btn.onclick = function () {
        panel.style.display = "none";
      };
    }
    panel.style.display = "flex";
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateRemotePlayers(dt) {
    if (
      this.remoteData === undefined ||
      this.remoteData.length == 0 ||
      this.player === undefined ||
      this.player.id === undefined
    )
      return;

    const newPlayers = [];
    const game = this;
    //Get all remotePlayers from remoteData array
    const remotePlayers = [];
    const remoteColliders = [];

    this.remoteData.forEach(function (data) {
      if (game.player.id != data.id) {
        //Is this player being initialised?
        let iplayer;
        game.initialisingPlayers.forEach(function (player) {
          if (player.id == data.id) iplayer = player;
        });
        //If not being initialised check the remotePlayers array
        if (iplayer === undefined) {
          let rplayer;
          game.remotePlayers.forEach(function (player) {
            if (player.id == data.id) rplayer = player;
          });
          if (rplayer === undefined) {
            //Initialise player
            game.initialisingPlayers.push(new Player(game, data));
          } else {
            //Player exists
            remotePlayers.push(rplayer);
            remoteColliders.push(rplayer.collider);
          }
        }
      }
    });

    this.scene.children.forEach(function (object) {
      if (
        object.userData.remotePlayer &&
        game.getRemotePlayerById(object.userData.id) == undefined
      ) {
        game.scene.remove(object);
      }
    });

    this.remotePlayers = remotePlayers;
    this.remoteColliders = remoteColliders;
    this.remotePlayers.forEach(function (player) {
      player.update(dt);
    });
  }

  onMouseDown(event) {
    if (
      this.remoteColliders === undefined ||
      this.remoteColliders.length == 0 ||
      this.speechBubble === undefined ||
      this.speechBubble.mesh === undefined
    )
      return;

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / this.renderer.domElement.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.remoteColliders);
    const chat = document.getElementById("chat");
    const audioChat = document.getElementById("open-or-join-room");

    if (intersects.length > 0) {
      const object = intersects[0].object;
      const players = this.remotePlayers.filter(function (player) {
        if (player.collider !== undefined && player.collider == object) {
          return true;
        }
      });
      if (players.length > 0) {
        const player = players[0];
        console.log(`onMouseDown: player ${player.id}`);
        this.speechBubble.player = player;
        this.speechBubble.update("");
        this.scene.add(this.speechBubble.mesh);
        this.chatSocketId = player.id;
        chat.style.bottom = "0px";
        audioChat.style.display = 'block'
        this.activeCamera = this.cameras.chat;
      }
    } else {
      //Is the chat panel visible?
      if (
        chat.style.bottom == "0px" &&
        window.innerHeight - event.clientY > 40
      ) {
        console.log("onMouseDown: No player found");
        if (this.speechBubble.mesh.parent !== null)
          this.speechBubble.mesh.parent.remove(this.speechBubble.mesh);
        delete this.speechBubble.player;
        delete this.chatSocketId;
        chat.style.bottom = "-50px";
        audioChat.style.display = 'none'
        
        this.activeCamera = this.cameras.back;
      } else {
        console.log("onMouseDown: typing");
      }
    }
  }

  getRemotePlayerById(id) {
    if (this.remotePlayers === undefined || this.remotePlayers.length == 0)
      return;

    const players = this.remotePlayers.filter(function (player) {
      if (player.id == id) return true;
    });

    if (players.length == 0) return;

    return players[0];
  }

  animate() {
    const game = this;
    const dt = this.clock.getDelta();

    requestAnimationFrame(function () {
      game.animate();
    });

    this.updateRemotePlayers(dt);

    if (this.player.mixer != undefined && this.mode == this.modes.ACTIVE)
      this.player.mixer.update(dt);

    if (this.player.action == "Walking") {
      const elapsedTime = Date.now() - this.player.actionTime;
      if (elapsedTime > 1000 && this.player.motion.forward > 0) {
        this.player.action = "Running";
      }
    }

    if (this.player.motion !== undefined) this.player.move(dt);

    if (
      this.cameras != undefined &&
      this.cameras.active != undefined &&
      this.player !== undefined &&
      this.player.object !== undefined
    ) {
      this.camera.position.lerp(
        this.cameras.active.getWorldPosition(new THREE.Vector3()),
        0.05
      );
      const pos = this.player.object.position.clone();
      if (this.cameras.active == this.cameras.chat) {
        pos.y += 200;
      } else {
        pos.y += 300;
      }
      this.camera.lookAt(pos);
    }

    carList.forEach((car) => {
      car.r.set(
        new THREE.Vector3(car.position.x + 58, 1, car.position.z),
        new THREE.Vector3(car.userData.x, 0, car.userData.z)
      );
      let _NT = car.r.intersectObjects(carList, true);
      if (_NT.length > 0) {
        car.speed = 0;
        return;
      } else {
        car.speed = car.speed < car.maxSpeed ? car.speed + 0.002 : car.speed;

        if (car.position.x < -380) car.position.x += LEAP * 2;
        else if (car.position.x > 100) car.position.x -= LEAP * 2;
        if (car.position.z < -320) car.position.x += LEAP * 2;
        else if (car.position.z > 160) car.position.x -= LEAP * 2;

        car.position.x += car.userData.x * car.speed;
        car.position.z += car.userData.z * car.speed;
      }
    });

    if (this.sun !== undefined) {
      this.sun.position.copy(this.camera.position);
      this.sun.position.y += 10;
    }

    if (this.speechBubble !== undefined)
      this.speechBubble.show(this.camera.position);

    var w = window.innerWidth,
      h = window.innerHeight;

    this.renderer.clearDepth();
    this.renderer.setViewport(0, 0, w, h);
    this.renderer.setScissor(0, 0, w, h);
    this.renderer.setScissorTest(true);

    this.camera.updateProjectionMatrix();
    if (this.viewSmallMap) {
      this.renderer.render(this.scene, this.camera);
    } else {
      let camera2 = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        92900
      );
      this.scene.add(camera2);
      camera2.position.set(-2180, 6650, 19690);
      camera2.parent = this.scene;
      this.renderer.render(this.scene, camera2);
    }

    let mapCamera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -5000,
      10000
    );
    var SCREEN_WIDTH = 240,
      SCREEN_HEIGHT = 160;
    var VIEW_ANGLE = 95,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 0.1,
      FAR = 29000;
    let camera1 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(camera1);
    camera1.position.set(-3910, 6650, 14690);
    camera1.parent = this.scene;
    // camera1.lookAt(this.scene.position);
    mapCamera.up = new THREE.Vector3(0, 0, -1);
    mapCamera.lookAt(new THREE.Vector3(0, -1, 0));
    this.scene.add(mapCamera);
    let mapWidth = 240,
      mapHeight = 160;
    this.renderer.setViewport(w - 260, h - mapHeight - 10, mapWidth, mapHeight);
    this.renderer.setScissor(w - 260, h - mapHeight - 10, mapWidth, mapHeight);
    this.renderer.setScissorTest(true);

    mapCamera.updateProjectionMatrix();
    if (this.viewSmallMap) {
      this.renderer.render(this.scene, camera1, false);
    }
  }
}

class Player {
  constructor(game, options) {
    this.local = true;
    let model, colour;

    const colours = ["Black1", "Brown1", "White1"];
    colour = colours[Math.floor(Math.random() * colours.length)];

    if (options === undefined) {
      const people = ["BeachBabe"];
      model = people[Math.floor(Math.random() * people.length)];
    } else if (typeof options == "object") {
      this.local = false;
      this.options = options;
      this.id = options.id;
      model = options.model;
      colour = options.colour;
    } else {
      model = options;
    }
    this.model = model;
    this.colour = colour;
    this.game = game;
    this.animations = this.game.animations;

    const loader = new THREE.FBXLoader();
    const loader2 = new THREE.FBXLoader();
    const player = this;

    loader.load(`${game.assetsPath}fbx/people/${model}.fbx`, function (object) {
      object.mixer = new THREE.AnimationMixer(object);
      player.root = object;
      player.mixer = object.mixer;

      object.name = "Person";

      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      const textureLoader = new THREE.TextureLoader();
      setTimeout(() => {}, 2000);
      textureLoader.load(
        `${game.assetsPath}images/SimplePeople_${model}_${colour}.png`,
        function (texture) {
          object.traverse(function (child) {
            if (child.isMesh) {
              child.material.map = texture;
            }
          });
        }
      );

      player.object = new THREE.Object3D();
      player.object.position.set(3122, 0, -173);
      player.object.scale.set(0.3, 0.3, 0.3);
      player.object.rotation.set(0, 2.6, 0);

      player.object.add(object);
      player.object.name = "Person";
      if (player.deleted === undefined) game.scene.add(player.object);

      if (player.local) {
        game.createCameras();
        game.sun.target = game.player.object;
        game.animations.Idle = object.animations[0];
        if (player.initSocket !== undefined) player.initSocket();
      } else {
        const geometry = new THREE.BoxGeometry(100, 300, 100);
        const material = new THREE.MeshBasicMaterial({ visible: false });
        const box = new THREE.Mesh(geometry, material);
        box.name = "Collider";
        box.position.set(0, 150, 0);
        player.object.add(box);
        player.collider = box;
        player.object.userData.id = player.id;
        player.object.userData.remotePlayer = true;
        const players = game.initialisingPlayers.splice(
          game.initialisingPlayers.indexOf(this),
          1
        );
        game.remotePlayers.push(players[0]);
      }

      if (game.animations.Idle !== undefined) player.action = "Idle";
    });
  }

  set action(name) {
    //Make a copy of the clip if this is a remote player
    if (this.actionName == name) return;
    const clip = this.local
      ? this.animations[name]
      : THREE.AnimationClip.parse(
          THREE.AnimationClip.toJSON(this.animations[name])
        );
    const action = this.mixer.clipAction(clip);
    action.time = 0;
    this.mixer.stopAllAction();
    this.actionName = name;
    this.actionTime = Date.now();

    action.fadeIn(0.5);
    action.play();
  }

  get action() {
    return this.actionName;
  }

  update(dt) {
    this.mixer.update(dt);

    if (this.game.remoteData.length > 0) {
      let found = false;
      for (let data of this.game.remoteData) {
        if (data.id != this.id) continue;
        //Found the player
        this.object.position.set(data.x, data.y, data.z);
        const euler = new THREE.Euler(data.pb, data.heading, data.pb);
        this.object.quaternion.setFromEuler(euler);
        this.action = data.action;
        found = true;
      }
      if (!found) this.game.removePlayer(this);
    }
  }
}

class PlayerLocal extends Player {
  constructor(game, model) {
    super(game, model);

    const player = this;
    const socket = io();
    socket.on("setId", function (data) {
      player.id = data.id;
      sessionStorage.setItem("userId", data.id);
    });
    socket.on("remoteData", function (data) {
      game.remoteData = data;
    });
    socket.on("deletePlayer", function (data) {
      const players = game.remotePlayers.filter(function (player) {
        if (player.id == data.id) {
          return player;
        }
      });
      if (players.length > 0) {
        let index = game.remotePlayers.indexOf(players[0]);
        if (index != -1) {
          game.remotePlayers.splice(index, 1);
          game.scene.remove(players[0].object);
        } else {
          index = game.initialisingPlayers.indexOf(data.id);
          if (index != -1) {
            const player = game.initialisingPlayers[index];
            player.deleted = true;
            game.initialisingPlayers.splice(index, 1);
          }
        }
      }
    });
    socket.on("chat message", function (data) {
      document.getElementById("chat").style.bottom = "0px";
      const player = game.getRemotePlayerById(data.id);
      game.speechBubble.player = player;
      game.chatSocketId = player.id;
      game.activeCamera = game.cameras.chat;
      game.speechBubble.update(data.message);
    });

    socket.on("chat voice", function (data) {
      const player = game.getRemotePlayerById(data.id);
      sessionStorage.setItem("userIdJoin", data.id);
      $('#join-room').click();
    });

    $("#msg-form").submit(function (e) {
      socket.emit("chat message", {
        id: game.chatSocketId,
        message: $("#m").val(),
      });
      $("#m").val("");
      return false;
    });

    $("#open-or-join-room").click(function (e) {
      socket.emit("chat voice", {
        id: game.chatSocketId,
      });
      return false;
    });

    this.socket = socket;
  }

  initSocket() {
    //console.log("PlayerLocal.initSocket");
    this.socket.emit("init", {
      model: this.model,
      colour: this.colour,
      x: this.object.position.x,
      y: this.object.position.y,
      z: this.object.position.z,
      h: this.object.rotation.y,
      pb: this.object.rotation.x,
    });
  }

  updateSocket() {
    if (this.socket !== undefined) {
      //console.log(`PlayerLocal.updateSocket - rotation(${this.object.rotation.x.toFixed(1)},${this.object.rotation.y.toFixed(1)},${this.object.rotation.z.toFixed(1)})`);
      this.socket.emit("update", {
        x: this.object.position.x,
        y: this.object.position.y,
        z: this.object.position.z,
        h: this.object.rotation.y,
        pb: this.object.rotation.x,
        action: this.action,
      });
    }
  }

  move(dt) {
    const pos = this.object.position.clone();
    pos.y += 60;
    let dir = new THREE.Vector3();
    this.object.getWorldDirection(dir);
    if (this.motion.forward < 0) dir.negate();
    let raycaster = new THREE.Raycaster(pos, dir);
    let blocked = false;
    const colliders = this.game.colliders;

    if (colliders !== undefined) {
      const intersect = raycaster.intersectObjects(colliders);
      if (intersect.length > 0) {
        if (intersect[0].distance < 50) blocked = true;
      }
    }

    if (!blocked) {
      if (this.motion.forward > 0) {
        const speed = this.action == "Running" ? 500 : 150;
        this.object.translateZ(dt * 150);
      } else {
        this.object.translateZ(-dt * 30);
      }
    }

    if (colliders !== undefined) {
      //cast left
      dir.set(-1, 0, 0);
      dir.applyMatrix4(this.object.matrix);
      dir.normalize();
      raycaster = new THREE.Raycaster(pos, dir);

      let intersect = raycaster.intersectObjects(colliders);
      if (intersect.length > 0) {
        if (intersect[0].distance < 50)
          this.object.translateX(100 - intersect[0].distance);
      }

      //cast right
      dir.set(1, 0, 0);
      dir.applyMatrix4(this.object.matrix);
      dir.normalize();
      raycaster = new THREE.Raycaster(pos, dir);

      intersect = raycaster.intersectObjects(colliders);
      if (intersect.length > 0) {
        if (intersect[0].distance < 50)
          this.object.translateX(intersect[0].distance - 100);
      }

      //cast down
      dir.set(0, -1, 0);
      pos.y += 200;
      raycaster = new THREE.Raycaster(pos, dir);
      const gravity = 30;

      intersect = raycaster.intersectObjects(colliders);
      if (intersect.length > 0) {
        const targetY = pos.y - intersect[0].distance;
        if (targetY > this.object.position.y) {
          //Going up
          this.object.position.y = 0.8 * this.object.position.y + 0.2 * targetY;
          this.velocityY = 0;
        } else if (targetY < this.object.position.y) {
          //Falling
          if (this.velocityY == undefined) this.velocityY = 0;
          this.velocityY += dt * gravity;
          this.object.position.y -= this.velocityY;
          if (this.object.position.y < targetY) {
            this.velocityY = 0;
            this.object.position.y = targetY;
          }
        }
      }
    }

    this.object.rotateY(this.motion.turn * dt);

    this.updateSocket();
  }
}

class SpeechBubble {
  constructor(game, msg, size = 1) {
    this.config = {
      font: "Calibri",
      size: 24,
      padding: 10,
      colour: "#222",
      width: 256,
      height: 256,
    };

    const planeGeometry = new THREE.PlaneGeometry(size, size);
    const planeMaterial = new THREE.MeshBasicMaterial();
    this.mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    game.scene.add(this.mesh);

    const self = this;
    const loader = new THREE.TextureLoader();
    loader.load(
      // resource URL
      `${game.assetsPath}images/speech.png`,

      // onLoad callback
      function (texture) {
        // in this example we create the material when the texture is loaded
        self.img = texture.image;
        self.mesh.material.map = texture;
        self.mesh.material.transparent = true;
        self.mesh.material.needsUpdate = true;
        if (msg !== undefined) self.update(msg);
      },

      // onProgress callback currently not supported
      undefined,

      // onError callback
      function (err) {
        console.error("An error happened.");
      }
    );
  }

  update(msg) {
    if (this.mesh === undefined) return;

    let context = this.context;

    if (this.mesh.userData.context === undefined) {
      const canvas = this.createOffscreenCanvas(
        this.config.width,
        this.config.height
      );
      this.context = canvas.getContext("2d");
      context = this.context;
      context.font = `${this.config.size}pt ${this.config.font}`;
      context.fillStyle = this.config.colour;
      context.textAlign = "center";
      this.mesh.material.map = new THREE.CanvasTexture(canvas);
    }

    const bg = this.img;
    context.clearRect(0, 0, this.config.width, this.config.height);
    context.drawImage(
      bg,
      0,
      0,
      bg.width,
      bg.height,
      0,
      0,
      this.config.width,
      this.config.height
    );
    this.wrapText(msg, context);

    this.mesh.material.map.needsUpdate = true;
  }

  createOffscreenCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }

  wrapText(text, context) {
    const words = text.split(" ");
    let line = "";
    const lines = [];
    const maxWidth = this.config.width - 2 * this.config.padding;
    const lineHeight = this.config.size + 8;

    words.forEach(function (word) {
      const testLine = `${line}${word} `;
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth) {
        lines.push(line);
        line = `${word} `;
      } else {
        line = testLine;
      }
    });

    if (line != "") lines.push(line);

    let y = (this.config.height - lines.length * lineHeight) / 2;

    lines.forEach(function (line) {
      context.fillText(line, 128, y);
      y += lineHeight;
    });
  }

  show(pos) {
    if (this.mesh !== undefined && this.player !== undefined) {
      this.mesh.position.set(
        this.player.object.position.x,
        this.player.object.position.y + 180,
        this.player.object.position.z
      );
      this.mesh.lookAt(pos);
    }
  }
}
