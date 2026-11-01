import React, { useState, useEffect, useRef } from 'react';

export default function TelemetryWidget({ lang, data }) {
  const [activeMode, setActiveMode] = useState('siha'); // 'siha' | 'ika' | 'copilot'
  const [threatActive, setThreatActive] = useState(true);
  const [telemetry, setTelemetry] = useState({
    altitude: 480,
    speed: 114,
    heading: 42,
    threatDistance: 320,
    status: 'OPTIMAL',
    mcpTool: 'hss_evasion_planner',
    fps: 60
  });

  const [logs, setLogs] = useState([
    { id: 1, time: '12:44:02', source: 'ROS2 [/hss_avoidance]', text: 'HSS sanal kısıtlı bölge algılandı. Çap: 600m' },
    { id: 2, time: '12:44:05', source: 'LLM Copilot [MCP]', text: 'VLM sahne analizi tamamlandı: Hedef İHA 12° sancakta' },
    { id: 3, time: '12:44:08', source: 'ArduPilot SITL', text: 'Waypoint rota güncellemesi uygulandı. İrtifa: 480m' }
  ]);

  const canvasRef = useRef(null);

  // Dynamic simulation tick
  useEffect(() => {
    let angle = 0;

    const interval = setInterval(() => {
      angle = (angle + 2) % 360;
      setTelemetry(prev => {
        const deltaAlt = (Math.sin(angle * 0.05) * 6).toFixed(1);
        const deltaSpd = (Math.cos(angle * 0.08) * 4).toFixed(1);
        return {
          ...prev,
          altitude: (480 + parseFloat(deltaAlt)).toFixed(0),
          speed: (115 + parseFloat(deltaSpd)).toFixed(0),
          heading: (42 + Math.floor(Math.sin(angle * 0.02) * 15)),
          threatDistance: threatActive ? (280 + Math.floor(Math.sin(angle * 0.1) * 60)) : 999
        };
      });
    }, 150);

    return () => clearInterval(interval);
  }, [threatActive]);

  // Canvas radar animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let radarAngle = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      // Dark background with aerospace grid
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Radar concentric rings
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 3) * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.stroke();

      // Threat zone (HSS Virtual Bubble)
      if (threatActive && activeMode === 'siha') {
        const hssX = centerX + 55;
        const hssY = centerY - 45;
        const hssRadius = 58;

        // Pulsing danger circle
        const pulse = (Math.sin(radarAngle * 2) + 1) * 0.15 + 0.15;
        ctx.fillStyle = `rgba(239, 68, 68, ${pulse})`;
        ctx.beginPath();
        ctx.arc(hssX, hssY, hssRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(hssX, hssY, hssRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('HSS TEHDİT BÖLGESİ', hssX - 48, hssY - hssRadius - 6);
      }

      // Rotating radar beam
      ctx.save();
      ctx.translate(centerX, centerY);
      radarAngle += 0.035;

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, radarAngle, radarAngle + 0.45);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      // UAV or UGV position
      let posX, posY;
      if (activeMode === 'siha') {
        // UAV flying evasive arc around HSS bubble
        const t = radarAngle * 0.6;
        posX = centerX + Math.cos(t) * (radius * 0.65);
        posY = centerY + Math.sin(t) * (radius * 0.55);

        // Avoid entering threat area
        if (threatActive && Math.hypot(posX - (centerX + 55), posY - (centerY - 45)) < 65) {
          posX -= 30;
          posY += 25;
        }

        // Draw UAV icon
        ctx.save();
        ctx.translate(posX, posY);
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;

        // Draw triangular UAV stealth shape
        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.lineTo(8, 9);
        ctx.lineTo(0, 5);
        ctx.lineTo(-8, 9);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // UAV Label
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#00f0ff';
        ctx.fillText('SUIAT SİHA [OTONOM]', posX + 12, posY - 6);
      } else if (activeMode === 'ika') {
        // UGV Ground Vehicle navigation path
        const t = radarAngle * 0.5;
        posX = centerX + Math.cos(t) * 70;
        posY = centerY + Math.sin(t * 1.5) * 45;

        // Draw UGV Rover
        ctx.save();
        ctx.translate(posX, posY);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.fillRect(-8, -6, 16, 12);
        ctx.fillStyle = '#059669';
        ctx.fillRect(-10, -8, 4, 16);
        ctx.fillRect(6, -8, 4, 16);
        ctx.restore();

        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText('İKA ROVER [ROS2_NODE]', posX + 14, posY + 4);
      } else {
        // Copilot Agentic Mode (Neural Network / Graph visualizer)
        const nodes = [
          { x: centerX - 80, y: centerY - 40, label: 'YOLO (V8)' },
          { x: centerX - 80, y: centerY + 40, label: 'Telemetri' },
          { x: centerX, y: centerY, label: 'LLM Agent (ReAct)' },
          { x: centerX + 80, y: centerY - 40, label: 'ChromaDB' },
          { x: centerX + 80, y: centerY + 40, label: 'MCP Tool' }
        ];

        // Draw connections
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = 1.5;
        nodes.slice(0, 2).forEach(n => {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(nodes[2].x, nodes[2].y);
          ctx.stroke();
        });
        nodes.slice(3).forEach(n => {
          ctx.beginPath();
          ctx.moveTo(nodes[2].x, nodes[2].y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        });

        // Draw node circles
        nodes.forEach((n, idx) => {
          ctx.fillStyle = idx === 2 ? '#a855f7' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(n.x, n.y, idx === 2 ? 14 : 9, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#e2e8f0';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + (idx === 2 ? 26 : 20));
        });
        ctx.textAlign = 'start';
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeMode, threatActive]);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    const time = new Date().toLocaleTimeString();
    if (mode === 'siha') {
      setLogs(prev => [
        { id: Date.now(), time, source: 'SUIAT SİHA', text: 'HSS Kaçınma & SITL telemetrisi devrede.' },
        ...prev.slice(0, 4)
      ]);
    } else if (mode === 'ika') {
      setLogs(prev => [
        { id: Date.now(), time, source: 'ROS2 İKA', text: 'Otonom sürüş düğümü aktif, sensör füzyonu devrede.' },
        ...prev.slice(0, 4)
      ]);
    } else {
      setLogs(prev => [
        { id: Date.now(), time, source: 'Agentic Copilot', text: 'Model Context Protocol (MCP) üzerinden LLM karar döngüsü tetiklendi.' },
        ...prev.slice(0, 4)
      ]);
    }
  };

  return (
    <div className="telemetry-card">
      <div className="telemetry-header">
        <div className="telemetry-title-block">
          <span className="live-dot-pulse"></span>
          <div>
            <h3 className="telemetry-title">{data.interactiveWidget.title}</h3>
            <p className="telemetry-sub">{data.interactiveWidget.subtitle}</p>
          </div>
        </div>

        <div className="telemetry-mode-pills">
          <button
            type="button"
            className={`pill-btn ${activeMode === 'siha' ? 'active' : ''}`}
            onClick={() => handleModeChange('siha')}
          >
            🛸 SİHA (HSS Kaçınma)
          </button>
          <button
            type="button"
            className={`pill-btn ${activeMode === 'ika' ? 'active' : ''}`}
            onClick={() => handleModeChange('ika')}
          >
            🚙 İKA (ROS2)
          </button>
          <button
            type="button"
            className={`pill-btn ${activeMode === 'copilot' ? 'active' : ''}`}
            onClick={() => handleModeChange('copilot')}
          >
            🧠 Agentic Copilot
          </button>
        </div>
      </div>

      <div className="telemetry-body-grid">
        {/* Radar & Simulation Visualizer */}
        <div className="radar-wrapper">
          <canvas
            ref={canvasRef}
            width={380}
            height={280}
            className="radar-canvas"
          />
          <div className="radar-overlay-badge">
            <span className="badge-tag">{data.interactiveWidget.status}</span>
            <span className="badge-hz">60 FPS // ROS2 DÜĞÜMÜ: AKTİF</span>
          </div>

          {activeMode === 'siha' && (
            <button
              type="button"
              className={`toggle-threat-btn ${threatActive ? 'threat-on' : 'threat-off'}`}
              onClick={() => setThreatActive(!threatActive)}
              title="HSS sanal kısıtlı bölgeyi açıp kapatın"
            >
              {threatActive ? '⚠️ HSS Kısıtlı Bölge: AKTİF' : '🟢 HSS Kısıtlı Bölge: DEVRE DIŞI'}
            </button>
          )}
        </div>

        {/* Real-time Telemetry Indicators & Logs */}
        <div className="telemetry-metrics-col">
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-label">{lang === 'tr' ? 'İRTİFA' : 'ALTITUDE'}</span>
              <span className="metric-value font-mono">{telemetry.altitude} <small>m</small></span>
              <div className="metric-bar"><div style={{ width: `${(telemetry.altitude / 600) * 100}%` }}></div></div>
            </div>

            <div className="metric-box">
              <span className="metric-label">{lang === 'tr' ? 'HIZ' : 'SPEED'}</span>
              <span className="metric-value font-mono">{telemetry.speed} <small>km/h</small></span>
              <div className="metric-bar"><div style={{ width: `${(telemetry.speed / 160) * 100}%` }}></div></div>
            </div>

            <div className="metric-box">
              <span className="metric-label">{lang === 'tr' ? 'PUSULA / BAŞ' : 'HEADING'}</span>
              <span className="metric-value font-mono">{telemetry.heading}°</span>
              <span className="metric-sub font-mono">NORTH-EAST</span>
            </div>

            <div className="metric-box">
              <span className="metric-label">{lang === 'tr' ? 'HSS MESAFESİ' : 'THREAT DIST'}</span>
              <span className={`metric-value font-mono ${threatActive && telemetry.threatDistance < 350 ? 'text-amber' : ''}`}>
                {threatActive ? `${telemetry.threatDistance} m` : 'CLEAR'}
              </span>
              <span className="metric-sub font-mono">
                {threatActive ? (lang === 'tr' ? 'OTONOM KAÇINMA DEVREDE' : 'AVOIDANCE ENGAGED') : 'NO THREAT'}
              </span>
            </div>
          </div>

          {/* Live Telemetry / Event Log Stream */}
          <div className="telemetry-logs-box">
            <div className="logs-head">
              <span className="logs-icon">⚡</span>
              <span className="logs-title">{data.interactiveWidget.liveLogsTitle}</span>
              <span className="logs-badge">CANLI AKIŞ</span>
            </div>
            <div className="logs-list font-mono">
              {logs.map(log => (
                <div key={log.id} className="log-row">
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-source">{log.source}:</span>
                  <span className="log-text">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
