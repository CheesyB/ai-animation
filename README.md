## Ai-Animation

This react component animates an ai-like pattern on a canvas. You can use it and modify as you
like to spice up your website or smart-mirror. What you basically need is the AiAnimation.js and
some css for the canvas if you like and you're good to go.

You can use the component like so:
```JSX
<AiAnimation
  width={window.innerWidth}
  height={window.innerHeight}
  particleSize={1}
  maxParticles={300}
  threshold={70}
  speed={0.4}
  lineColor="green"
  particleColor="white"
/>
```
Note that `width` and `height` are mandatory for the component to work. The threshold indicates
when neighboring nodes connect to a line.

![with white background](/img/ai1.jpg)

![with white background](/img/ai2.jpg)

![with white background](/img/ai3.jpg)

This idea was mainly influenced by this
[http://slicker.me/javascript/particles.htm](http://slicker.me/javascript/particles.htm!).
And implemented with the help of this blog post
[https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react](https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/)


This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## To Do's

Make it scale dynamically.
