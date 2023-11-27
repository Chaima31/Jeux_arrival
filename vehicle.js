//class enemy
class Enemy {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.isAlive = true;
  }

  show() {
    if (this.isAlive) {
      fill(255, 0, 0);
      noStroke();
      ellipse(this.pos.x, this.pos.y, 20, 20);
    }
  }
}




// class vehicule 
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 20;
    this.maxForce = 0.4;
    this.r = 16;
    this.rayonZoneDeFreinage = 100;
    this.isLeader = false; // Nouvelle propriété pour déterminer si le véhicule est un leader
  }

  evade(vehicle) {
    let pursuit = this.pursue(vehicle);
    pursuit.mult(-1);
    return pursuit;
  }

  pursue(vehicle) {
    let target = vehicle.pos.copy();
    let prediction = vehicle.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    fill(0, 255, 0);
    circle(target.x, target.y, 16);
    return this.seek(target);
  }

  arrive(target) {
    let force;
    if (this.isLeader) {
      force = p5.Vector.sub(target, this.pos);
    } else {
      force = p5.Vector.sub(target, this.pos);
      let distance = p5.Vector.dist(this.pos, target);
      if (distance < this.rayonZoneDeFreinage * 2) {
        // Si le véhicule est trop proche du leader, ralentissez plus tôt
        let mappedSpeed = map(distance, 0, this.rayonZoneDeFreinage * 2, 0, this.maxSpeed);
        force.setMag(mappedSpeed);
      } else {
        force.setMag(this.maxSpeed);
      }
    }

    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target, arrival = false) {
    let force = p5.Vector.sub(target, this.pos);
    let desiredSpeed = this.maxSpeed;

    if (arrival) {
      let rayon = this.rayonZoneDeFreinage;
      noFill();
      stroke("white");
      circle(this.pos.x, this.pos.y, rayon);

      let distance = p5.Vector.dist(this.pos, target);

      if (distance < rayon) {
        desiredSpeed = map(distance, 0, rayon, 0, this.maxSpeed);
      }
    }

    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  showContour() {
    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  show() {
    this.showContour();

    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }



  avoidObstacles(obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      const desired = p5.Vector.sub(this.pos, obstacle);
      const distance = desired.mag();
  
      if (distance < this.r + 10) {
        // Si le véhicule est trop proche de l'obstacle, évitez-le
        const steer = p5.Vector.sub(this.pos, obstacle);
        steer.setMag(this.maxSpeed);
        steer.sub(this.vel);
        steer.limit(this.maxForce * 2);
        this.applyForce(steer);
      }
    }
  }


  avoidObstacles(obstacles, leader) {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      const desired = p5.Vector.sub(this.pos, obstacle);
      const distance = desired.mag();
  
      if (distance < this.r + 10) {
        // Si le véhicule est trop proche de l'obstacle
        if (leader) {
          // Si le véhicule est devant le leader, évitez l'obstacle
          const toLeader = p5.Vector.sub(leader.pos, this.pos);
          const angle = p5.Vector.angleBetween(this.vel, toLeader);
          
          if (angle > PI / 2) {
            // Si l'angle entre la direction du véhicule et le vecteur vers le leader
            // est supérieur à 90 degrés, cela signifie que le véhicule est devant le leader
            // Évitez l'obstacle
            const steer = p5.Vector.sub(this.pos, obstacle);
            steer.setMag(this.maxSpeed);
            steer.sub(this.vel);
            steer.limit(this.maxForce * 2);
            this.applyForce(steer);
          }
        } else {
          // Si le véhicule n'est pas un suiveur, évitez simplement l'obstacle
          const steer = p5.Vector.sub(this.pos, obstacle);
          steer.setMag(this.maxSpeed);
          steer.sub(this.vel);
          steer.limit(this.maxForce * 2);
          this.applyForce(steer);
        }
      }
    }
  }

  //Calcule le point avant le leader
  getPointInFrontOfLeader(leader, distance) {
    const leaderVel = leader.vel.copy();
    leaderVel.setMag(distance);
    const target = p5.Vector.add(leader.pos, leaderVel);
    return target;
  }

  //methode draw Cette méthode crée un polygone avec trois points (position actuelle du suiveur, point à droite du leader et point à gauche du leader) pour représenter la zone d'évitement
  drawAvoidanceZone(leader, distance) {
    const leaderVel = leader.vel.copy();
    leaderVel.setMag(distance);
  
    const rightVector = leaderVel.copy().rotate(HALF_PI);
    const leftVector = leaderVel.copy().rotate(-HALF_PI);
  
    const rightPoint = p5.Vector.add(leader.pos, rightVector);
    const leftPoint = p5.Vector.add(leader.pos, leftVector);
  
    fill(150, 150, 150, 100); // Couleur grise semi-transparente
    beginShape();
    vertex(this.pos.x, this.pos.y);
    vertex(rightPoint.x, rightPoint.y);
    vertex(leftPoint.x, leftPoint.y);
    endShape(CLOSE);
  }


}


class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
  }

  show() {
    this.showContour();

    stroke(255);
    strokeWeight(2);
    fill("#F063A4");
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r * 2);
    pop();
  }
}
