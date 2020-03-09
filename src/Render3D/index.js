/* eslint-disable no-console */
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import { URL_3D, URL_3D_FILE } from '../constants';

const fromLL = (lon, lat) => {
  const extent = 20037508.34;
  const x = (lon * extent) / 180;
  let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * extent) / 180;

  return [(x + extent) / (2 * extent), 1 - (y + extent) / (2 * extent)];
};

//! do not remove
// var scaleFactor = 1 / Math.cos(modelOrigin[1] * Math.PI / 180);
// var mercatorExtent = 2 * Math.PI * 6378137;
// var modelScale = 1 / mercatorExtent * scaleFactor;

const fetch3DObjects = async () => {
  const req = await fetch(URL_3D);
  const data = await req.json();
  const object3D = data.reduce((acc, o) => {
    const {
      title, lat, lng, visible, gltf_file_id, viewport 
    } = o;
    const { ambient_light, rendering_mode, transform } = viewport;
    const {
      translate_z, rotate_x, rotate_y, rotate_z, scale 
    } = transform;

    if (!visible) return acc;
    if (!gltf_file_id) return acc;
    if (!lat || !lng) return acc;
    if (!translate_z || !rotate_y || !scale) return acc;

    acc.push({
      name: title,
      path: `${URL_3D_FILE}${gltf_file_id}`,
      ambientLight: ambient_light || 0.5,
      renderingMode: rendering_mode || '3d',
      transform: {
        translateX: fromLL(lng, lat)[0],
        translateY: fromLL(lng, lat)[1],
        translateZ: translate_z,
        rotateX: rotate_x || Math.PI / 2,
        rotateY: rotate_y,
        rotateZ: rotate_z || 0,
        scale
      }
    });

    return acc;
  }, []);

  return Promise.resolve(object3D);
};

const addObjectsToMap = async (map, cb) => {
  THREE.Cache.enabled = true;
  let glCtx = null;
  const loader = new GLTFLoader();
  const renderObjects = await fetch3DObjects();
  renderObjects.map((object) => {
    const {
      transform, renderingMode, name, path, ambientLight, withDirectionalLight 
    } = object;
    if (map.getLayer(name)) return;
    const camera = new THREE.Camera();
    const scene = new THREE.Scene();

    const objectToAdd = {
      id: name,
      type: 'custom',
      renderingMode,
      onAdd(_, gl) {
        if (!glCtx) {
          glCtx = gl;
        }

        const dL = new THREE.AmbientLight(0xffffff, ambientLight);
        scene.add(dL);
        if (withDirectionalLight) {
          const dL1 = new THREE.DirectionalLight(0xffffff, 0.1);
          dL1.position.set(1, 0, 0).normalize();
          scene.add(dL1);
        }
        const dL2 = new THREE.DirectionalLight(0xffffff, 0.2);
        dL2.position.set(0, 1, 0).normalize();
        scene.add(dL2);

        const dL4 = new THREE.DirectionalLight(0xffffff, 0.1);
        dL4.position.set(-1, 1, 0).normalize();
        scene.add(dL4);
        loader.load(path, (gltf) => {
          scene.add(gltf.scene);
        });

        const oldLogFunction = console.log;
        console.log = () => {};
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: glCtx,
          antialias: false
        });
        console.log = oldLogFunction;

        this.renderer.gammaOutput = false;

        this.renderer.autoClear = false;
      },
      render(gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), transform.rotateX);
        const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), transform.rotateY);
        const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), transform.rotateZ);

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(transform.translateX, transform.translateY, transform.translateZ)
          .scale(new THREE.Vector3(transform.scale, -transform.scale, transform.scale))
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        camera.projectionMatrix.elements = matrix;
        camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(scene, camera);
        map.triggerRepaint();
      }
    };
    map.addLayer(objectToAdd);
  });
  cb();
};

const objects3DRender = map => new Promise((resolve, reject) => {
  addObjectsToMap(map, () => {
    resolve();
  });
});

export default objects3DRender;
