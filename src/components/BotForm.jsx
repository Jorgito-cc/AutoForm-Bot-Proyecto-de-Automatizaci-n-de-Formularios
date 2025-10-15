import React, { useState, useRef } from "react";
import "../styles/BotForm.css";

export default function BotForm() {
  const [formUrl, setFormUrl] = useState("");
  const [cantidad, setCantidad] = useState(10);
  const [logs, setLogs] = useState("Esperando ejecución...");
  const [isRunning, setIsRunning] = useState(false);
  const controllerRef = useRef(null);

  const runBot = async () => {
    if (!formUrl) {
      alert("Por favor ingresa la URL del formulario");
      return;
    }

    setIsRunning(true);
    setLogs("⏳ Ejecutando bot...\n");

    // ✅ Crear AbortController para cancelar
    controllerRef.current = new AbortController();

    try {
      const res = await fetch("http://localhost:3000/run-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formUrl, cantidad }),
        signal: controllerRef.current.signal, // <-- importante
      });

      if (!res.ok) throw new Error("Error al ejecutar el bot");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setLogs((prev) => prev + decoder.decode(value));
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setLogs((prev) => prev + "\n🛑 Ejecución cancelada por el usuario.");
      } else {
        setLogs((prev) => prev + `\n⚠️ Error: ${err.message}`);
      }
    } finally {
      setIsRunning(false);
    }
  };

const cancelBot = async () => {
  if (controllerRef.current) {
    controllerRef.current.abort(); // Cancela la lectura del stream
  }

  try {
    await fetch("http://localhost:3000/cancel-bot", { method: "POST" });
    setLogs((prev) => prev + "\n🛑 Bot detenido desde el servidor.");
  } catch (err) {
    setLogs((prev) => prev + "\n⚠️ Error al cancelar en el servidor.");
  } finally {
    setIsRunning(false);
  }
};

  return (
    <main>
      <h1>AutoForm Bot 🤖</h1>
      <p>
        Completa el formulario para ejecutar el bot en Google Forms automáticamente.
      </p>

      <label>📄 URL del Formulario:</label>
      <input
        type="text"
        placeholder="https://docs.google.com/forms/..."
        value={formUrl}
        onChange={(e) => setFormUrl(e.target.value)}
      />

      <label>🔢 Cantidad de envíos:</label>
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
      />

      <div className="buttons">
        <button onClick={runBot} disabled={isRunning}>
          {isRunning ? "⏳ Ejecutando..." : "🚀 Ejecutar bot"}
        </button>

        <button onClick={cancelBot} disabled={!isRunning} className="cancel">
          🛑 Cancelar
        </button>
      </div>

      <div id="logsContainer">
        <h3>📜 Consola de ejecución</h3>
        <pre id="logs">{logs}</pre>
      </div>
    </main>
  );
}
