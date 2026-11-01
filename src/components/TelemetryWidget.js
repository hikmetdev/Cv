import React, { useState, useEffect, useRef } from 'react';

export default function TelemetryWidget({ lang, data }) {
  const [activeMode, setActiveMode] = useState('siha'); // 'siha' | 'ika'
  const [threatActive, setThreatActive] = useState(true);
  const [emergencyManeuver, setEmergencyManeuver] = useState(false);
  const [lidarRange, setLidarRange] = useState(130);

  const [telemetry, setTelemetry] = useState({
    altitude: 540,
    speed: 124,
    heading: 48,
    threatDistance: 275,
    gForce: '2.4 G',
    status: 'OTONOM SEYRÜSEFER',
    activeNode: '/uav/hss_avoidance_planner',
    fps: 60
  });

  const [logs, setLogs] = useState([
    { id: 1, time: '13:42:01', source: 'ArduPilot SITL', text: 'MAVLink otonom seyrüsefer modu devrede. WP2 doğrultusu.' },
    { id: 2, time: '13:42:03', source: 'HSS Kaçınma Node', text: 'Sanal kısıtlı bölge (HSS) algılandı. Tehdit yarıçapı: 750m' },
    { id: 3, time: '13:42:06', source: 'Agentic Copilot [MCP]', text: 'Spline rota revizyonu hesaplandı. Kaçınma açısı: +42° Sancak' }
  ]);

  const canvasRef = useRef(null);
  const animStateRef = useRef({
    // UAV (SİHA) state
    uav: {
      x: 140,
      y: 220,
      angle: 0,
      targetAngle: 0,
      speed: 2.2,
      trail: [],
      flares: []
    },
    // UGV (İKA) state
    ugv: {
      x: 100,
      y: 190,
      angle: 0,
      steerAngle: 0,
      targetWpIndex: 0,
      tracks: []
    },
    hss: {
      x: 430,
      y: 180,
      radius: 115,
      radarSweep: 0
    },
    rivalUav: {
      x: 580,
      y: 90,
      angle: Math.PI
    },
    // Obstacles for İKA
    obstacles: [
      { x: 260, y: 150, w: 55, h: 45, type: 'rock' },
      { x: 380, y: 240, w: 60, h: 50, type: 'bunker' },
      { x: 490, y: 130, w: 50, h: 40, type: 'crate' },
      { x: 320, y: 80,  w: 45, h: 45, type: 'barrier' }
    ],
    lidarAngle: 0
  });

  // Dynamic telemetry tick
  useEffect(() => {
    let tickCount = 0;
    const interval = setInterval(() => {
      tickCount++;
      setTelemetry(prev => {
        const u = animStateRef.current.uav;
        const g = emergencyManeuver ? '4.8 G' : (2.1 + Math.sin(tickCount * 0.2) * 0.4).toFixed(1) + ' G';
        const dist = threatActive
          ? Math.max(80, Math.floor(Math.hypot(u.x - animStateRef.current.hss.x, u.y - animStateRef.current.hss.y) * 4))
          : 999;

        return {
          ...prev,
          altitude: activeMode === 'siha' ? 520 + Math.floor(Math.sin(tickCount * 0.1) * 25) : 0,
          speed: activeMode === 'siha' ? 120 + Math.floor(Math.cos(tickCount * 0.1) * 8) : 28 + Math.floor(Math.sin(tickCount * 0.2) * 4),
          heading: Math.floor(((u.angle * 180) / Math.PI + 360) % 360),
          threatDistance: dist,
          gForce: g,
          status: threatActive && dist < 320 ? 'HSS KAÇINMA MANEVRASI' : 'ROTA TAKİBİ - NORMAL'
        };
      });
    }, 180);

    return () => clearInterval(interval);
  }, [threatActive, emergencyManeuver, activeMode]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const state = animStateRef.current;

    // UAV waypoints forming a circuit around the arena
    const uavWaypoints = [
      { x: 100, y: 80 },
      { x: 300, y: 70 },
      { x: 580, y: 130 },
      { x: 620, y: 300 },
      { x: 390, y: 330 },
      { x: 120, y: 280 }
    ];
    let uavWpIndex = 0;

    // UGV waypoints navigating around obstacles
    const ugvWaypoints = [
      { x: 90,  y: 190 },
      { x: 210, y: 100 },
      { x: 390, y: 90 },
      { x: 580, y: 220 },
      { x: 440, y: 310 },
      { x: 240, y: 280 }
    ];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Dark tactical background & coordinate grid
      ctx.fillStyle = '#060a13';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Coordinate marks in corner
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.fillText('LOC: 37°52\'41"N 32°29\'22"E // GRID: UTM-36N', 16, 20);
      ctx.fillText('REF: SUIAT_SITL_ENVIRONMENT // ROS2: /foxy_bridge', 16, 34);

      // =========================================================================
      // MODE 1: SİHA (İHA & HSS KAÇINMA SİMÜLASYONU)
      // =========================================================================
      if (activeMode === 'siha') {
        const uav = state.uav;
        const hss = state.hss;
        hss.radarSweep += 0.03;

        // Draw HSS Ground Station & Missile Bubble
        if (threatActive) {
          // Radar coverage circles
          ctx.beginPath();
          ctx.arc(hss.x, hss.y, hss.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
          ctx.fill();

          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([6, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Inner lethal zone
          ctx.beginPath();
          ctx.arc(hss.x, hss.y, hss.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.22)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.stroke();

          // Radar sweep line inside dome
          ctx.save();
          ctx.translate(hss.x, hss.y);
          const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, hss.radius);
          sweepGrad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
          sweepGrad.addColorStop(1, 'rgba(239, 68, 68, 0.0)');
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, hss.radius, hss.radarSweep, hss.radarSweep + 0.5);
          ctx.closePath();
          ctx.fillStyle = sweepGrad;
          ctx.fill();
          ctx.restore();

          // Ground SAM Launcher & Phased Array Radar icon
          ctx.save();
          ctx.translate(hss.x, hss.y);
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(-14, -10, 28, 20); // SAM battery chassis
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(0, 0, 6, 0, Math.PI * 2);
          ctx.fill();
          // Radar dish
          ctx.strokeStyle = '#f87171';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const dishAngle = hss.radarSweep * 1.5;
          ctx.moveTo(Math.cos(dishAngle) * 12, Math.sin(dishAngle) * 12);
          ctx.lineTo(-Math.cos(dishAngle) * 12, -Math.sin(dishAngle) * 12);
          ctx.stroke();
          ctx.restore();

          // HSS Label
          ctx.fillStyle = '#fca5a5';
          ctx.font = 'bold 11px "JetBrains Mono", monospace';
          ctx.fillText('⚠️ HSS HAVA SAVUNMA BATARYASI', hss.x - 90, hss.y - hss.radius - 8);
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(248, 113, 113, 0.8)';
          ctx.fillText('SANAL KISITLI BÖLGE (NO-FLY ENGAGEMENT ZONE)', hss.x - 120, hss.y - hss.radius + 6);
        }

        // Draw Waypoint Circuit Line
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        uavWaypoints.forEach((wp, idx) => {
          if (idx === 0) ctx.moveTo(wp.x, wp.y);
          else ctx.lineTo(wp.x, wp.y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);

        // Waypoint markers
        uavWaypoints.forEach((wp, idx) => {
          ctx.fillStyle = '#00f0ff';
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
          ctx.fillText(`WP${idx + 1}`, wp.x + 6, wp.y + 4);
        });

        // UAV Navigation Logic
        const targetWp = uavWaypoints[uavWpIndex];
        let targetX = targetWp.x;
        let targetY = targetWp.y;

        // Autonomous HSS Avoidance calculation
        if (threatActive) {
          const distToHss = Math.hypot(uav.x - hss.x, uav.y - hss.y);
          if (distToHss < hss.radius + 40) {
            // Push target away from HSS center (tangential avoidance vector)
            const avoidAngle = Math.atan2(uav.y - hss.y, uav.x - hss.x) + 0.8;
            targetX = hss.x + Math.cos(avoidAngle) * (hss.radius + 50);
            targetY = hss.y + Math.sin(avoidAngle) * (hss.radius + 50);

            // Draw avoidance vector spline line
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(uav.x, uav.y);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        // Move UAV towards target
        const dx = targetX - uav.x;
        const dy = targetY - uav.y;
        const distToWp = Math.hypot(dx, dy);

        if (distToWp < 25) {
          uavWpIndex = (uavWpIndex + 1) % uavWaypoints.length;
        }

        const desiredAngle = Math.atan2(dy, dx);
        let angleDiff = desiredAngle - uav.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        uav.angle += angleDiff * 0.055;

        const currentSpeed = emergencyManeuver ? 3.4 : uav.speed;
        uav.x += Math.cos(uav.angle) * currentSpeed;
        uav.y += Math.sin(uav.angle) * currentSpeed;

        // Record exhaust trail
        uav.trail.push({ x: uav.x, y: uav.y, life: 1.0 });
        if (uav.trail.length > 28) uav.trail.shift();

        // Draw exhaust afterburner trail
        uav.trail.forEach((pt, i) => {
          pt.life -= 0.025;
          if (pt.life > 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, (1 - pt.life) * 5 + 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${pt.life * 0.4})`;
            ctx.fill();
          }
        });

        // Flares animation if emergency maneuver
        if (emergencyManeuver && Math.random() > 0.4) {
          uav.flares.push({
            x: uav.x - Math.cos(uav.angle) * 15 + (Math.random() - 0.5) * 10,
            y: uav.y - Math.sin(uav.angle) * 15 + (Math.random() - 0.5) * 10,
            vx: -Math.cos(uav.angle) * 2 + (Math.random() - 0.5) * 3,
            vy: -Math.sin(uav.angle) * 2 + (Math.random() - 0.5) * 3,
            life: 1.0
          });
        }
        uav.flares.forEach(f => {
          f.x += f.vx;
          f.y += f.vy;
          f.life -= 0.04;
          ctx.beginPath();
          ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${f.life})`;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        uav.flares = uav.flares.filter(f => f.life > 0);

        // ==========================================
        // DRAW DETAILED COMBAT UAV / SİHA AIRCRAFT
        // ==========================================
        ctx.save();
        ctx.translate(uav.x, uav.y);
        ctx.rotate(uav.angle);

        // Jet engine nozzle glow
        ctx.fillStyle = emergencyManeuver ? '#f59e0b' : '#00f0ff';
        ctx.shadowColor = emergencyManeuver ? '#f59e0b' : '#00f0ff';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(-16, -3);
        ctx.lineTo(-24, 0);
        ctx.lineTo(-16, 3);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Main Stealth Delta Wings (SUIAT SİHA model)
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.6;

        ctx.beginPath();
        ctx.moveTo(18, 0);       // Nose cone
        ctx.lineTo(6, -6);       // Canopy left
        ctx.lineTo(-2, -26);     // Left wingtip
        ctx.lineTo(-7, -26);     // Left wing aileron edge
        ctx.lineTo(-6, -6);      // Wingroot left
        ctx.lineTo(-15, -12);    // Left vertical stabilizer
        ctx.lineTo(-14, 0);      // Tail center
        ctx.lineTo(-15, 12);     // Right vertical stabilizer
        ctx.lineTo(-6, 6);       // Wingroot right
        ctx.lineTo(-7, 26);      // Right wing aileron edge
        ctx.lineTo(-2, 26);      // Right wingtip
        ctx.lineTo(6, 6);        // Canopy right
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Canopy glass
        ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(2, -3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(2, 3);
        ctx.closePath();
        ctx.fill();

        // Wingtip navigation lights (Blinking Strobe)
        const strobe = Math.floor(Date.now() / 250) % 2 === 0;
        // Port (Left) - Red
        ctx.fillStyle = strobe ? '#ef4444' : '#7f1d1d';
        ctx.beginPath();
        ctx.arc(-4, -26, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Starboard (Right) - Green
        ctx.fillStyle = strobe ? '#10b981' : '#064e3b';
        ctx.beginPath();
        ctx.arc(-4, 26, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // UAV HUD Label & Flight Vector
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#00f0ff';
        ctx.fillText('SUIAT SİHA [OTONOM]', uav.x + 22, uav.y - 12);
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`ALT: 540m | SPD: 124kt | WP${uavWpIndex + 1}`, uav.x + 22, uav.y + 4);

        // Rival Target UAV with HUD tracking box
        const rUav = state.rivalUav;
        rUav.x -= 0.6;
        if (rUav.x < 50) rUav.x = 640;
        ctx.save();
        ctx.translate(rUav.x, rUav.y);
        // Rival drone shape
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(0, -7);
        ctx.lineTo(8, 0);
        ctx.lineTo(0, 7);
        ctx.closePath();
        ctx.fill();
        // HUD Tracking Diamond Box
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-16, -16, 32, 32);
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#f43f5e';
        ctx.fillText('RAKİP İHA [HEDEF]', -30, -22);
        ctx.fillText('D: 820m // 340kt', -30, 28);
        ctx.restore();

      // =========================================================================
      // MODE 2: İKA (İNSANSIZ KARA ARACI & ROS2 LIDAR SİMÜLASYONU)
      // =========================================================================
      } else if (activeMode === 'ika') {
        const ugv = state.ugv;
        state.lidarAngle += 0.08;

        // Draw Obstacles (Rocks, Bunkers, Barricades)
        state.obstacles.forEach(obs => {
          ctx.fillStyle = '#1e293b';
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1.5;
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

          // Diagonal hazard warning stripes on barricade
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y);
          ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
          ctx.stroke();

          // Costmap inflation zone around obstacle
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.strokeRect(obs.x - 14, obs.y - 14, obs.w + 28, obs.h + 28);
          ctx.setLineDash([]);

          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = '#64748b';
          ctx.fillText(`ENGEL: ${obs.type.toUpperCase()}`, obs.x + 4, obs.y + obs.h / 2 + 3);
        });

        // UGV Global Nav Path Line
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ugvWaypoints.forEach((wp, i) => {
          if (i === 0) ctx.moveTo(wp.x, wp.y);
          else ctx.lineTo(wp.x, wp.y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);

        // Move UGV towards current waypoint
        const curWp = ugvWaypoints[ugv.targetWpIndex];
        const dx = curWp.x - ugv.x;
        const dy = curWp.y - ugv.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 28) {
          ugv.targetWpIndex = (ugv.targetWpIndex + 1) % ugvWaypoints.length;
        }

        const desiredAngle = Math.atan2(dy, dx);
        let angleDiff = desiredAngle - ugv.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        ugv.angle += angleDiff * 0.05;
        ugv.steerAngle = Math.max(-0.45, Math.min(0.45, angleDiff * 1.5));

        ugv.x += Math.cos(ugv.angle) * 1.5;
        ugv.y += Math.sin(ugv.angle) * 1.5;

        // Leave tire skid track marks
        ugv.tracks.push({ x: ugv.x, y: ugv.y, angle: ugv.angle, life: 1.0 });
        if (ugv.tracks.length > 35) ugv.tracks.shift();

        ugv.tracks.forEach(tr => {
          tr.life -= 0.02;
          if (tr.life > 0) {
            ctx.save();
            ctx.translate(tr.x, tr.y);
            ctx.rotate(tr.angle);
            ctx.fillStyle = `rgba(100, 116, 139, ${tr.life * 0.35})`;
            ctx.fillRect(-6, -11, 4, 3);
            ctx.fillRect(-6, 8, 4, 3);
            ctx.restore();
          }
        });

        // 360° LiDAR Ray-Casting & Point Cloud Visualization
        const numRays = 32;
        for (let r = 0; r < numRays; r++) {
          const rayAngle = state.lidarAngle + (r * (Math.PI * 2 / numRays));
          let rayDist = lidarRange;

          // Check intersection with obstacles
          state.obstacles.forEach(obs => {
            const cx = obs.x + obs.w / 2;
            const cy = obs.y + obs.h / 2;
            const distToObs = Math.hypot(cx - ugv.x, cy - ugv.y);
            if (distToObs < lidarRange + 30) {
              const angleToObs = Math.atan2(cy - ugv.y, cx - ugv.x);
              let diff = rayAngle - angleToObs;
              while (diff > Math.PI) diff -= Math.PI * 2;
              while (diff < -Math.PI) diff += Math.PI * 2;
              if (Math.abs(diff) < 0.28) {
                rayDist = Math.min(rayDist, distToObs - 20);
              }
            }
          });

          const hitX = ugv.x + Math.cos(rayAngle) * rayDist;
          const hitY = ugv.y + Math.sin(rayAngle) * rayDist;

          // LiDAR Ray
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.18)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(ugv.x, ugv.y);
          ctx.lineTo(hitX, hitY);
          ctx.stroke();

          // Reflected Point Cloud Dot
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(hitX, hitY, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // ==========================================
        // DRAW DETAILED TACTICAL UGV GROUND ROBOT
        // ==========================================
        ctx.save();
        ctx.translate(ugv.x, ugv.y);
        ctx.rotate(ugv.angle);

        // Front Headlights beam cone
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(18, -8);
        ctx.lineTo(85, -35);
        ctx.lineTo(85, 35);
        ctx.lineTo(18, 8);
        ctx.closePath();
        ctx.fill();

        // 4 All-Terrain Rubber Wheels with tire rims
        // Rear-Left Wheel
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-16, -15, 12, 6);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(-16, -15, 12, 6);
        // Rear-Right Wheel
        ctx.fillRect(-16, 9, 12, 6);
        ctx.strokeRect(-16, 9, 12, 6);

        // Front Wheels (Actively Turning with Steer Angle!)
        ctx.save();
        ctx.translate(14, -12);
        ctx.rotate(ugv.steerAngle);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-6, -3, 12, 6);
        ctx.strokeStyle = '#10b981';
        ctx.strokeRect(-6, -3, 12, 6);
        ctx.restore();

        ctx.save();
        ctx.translate(14, 12);
        ctx.rotate(ugv.steerAngle);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-6, -3, 12, 6);
        ctx.strokeStyle = '#10b981';
        ctx.strokeRect(-6, -3, 12, 6);
        ctx.restore();

        // Armored Rover Chassis
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(-18, -10, 36, 20, 4);
        ctx.fill();
        ctx.stroke();

        // Armor panels & equipment
        ctx.fillStyle = '#334155';
        ctx.fillRect(-12, -7, 18, 14);

        // Roof-mounted spinning LiDAR Turret
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // LiDAR laser emitter rotating beam head
        ctx.save();
        ctx.rotate(state.lidarAngle);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(0, -1.5, 7, 3);
        ctx.restore();

        ctx.restore();

        // UGV Status Label
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText('İKA ROVER [ROS2_NAV2 NODE]', ugv.x + 22, ugv.y - 12);
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('TOPIC: /cmd_vel | LiDAR: 360° AKTİF', ugv.x + 22, ugv.y + 4);

      // =========================================================================
      // MODE 3: AGENTIC AI COPILOT (VLM + YOLO + MCP MULTI-MODEL)
      // =========================================================================
      } else {
        // Split Screen View
        // Left: Reconnaissance Camera View with YOLO Detection Bounding Boxes
        const camW = width * 0.48;
        const camH = height - 50;

        ctx.save();
        ctx.fillStyle = '#050914';
        ctx.fillRect(20, 25, camW, camH);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.strokeRect(20, 25, camW, camH);

        // Gimbal Crosshair
        const gX = 20 + camW / 2;
        const gY = 25 + camH / 2;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gX - 25, gY);
        ctx.lineTo(gX + 25, gY);
        ctx.moveTo(gX, gY - 25);
        ctx.lineTo(gX, gY + 25);
        ctx.stroke();

        // YOLO Box 1: Enemy Aircraft
        const tPulse = (Math.sin(Date.now() * 0.005) + 1) * 0.5;
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.65 + tPulse * 0.35})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(gX - 70, gY - 60, 65, 45);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillText('YOLO: RAKİP_İHA (96%)', gX - 70, gY - 66);

        // YOLO Box 2: Ground SAM Radar
        ctx.strokeStyle = '#f59e0b';
        ctx.strokeRect(gX + 20, gY + 15, 75, 50);
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('VLM: HSS_RADAR (92%)', gX + 20, gY + 10);

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#c084fc';
        ctx.fillText('GİMBAL FLIR EO/IR KAMERA // 1080p 60FPS', 28, 42);
        ctx.restore();

        // Right: Agentic Decision Graph & ReAct Pipeline
        const graphX = width * 0.54;
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.fillStyle = '#c084fc';
        ctx.fillText('AGENTIC COPILOT KARAR ZİNCİRİ (ReAct & MCP)', graphX, 42);

        const steps = [
          { name: '1. Girdi & Telemetri', desc: 'YOLO + VLM + ArduPilot verisi tek akışta', status: 'TAMAMLANDI' },
          { name: '2. ChromaDB RAG Sorgusu', desc: 'Sanal kısıtlı bölge kuralları & kaçınma protokolü', status: 'AKTİF' },
          { name: '3. ReAct Ajan Akıl Yürütme', desc: 'Düşünce: "HSS tehdit menzili ihlali, rota revize edilmeli"', status: 'İŞLENİYOR' },
          { name: '4. MCP Araç Çağrısı (Tool)', desc: 'mcp://drone/set_evasive_spline(heading=285°)', status: 'BEKLEMEDE' }
        ];

        steps.forEach((st, i) => {
          const sy = 70 + i * 58;
          ctx.fillStyle = i === 2 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(30, 41, 59, 0.6)';
          ctx.strokeStyle = i === 2 ? '#a855f7' : 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(graphX, sy, width * 0.42, 48, 6);
          ctx.fill();
          ctx.stroke();

          ctx.font = 'bold 11px "JetBrains Mono", monospace';
          ctx.fillStyle = i === 2 ? '#e9d5ff' : '#f8fafc';
          ctx.fillText(st.name, graphX + 12, sy + 18);

          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(st.desc, graphX + 12, sy + 36);

          // Status Badge
          ctx.fillStyle = i === 2 ? '#a855f7' : (i < 2 ? '#10b981' : '#64748b');
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          ctx.fillText(st.status, graphX + (width * 0.42) - 85, sy + 18);
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeMode, threatActive, emergencyManeuver, lidarRange]);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    const time = new Date().toLocaleTimeString();
    if (mode === 'siha') {
      setLogs(prev => [
        { id: Date.now(), time, source: 'SUIAT SİHA', text: 'Uçuş kontrolörü ArduPilot SITL telemetrisi aktif. HSS kaçınma algoritmaları devrede.' },
        ...prev.slice(0, 4)
      ]);
    } else if (mode === 'ika') {
      setLogs(prev => [
        { id: Date.now(), time, source: 'ROS2 İKA', text: 'LiDAR 360° ray-casting başladı. /cmd_vel üzerinden tekerlek açıları kontrol ediliyor.' },
        ...prev.slice(0, 4)
      ]);
    } else {
      setLogs(prev => [
        { id: Date.now(), time, source: 'Agentic Copilot', text: 'Model Context Protocol (MCP) üzerinden LLM karar döngüsü tetiklendi.' },
        ...prev.slice(0, 4)
      ]);
    }
  };

  const triggerEmergencyEvasion = () => {
    setEmergencyManeuver(true);
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [
      { id: Date.now(), time, source: 'ACİL KAÇINMA', text: 'Yüksek-G kaçınma manevrası tetiklendi! Termal flare savunması bırakıldı.' },
      ...prev.slice(0, 4)
    ]);
    setTimeout(() => setEmergencyManeuver(false), 3500);
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
            🛸 SİHA (Uçak & HSS Kaçınma)
          </button>
          <button
            type="button"
            className={`pill-btn ${activeMode === 'ika' ? 'active' : ''}`}
            onClick={() => handleModeChange('ika')}
          >
            🚙 İKA (Araç & ROS2 LiDAR)
          </button>
        </div>
      </div>

      {/* Top Telemetry Gauges HUD Bar */}
      <div className="metrics-grid">
        <div className="metric-box">
          <span className="metric-label">{lang === 'tr' ? 'İRTİFA (ALT)' : 'ALTITUDE'}</span>
          <span className="metric-value font-mono">{telemetry.altitude} <small>m</small></span>
          <div className="metric-bar"><div style={{ width: `${Math.min(100, (telemetry.altitude / 650) * 100)}%` }}></div></div>
        </div>

        <div className="metric-box">
          <span className="metric-label">{lang === 'tr' ? 'HIZ (SPEED)' : 'AIRSPEED'}</span>
          <span className="metric-value font-mono">{telemetry.speed} <small>km/h</small></span>
          <div className="metric-bar"><div style={{ width: `${Math.min(100, (telemetry.speed / 160) * 100)}%` }}></div></div>
        </div>

        <div className="metric-box">
          <span className="metric-label">{lang === 'tr' ? 'G-KUVVETİ' : 'G-LOAD'}</span>
          <span className={`metric-value font-mono ${emergencyManeuver ? 'text-amber' : ''}`}>
            {telemetry.gForce}
          </span>
          <span className="metric-sub font-mono">{emergencyManeuver ? 'YÜKSEK-G MANEVRA' : 'STABİL'}</span>
        </div>

        <div className="metric-box">
          <span className="metric-label">{lang === 'tr' ? 'HSS TEHDİT MESAFESİ' : 'HSS DISTANCE'}</span>
          <span className={`metric-value font-mono ${threatActive && telemetry.threatDistance < 320 ? 'text-amber' : ''}`}>
            {threatActive ? `${telemetry.threatDistance} m` : 'GÜVENLİ (CLEAR)'}
          </span>
          <span className="metric-sub font-mono">
            {threatActive ? (telemetry.threatDistance < 320 ? '⚠️ KİLİT MENZİLİNDE' : 'GÜVENLİ KORİDOR') : 'TEHDİT YOK'}
          </span>
        </div>
      </div>

      {/* Detailed Mission Canvas Simulation Viewport */}
      <div className="mission-viewport-wrap">
        <canvas
          ref={canvasRef}
          width={760}
          height={380}
          className="mission-canvas"
        />

        {/* Viewport Top HUD Overlay */}
        <div className="mission-hud-overlay">
          <div className="hud-badge font-mono">
            <span className="hud-dot"></span>
            <span>{activeMode === 'siha' ? 'SİHA SITL SIM: ARDUPILOT + GAZEBO' : 'İKA ROS2 SİMÜLASYONU: NAV2 COSTMAP'}</span>
          </div>
          <div className="hud-fps font-mono">60 FPS // HD TACTICAL</div>
        </div>

        {/* Interactive Action Control Toolbar */}
        <div className="mission-controls-bar">
          {activeMode === 'siha' && (
            <>
              <button
                type="button"
                className={`action-toggle-btn ${threatActive ? 'threat-active-btn' : 'threat-inactive-btn'}`}
                onClick={() => setThreatActive(!threatActive)}
              >
                {threatActive ? '⚠️ HSS Tehdit Bölgesi: AKTİF' : '🟢 HSS Tehdit Bölgesi: PASİF'}
              </button>

              <button
                type="button"
                className="action-secondary-btn"
                onClick={triggerEmergencyEvasion}
              >
                🚀 Acil Kaçınma Manevrası & Flare
              </button>
            </>
          )}

          {activeMode === 'ika' && (
            <>
              <button
                type="button"
                className="action-toggle-btn threat-inactive-btn"
                onClick={() => setLidarRange(lidarRange === 130 ? 190 : 130)}
              >
                📡 LiDAR Menzili: {lidarRange}m {lidarRange === 190 ? '(Genişletildi)' : ''}
              </button>
            </>
          )}

        </div>
      </div>

      {/* Telemetry Real-time Stream Terminal */}
      <div className="telemetry-logs-box">
        <div className="logs-head">
          <span className="logs-icon">⚡</span>
          <span className="logs-title">{data.interactiveWidget.liveLogsTitle}</span>
          <span className="logs-badge font-mono">CANLI MAVLink / ROS2 AKIŞI</span>
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
  );
}
