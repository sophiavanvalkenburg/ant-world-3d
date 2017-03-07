function createLegSegment(startRadius, endRadius, height, color){
    const legSegment = new THREE.Group();
    const joint = createSphere(startRadius, 0xffffff);
    const segment = createCylinder(startRadius, endRadius, height, color); 
    segment.position.set(height/2.0, 0, 0);
    segment.rotation.set(90 * Math.PI/180, 0, 90 * Math.PI/180);
    legSegment.add(joint);
    legSegment.add(segment);
    return legSegment;
}

function createLeg(color){
    const leg = new THREE.Group();
    const segment1group = new THREE.Group().add(createLegSegment(3, 2, 30, color));
    const segment2group = new THREE.Group().add(createLegSegment(2, 1, 40, color));
    const segment3 = createLegSegment(1, 1, 20, color);
    segment3.position.set(40, 0, 0);
    segment3.rotation.set(0, 0, 30 * Math.PI/180);
    segment2group.position.set(30, 0, 0);
    segment2group.rotation.set(0, 0, -90 * Math.PI/180);
    segment2group.add(segment3); 
    segment1group.add(segment2group);
    leg.add(segment1group);
    return leg;
}

function createAntenna(color){
    const antenna = new THREE.Group();
    const segment1group = new THREE.Group().add(createLegSegment(1, 0.5, 40, color));
    const segment2 = createLegSegment(0.5, 0.5, 30, color);
    segment2.position.set(40, 0, 0);
    segment2.rotation.set(0, 0, -60 * Math.PI/180);
    segment1group.add(segment2);
    antenna.add(segment1group);
    return antenna;
}

function createAntHead(color){
    const headGroup = new THREE.Group();
    const headJoint = createSphere(2, 0xffffff);
    const head = createSphere(14, color); 
    head.position.set(14, 5, 0)
    head.scale.set(1.15, 0.6, 0.9);
    const antennaLeft = createAntenna(color); 
    antennaLeft.position.set(5, 10, -5);
    antennaLeft.rotation.set(-25 * Math.PI/180, 0, 70 * Math.PI/180);
    const antennaRight = createAntenna(color); 
    antennaRight.position.set(5, 10, 5);
    antennaRight.rotation.set(25 * Math.PI/180, 0, 70 * Math.PI/180);
    headGroup.add(headJoint);
    headGroup.add(head);
    headGroup.add(antennaLeft);
    headGroup.add(antennaRight);
    return headGroup
}

function createAntBody(color){
    const bodyGroup = new THREE.Group();
    const body = createSphere(20, color);
    body.position.set(0, 0, 0);
    body.scale.set(1.25, 0.5, 0.5);
    body.rotation.z = 20 * Math.PI/180;
    const legLeftFront = createLeg(color);
    legLeftFront.position.set(10, 0, -9);
    legLeftFront.rotation.set(0, 45 * Math.PI/180, 50 * Math.PI/180);
    const legLeftMid = createLeg(color);
    legLeftMid.position.set(-5, 0, -11);
    legLeftMid.rotation.set(0, 100 * Math.PI/180, 35 * Math.PI/180)
    const legLeftBack = createLeg(color);
    legLeftBack.position.set(-15, 0, -8);
    legLeftBack.rotation.set(0, 135 * Math.PI/180, 30 * Math.PI/180);
    const legRightFront = createLeg(color);
    legRightFront.position.set(10, 0, 9);
    legRightFront.rotation.set(0, -45 * Math.PI/180, 50 * Math.PI/180);
    const legRightMid = createLeg(color);
    legRightMid.position.set(-5, 0, 11);
    legRightMid.rotation.set(0, -100 * Math.PI/180, 35 * Math.PI/180);
    const legRightBack = createLeg(color);
    legRightBack.position.set(-15, 0, 8);
    legRightBack.rotation.set(0, -135 * Math.PI/180, 30 * Math.PI/180)
    bodyGroup.add(body);
    bodyGroup.add(legLeftFront);
    bodyGroup.add(legLeftMid);
    bodyGroup.add(legLeftBack);
    bodyGroup.add(legRightFront);
    bodyGroup.add(legRightMid);
    bodyGroup.add(legRightBack);
    return bodyGroup;
}

function createAntBack(color){
    const backGroup = new THREE.Group();
    const backJoint = createSphere(4, 0xffffff);
    const back = createSphere(19, color);
    back.position.set(-23, 7, 0);
    back.scale.set(1.25, 0.9, 1);
    backGroup.add(back);
    backGroup.add(backJoint);
    return backGroup;
}

function createAnt(){
    const color = 0xcc0000
    const ant = new THREE.Group();
    const headGroup = createAntHead(color);
    headGroup.position.set(23, 10, 0);
    headGroup.rotation.z = -30 * Math.PI/180;
    const bodyGroup = createAntBody(color);
    const backGroup = createAntBack(color);
    backGroup.position.set(-25, -5, 0);
    backGroup.rotation.z = 10 * Math.PI/180;
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
