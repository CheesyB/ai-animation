import React from "react";

// const AiAnimationException = {
//  name: "AiAnimationException: ",
//  message: "width or height are null/undefined",
//  toString: () => {
//    return this.name + message;
//  }
// };

class AiAnimation extends React.Component {
  /* This class creates an array of particles every animation frame and updates its
   * state. Because the AiCanvas receives this state as props and AiAnimation is updated
   * the AiCanvas gets re-rendered with the new particle's positions each frame. */
  constructor(props) {
    super(props);
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.nextParticles = this.nextParticles.bind(this);
    this.constants = {
      particleSize: this.props.particleSize || 1,
      maxParticles: this.props.maxParticles || 100,
      threshold: this.props.threshold || 80,
      speed: this.props.speed || 0.4,
      lineColor: this.props.lineColor || "red",
      particleColor: this.props.particleColor || "gray"
    };
    const newParticles = [...Array(this.constants.maxParticles).keys()].map(
      () => ({
        x: Math.random() * this.props.width,
        y: Math.random() * this.props.height,
        vx: (Math.random() * 2 - 1) * this.constants.speed,
        vy: (Math.random() * 2 - 1) * this.constants.speed
      })
    );
    this.state = { particles: newParticles };
  }

  componentDidMount() {
    console.log("AiAnimation mounted. Should log exactly once...");
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    console.log("AiAnimation is updating Particles");
    this.setState(prevState => ({
      particles: this.nextParticles(prevState)
    }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  nextParticles(prevState) {
    return prevState.particles.map(oldP => {
      const { x, y, vx, vy } = oldP;
      const { width, height } = this.props;
      const newX = x + vx;
      const newY = y + vy;
      const newParticle = {
        x: newX,
        y: newY,
        vx: newX < width && newX > 0 ? vx : -vx,
        vy: newY < height && newY > 0 ? vy : -vy
      };
      return newParticle;
    });
  }

  render() {
    const {
      particleSize,
      threshold,
      speed,
      lineColor,
      particleColor
    } = this.constants;
    const { width, height } = this.props;
    const { particles } = this.state;

    return (
      <AiCanvas
        ref="canvas"
        particleSize={particleSize}
        threshold={threshold}
        speed={speed}
        lineColor={lineColor}
        particleColor={particleColor}
        width={width}
        height={height}
        particles={particles}
      />
    );
  }
}

class AiCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }

  saveContext(ctx) {
    this.ctx = ctx;
    this.ctx.fillStyle = this.props.particleColor;
    this.ctx.strokeStyle = this.props.lineColor;
  }

  line(p1, p2, lineWidth) {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
  }

  paint() {
    const { width, height, particleSize, particles, threshold } = this.props;
    this.ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, particleSize, 0, 2 * Math.PI);
      this.ctx.fill();
      for (let j = 0; j < particles.length; j++) {
        if (i != j) {
          const p2 = particles[j];
          const distanceX = Math.abs(p1.x - p2.x);
          const distanceY = Math.abs(p1.y - p2.y);
          if (distanceX < threshold && distanceY < threshold) {
            const lineWidth = 1 / ((2 * (distanceX + distanceY)) / threshold);
            this.line(p1, p2, lineWidth);
          }
        }
      }
    }
  }

  componentWillMount() {}

  componentDidMount() {
    console.log("AiCanvas mounted. Should log exactly once...");
  }

  componentDidUpdate() {
    this.paint();
  }

  render() {
    const { width, height } = this.props;
    return (
      <PureCanvas width={width} height={height} contextRef={this.saveContext} />
    );
  }
}

class PureCanvas extends React.Component {
  /* Only provides the real canvas and doesn't let itslef update.
   * It passes it's context to the parent component, namely Canvas
   * Should not be used directely */
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        width={width}
        height={height}
        ref={node =>
          node ? this.props.contextRef(node.getContext("2d")) : null
        }
      />
    );
  }
}

export default AiAnimation;
