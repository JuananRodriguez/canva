import "./App.css";
import { Tooltip } from "./components/tooltip";
import { DummyBox } from "./components/dummyBox";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tooltip
            alignment="right"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet sollicitudin elit, sed consequat odio. Praesent a erat quis sapien consequat venenatis. Suspendisse placerat non enim sit amet tristique. Mauris a massa sed purus eleifend tempor vel et enim. Morbi interdum tristique libero, ac condimentum nulla. Aenean ante purus, pharetra non purus at, euismod tempus odio. Mauris quis risus neque. Suspendisse gravida pellentesque faucibus. Mauris ac lacus at justo semper efficitur. Integer vel diam sapien. Curabitur tincidunt varius orci quis pretium. Nunc sit amet dui eget quam rhoncus placerat non vitae dui. Morbi nisl felis, dictum non dui in, tincidunt mattis nibh."
            >
            <DummyBox color="red">LEFT</DummyBox>
          </Tooltip>
          <div></div>
          <Tooltip
            alignment="right"
            message="este es un mensaje que debe quedar contenido en el tooltip"
          >
            <DummyBox color="grey">RIGHT</DummyBox>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tooltip
            alignment="right"
            message="este es un mensaje que debe quedar contenido en el tooltip"
          >
            <DummyBox color="blue">BOTTOM</DummyBox>
          </Tooltip>
          <Tooltip
          debug
            alignment="right"
            message="este es un mensaje que debe quedar contenido en el tooltip"
          >
            <DummyBox color="pink">TOP</DummyBox>
          </Tooltip>
        </div>
      </div>
      <Tooltip
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        alignment="right"
        message="este es un mensaje que debe quedar contenido en el tooltip"
      >
        <DummyBox color="pink">TOP</DummyBox>
      </Tooltip>
      {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit
        amet sollicitudin elit, sed consequat odio. Praesent a erat quis sapien
        consequat venenatis. Suspendisse placerat non enim sit amet tristique.
        Mauris a massa sed purus eleifend tempor vel et enim. Morbi interdum
        tristique libero, ac condimentum nulla. Aenean ante purus, pharetra non
        purus at, euismod tempus odio. Mauris quis risus neque. Suspendisse
        gravida pellentesque faucibus. Mauris ac lacus at justo semper
        efficitur. Integer vel diam sapien. Curabitur tincidunt varius orci quis
        pretium. Nunc sit amet dui eget quam rhoncus placerat non vitae dui.
        Morbi nisl felis, dictum non dui in, tincidunt mattis nibh.
      </p> */}
    </>
  );
}

export default App;
