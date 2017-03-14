
function createLegSegment(startRadius, endRadius, height, antData){
    const legSegment = new THREE.Group();
    const joint = createSphere(startRadius, antData.jointColor);
    const segment = createCylinder(startRadius, endRadius, height, antData.color); 
    segment.position.set(height/2.0, 0, 0);
    segment.rotation.set(aToR(90), 0, aToR(90));
    legSegment.add(joint);
    legSegment.add(segment);
    return legSegment;
}

function createLeg(antData, legData, name){
    const leg = new THREE.Group();
    const segment1 = createLegSegment(3, 2, 30, antData);
    const segment2group = new THREE.Group();
    const segment2 = createLegSegment(2, 1, 40, antData);
    const segment3 = createLegSegment(1, 1, 20, antData);
    segment3.position.set(40, 0, 0);
    segment3.rotation.set(
        legData.lower.x,
        legData.lower.y,
        legData.lower.z
      );
    segment2group.position.set(30, 0, 0);
    segment2group.rotation.set(
        legData.middle.x,
        legData.middle.y,
        legData.middle.z
      );
    leg.rotation.set(
        legData.upper.x,
        legData.upper.y,
        legData.upper.z
      );
    segment2group.add(segment2);
    segment2group.add(segment3); 
    leg.add(segment1);
    leg.add(segment2group);
    if (name !== undefined){
      leg.name = name.UPPER;
      segment2group.name = name.MIDDLE;
      segment3.name = name.LOWER;
    }
    return leg;
}

function createAntenna(antData, antennaData){
    const antenna = new THREE.Group();
    const segment1 = createLegSegment(1, 0.5, 40, antData);
    const segment2 = createLegSegment(0.5, 0.5, 30, antData);
    segment2.position.set(40, 0, 0);
    segment2.rotation.set(
        antennaData.lower.x,
        antennaData.lower.y,
        antennaData.lower.z
      );
    antenna.rotation.set(
        antennaData.upper.x,
        antennaData.upper.y,
        antennaData.upper.z
      );
    antenna.add(segment1);
    antenna.add(segment2);
    return antenna;
}

function createAntHead(antData){
    const headGroup = new THREE.Group();
    const headJoint = createSphere(2, antData.jointColor);
    const head = createSphere(14, antData.color); 
    head.position.set(14, 5, 0)
    head.scale.set(1.15, 0.6, 0.9);
    const antennaLeft = createAntenna(antData, antData.antennaLeft); 
    antennaLeft.position.set(5, 10, -5);
    const antennaRight = createAntenna(antData, antData.antennaRight); 
    antennaRight.position.set(5, 10, 5);
    headGroup.add(headJoint);
    headGroup.add(head);
    headGroup.add(antennaLeft);
    headGroup.add(antennaRight);
    return headGroup
}

function createAntBody(antData){
    const bodyGroup = new THREE.Group();
    const body = createSphere(20, antData.color);
    body.position.set(0, 0, 0);
    body.scale.set(1.25, 0.5, 0.5);
    body.rotation.z = aToR(20);
    const legLeftFront = createLeg(antData, antData.legLeftFront, NAMES.ANT_LEG_LEFT_FRONT);
    legLeftFront.position.set(10, 0, -9);
    const legLeftMid = createLeg(antData, antData.legLeftMid, NAMES.ANT_LEG_LEFT_MIDDLE);
    legLeftMid.position.set(-5, 0, -11);
    const legLeftBack = createLeg(antData, antData.legLeftBack, NAMES.ANT_LEG_LEFT_BACK);
    legLeftBack.position.set(-15, 0, -8);
    const legRightFront = createLeg(antData, antData.legRightFront, NAMES.ANT_LEG_RIGHT_FRONT);
    legRightFront.position.set(10, 0, 9);
    const legRightMid = createLeg(antData, antData.legRightMid, NAMES.ANT_LEG_RIGHT_MIDDLE);
    legRightMid.position.set(-5, 0, 11);
    const legRightBack = createLeg(antData, antData.legRightBack, NAMES.ANT_LEG_RIGHT_BACK);
    legRightBack.position.set(-15, 0, 8);
    bodyGroup.add(body);
    bodyGroup.add(legLeftFront);
    bodyGroup.add(legLeftMid);
    bodyGroup.add(legLeftBack);
    bodyGroup.add(legRightFront);
    bodyGroup.add(legRightMid);
    bodyGroup.add(legRightBack);
    return bodyGroup;
}

function createAntBack(antData){
    const backGroup = new THREE.Group();
    const backJoint = createSphere(4, antData.jointColor);
    const back = createSphere(19, antData.color);
    back.position.set(-23, 7, 0);
    back.scale.set(1.25, 0.9, 1);
    backGroup.add(back);
    backGroup.add(backJoint);
    return backGroup;
}

function getInitialAntData(){
  return {
      color: 0xcc0000,
      jointColor: 0xffffff,
      position: { x:0, y:35, z:0},
      rotation: { x:0, y:aToR(180), z:0},
      scale: 1, // uniform scale,
      head: { x:0, y:0, z:aToR(-30) },
      back: { x:0, y:0, z:aToR(10) },
      antennaLeft: {
        upper: { x:aToR(-25), y:0, z:aToR(70)},
        lower: { x:0, y:0, z:aToR(-60)}
      },
      antennaRight: {
        upper: { x:aToR(25), y:0, z:aToR(70)},
        lower: { x:0, y:0, z:aToR(-60)}
      },
      legLeftFront: {
        upper: { x:0, y:aToR(45), z:aToR(20)},
        middle: { x:0, y:0, z:aToR(-80)},
        lower: { x:0, y:0, z:aToR(30)},
      },
      legLeftMid: {
        upper: { x:0, y:aToR(100), z:aToR(31)},
        middle: { x:0, y:0, z:aToR(-100)},
        lower: { x:0, y:0, z:aToR(30)},
      },
      legLeftBack: {
        upper: { x:0, y:aToR(135), z:aToR(20)},
        middle: { x:0, y:0, z:aToR(-80)},
        lower: { x:0, y:0, z:aToR(30)},
      },
      legRightFront: {
        upper: { x:0, y:aToR(-45), z:aToR(20)},
        middle: { x:0, y:0, z:aToR(-80)},
        lower: { x:0, y:0, z:aToR(30)},
      },
      legRightMid: {
        upper: { x:0, y:aToR(-100), z:aToR(31)},
        middle: { x:0, y:0, z:aToR(-100)},
        lower: { x:0, y:0, z:aToR(30)},
      },
      legRightBack: {
        upper: { x:0, y:aToR(-135), z:aToR(20)},
        middle: { x:0, y:0, z:aToR(-80)},
        lower: { x:0, y:0, z:aToR(30)},
      }
    };
}

function createAnt(){
    const antData = getInitialAntData();
    const ant = new THREE.Group();
    ant.name = NAMES.ANT;
    ant.position.set(
        antData.position.x,
        antData.position.y,
        antData.position.z
      );
    ant.rotation.set(
        antData.rotation.x,
        antData.rotation.y,
        antData.rotation.z
      );
    ant.scale.set(antData.scale, antData.scale, antData.scale);
    const headGroup = createAntHead(antData);
    headGroup.position.set(23, 10, 0);
    headGroup.rotation.z = antData.head.z;
    const bodyGroup = createAntBody(antData);
    const backGroup = createAntBack(antData);
    backGroup.position.set(-25, -5, 0);
    backGroup.rotation.z = antData.back.z;
    ant.add(bodyGroup);
    ant.add(headGroup);
    ant.add(backGroup);
    return ant;
}

function createSphere(sphereRadius, sphereColor){
    const SEGMENTS = 16;
    const RINGS = 16;
    const sphereMaterial = new THREE.MeshLambertMaterial({color: sphereColor});
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
            sphereRadius,
            SEGMENTS,
            RINGS
        ),
        sphereMaterial
    );

    return sphere;
}

function createCylinder(radiusTop, radiusBottom, height, color){
    const SEGMENTS = 32;
    const material = new THREE.MeshLambertMaterial({color: color});
    const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height,
            SEGMENTS
        ),
        material
    );
    return cylinder;
}

function aToR(n){
  // angle to radians
  return n * Math.PI/180;
}
