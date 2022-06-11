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
            alignment="left"
            message="este es un mensaje que debe quedar contenido en el tooltip"
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
            alignment="bottom"
            message="este es un mensaje que debe quedar contenido en el tooltip"
          >
            <DummyBox color="blue">BOTTOM</DummyBox>
          </Tooltip>
          <Tooltip
            alignment="top"
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
        alignment="top"
        message="este es un mensaje que debe quedar contenido en el tooltip"
      >
        <DummyBox color="pink">TOP</DummyBox>
      </Tooltip>
    </>
  );
}

export default App;
