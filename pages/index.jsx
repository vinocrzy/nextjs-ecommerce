import Head from "next/head";

export default function Home() {
  return (
    <div style={{ overflow: "hidden" }}>
      <main
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <h1>Happy hacking !!</h1>
        <h2>Next Js Ecommerce</h2>
      </main>
    </div>
  );
}
