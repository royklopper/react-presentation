React presentation tool
=================================

Demo: [here](http://react-presentation-demo.todiefor.nl)

This is a small example that demonstrates rendering components based
on URLs with `react-router` as well as connecting them to Redux state.

Storage is provided by the localStorage component and integrated with
redux. State is stored in localStorage. It uses react-bootstrap for
easy component creation and bootstrap-sass for the theming.

Resources could be used more sparse (such as bootstrap components / scripts)

The project uses webpack to package and transpile all resources.


**To run, follow these steps:**

1. Install dependencies with `npm install` in this directory
2. Start webpack with `npm start`
3. Open [http://localhost:8080/](http://localhost:8080/)

-

**To build, follow these steps:**

1. Install dependencies with `npm install` in this directory
2. Start webpack with `npm run build`
3. Your files are now in the /dist folder
