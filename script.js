    const terminal = document.getElementById('terminal');
    const panel = document.getElementById('main-panel');
    const sound = document.getElementById('startupSound');

        const BIOS=[
        "v2.33.07","v2.30.11","v3.28.11","v1.22.01",
        "v4.12.56","v5.01.13","v4.12.19","2.45.10",
        "v6.22.15","v7.11.28"
    ];


     const cpuAndMotherboard = {
      "Intel": {
        cpuModels: ["Intel Core i7-10700K", "Intel Core i5-9600KF", "Intel Core i9-11900K", "Intel Xeon E-2288G"],
        motherboards: ["ASUS ROG STRIX B460-F", "MSI MPG Z490 GAMING EDGE WIFI", "Gigabyte Z490 AORUS", "ASUS Prime Z390-A"]
      },
      "AMD": {
        cpuModels: ["AMD Ryzen 5 5600X", "AMD Ryzen 7 3700X", "AMD Ryzen 9 5900X", "AMD Ryzen 3 3200G"],
        motherboards: ["MSI MAG B550 TOMAHAWK", "ASRock B550 Steel Legend", "Gigabyte AORUS X570 PRO", "ASRock B450M"]
      }
    };

    const ramSizesMB = [16384, 32768, 65536, 8192, 131072, 24576, 49152];
    const gpuModels = [
      "NVIDIA GeForce GTX 1660 Ti", "AMD Radeon RX 6800", "NVIDIA RTX 3060", "NVIDIA RTX 3080", 
      "NVIDIA GTX 1050 Ti", "AMD Radeon RX 5700 XT", "NVIDIA Quadro RTX 4000", "NVIDIA GTX 1080 Ti", 
      "NVIDIA RTX 3070", "AMD Radeon RX 580"
    ];
    const ipAddresses = [
      "192.168.1.1", "172.16.0.5", "10.0.0.25", "37.128.64.192", 
      "192.168.0.101", "10.10.0.15", "172.20.10.3", "10.1.1.1", 
      "203.0.113.42", "198.51.100.11"
    ];
    const macAddresses = [
      "00-1B-44-11-3A-B7", "F0-9F-C2-83-76-21", "C8-3A-35-10-59-B0", "A4-1D-56-F2-63-12", 
      "00-1A-92-B8-65-45", "5C-67-3E-16-52-A3", "D8-FF-B5-33-57-91", "48-92-34-5B-88-99", 
      "5E-3C-72-0D-F1-04", "C0-9A-1E-61-13-F8"
    ];

    const  Infected = [
      "4", "3", "5", "11", 
      "45", "1", "2", "8", 
      "7", "21"
    ];


 function getRandomHardwareInfo() {
      const isIntel = Math.random() > 0.5; // %50 ihtimalle Intel ya da AMD seçilecek
      const platform = isIntel ? "Intel" : "AMD";
      const selectedCPU = cpuAndMotherboard[platform].cpuModels[Math.floor(Math.random() * cpuAndMotherboard[platform].cpuModels.length)];
      const selectedMotherboard = cpuAndMotherboard[platform].motherboards[Math.floor(Math.random() * cpuAndMotherboard[platform].motherboards.length)];

      return {
        bios: BIOS[Math.floor(Math.random() * BIOS.length)],
        cpu: selectedCPU,
        ram: ramSizesMB[Math.floor(Math.random() * ramSizesMB.length)] + " MB", // MB cinsinden yazdırıyoruz
        gpu: gpuModels[Math.floor(Math.random() * gpuModels.length)],
        motherboard: selectedMotherboard,
        ip: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
        mac: macAddresses[Math.floor(Math.random() * macAddresses.length)]
      };
    }

    // Rastgele donanım bilgilerini al
    const hardwareInfo = getRandomHardwareInfo();

    const lines = [
      "Establishing secure connection...",
      "Network Status: Online",
      "",
      `BIOS: ${hardwareInfo.bios}`,
      `CPU: ${hardwareInfo.cpu}`,
      `RAM: ${hardwareInfo.ram}`,
      `GPU: ${hardwareInfo.gpu}`,
      `Motherboard: ${hardwareInfo.motherboard}`,
      "",
      `IP Address: ${hardwareInfo.ip}`,
      `MAC Address: ${hardwareInfo.mac}`,
      `OS: ${navigator.userAgent}`,
      `Language: ${navigator.language}`,
      `Resolution: ${screen.width}x${screen.height}`,
      `Browser: ${navigator.userAgent.match(/(Chrome|Firefox|Safari)\/[\d.]+/)[0]}`,
      "Access granted.",
      "",
      "Last Update: 1 Day Ago",
      "Fetching encrypted files...",
      "[          ] 0% Complete",
      "",
      "Bypassing firewall...",
      "Root access: SUCCESS",
    ];

    let currentLine = 0;

    function typeLine(line, callback) {
      let i = 0;
      function typeChar() {
        if (i < line.length) {
          terminal.innerHTML += line.charAt(i);
          i++;
          setTimeout(typeChar, 18);
        } else {
          terminal.innerHTML += '\n';
          callback();
        }
      }
      typeChar();
    }

    function updateProgress(callback) {
      let barLength = 0;
      const max = 10;
      function fill() {
        if (barLength <= max) {
          let bar = '[' + '-'.repeat(barLength) + ' '.repeat(max - barLength) + ']';
          let percent = Math.floor((barLength / max) * 100);
          terminal.innerHTML = terminal.innerHTML.replace(/\[.*?\] \d+% Complete/, `${bar} ${percent}% Complete`);
          barLength++;
          setTimeout(fill, 300);
        } else {
          callback();
        }
      }
      fill();
    }

    function playStartup() {
      try {
        sound.play();
      } catch (e) {
        console.log("Ses oynatılamadı.");
      }
    }

    function runLines() {
      if (currentLine < lines.length) {
        if (lines[currentLine].includes("[          ] 0% Complete")) {
          typeLine(lines[currentLine], () => {
            updateProgress(() => {
              currentLine++;
              runLines();
            });
          });
        } else {
          typeLine(lines[currentLine], () => {
            currentLine++;
            runLines();
          });
        }
      } else {
        setTimeout(() => {
          terminal.style.display = 'none';
          panel.style.display = 'block';
        }, 1000);
      }
    }




    function printLine() {
        if (currentLine < lines.length) {
            const newLine = document.createElement("div");
            newLine.classList.add("terminal-line");
            newLine.textContent = lines[currentLine];
            terminal.appendChild(newLine);
            currentLine++;
            setTimeout(printLine, 18); // Her satır arasındaki süre
        } else {
            // ⏱️ Tüm animasyon bittiğinde "last update" yazısını güncelle
            const now = new Date();
            lastUpdate.textContent = `Last update: ${now.toLocaleString()}`;
        }
        printLine();
    }


        // Sadece Delete tuşuyla başlat
function handleDeleteOnce(e) {
  if (e.key === 'Delete') {
    terminal.innerHTML = ''; // Ekranı temizle
    playStartup();
    runLines();

    setTimeout(() => {
      const lastUpdate = document.getElementById("lastUpdate");
      lastUpdate.textContent = "Last update: 1 Day Ago";
    }, 8500);

    setTimeout(() => {
      const now = new Date();
      const lastUpdate = document.getElementById("lastUpdate");
      lastUpdate.textContent = `Last update: ${now.toLocaleString()}`;
    }, 13500);

    setTimeout(() => {
      const NetworkStatus = document.getElementById("NetworkStatus");
      NetworkStatus.textContent = "Network Status: ONLINE";
    }, 900);

    setTimeout(() => {
      document.getElementById("terminalinput").style.display = "flex";
    }, 15540);

    // Hoş geldiniz mesajını göstermek için bir timer ekleyelim
setTimeout(() => {
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.style.display = "block"; // Hoş geldiniz mesajını göster
}, 15540); // 1 saniye sonra gösterilecek

    // Sadece bir kere çalışmasını sağla
    document.removeEventListener('keydown', handleDeleteOnce);
  }
}

document.addEventListener('keydown', handleDeleteOnce);


    const welcomemessage = document.getElementById("welcome-message");
    const output = document.getElementById("terminal-output");
    const input = document.getElementById("terminalinput");

let hasScanned = false;
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        
        const command = input.value.trim();
        input.value = "";
        
        welcomemessage.textContent = "";
        output.innerHTML += `\n> ${command}`;

        // Basit komutlar
        
        switch (command.toLowerCase()) {
            case "-help":
                 output.innerHTML += `
\nAvailable commands:
\n  -help     → Lists all available commands.
\n  -info     → Displays basic system hardware info.
\n  -users    → Shows list of system users.
\n  -time     → Displays the current system time.
\n  -ip       → Displays your IP address.
\n  -scan     → Scans for infected files.
\n  -whoami   → Displays current user.
\n  -ping     → Sends ping to a server.
\n  -matrix   → Activate matrix mode.
\n  -fortune  → Get a random tip.
\n  -uptime   → Show system uptime
\n  -cpu-load → Show CPU usage.
\n  -version  → Show terminal version.
\n  -os       → Show OS info.
\n  -gnrpass  → Random password generation.
\n  -roll     → Dice rolling.
\n  -cat      → Just cat.
\n  -reboot   → Reboots the terminal.
\n  -clear    → Clears the terminal screen.
`;

                break;
            case "-info":
                output.innerHTML +=`\n \n BIOS: ${hardwareInfo.bios}`,
                output.innerHTML +=`\n \n CPU: ${hardwareInfo.cpu}`,
                output.innerHTML +=`\n \n Motherboard: ${hardwareInfo.motherboard}`,
                output.innerHTML +=`\n \n RAM: ${hardwareInfo.ram}`,
                output.innerHTML +=`\n \n GPU: ${hardwareInfo.gpu} \n`
                break;
            case "-users":
                output.innerHTML += "\n \n Users:\n \n-admin\n-root\n-guest\n-syslog \n";
                break;
                case "-time":
                output.innerHTML += `\n \nCurrent Time: ${new Date().toLocaleTimeString()} \n`;
                break;
            case "-ip":
                output.innerHTML += `\n \nIP Address: ${hardwareInfo.ip} \n`;
                break;
            case "-scan":
              if (!hasScanned) {
                output.innerHTML += `\n \nScanning files...\n`;
                const infected = Math.floor(Math.random() * 50) + 1;
                setTimeout(() => {
                  output.innerHTML += `\nInfected files found: ${infected}\n`;
                  setTimeout(() => {
                    output.innerHTML += `\nStatus: Quarantined\n`;
                    hasScanned = true;
                  }, 1000);
                }, 1500);
              } else {
                output.innerHTML += `\n \nRescanning files...\nNo threats found. System is clean.\n`;
              }
                break;
          case "-ping":
            const ip = hardwareInfo?.ip || `${hardwareInfo?.ip}`;
            const ping1 = Math.floor(Math.random() * 30) + 10;
            const ping2 = Math.floor(Math.random() * 30) + 10;
            const ping3 = Math.floor(Math.random() * 30) + 10;

            const lossChance = Math.random();
            const lostPackets = lossChance < 0.1 ? 1 : 0;
            const receivedPackets = 3 - lostPackets;
            const lossPercent = Math.round((lostPackets / 3) * 100);

            const min = Math.min(ping1, ping2, ping3);
            const max = Math.max(ping1, ping2, ping3);
            const avg = Math.round((ping1 + ping2 + ping3) / 3);

            let delay = 0;

            setTimeout(() => {          
              output.innerHTML += `\n\nPinging google.com [${hardwareInfo?.ip}] with 32 bytes of data...`;
            }, delay += 500);
          
            setTimeout(() => {          
              output.innerHTML += `\nReply from ${hardwareInfo?.ip}: bytes=32 time=${ping1}ms TTL=117`;
            }, delay += 600);
          
            setTimeout(() => {
              if (lostPackets < 1) {          
                output.innerHTML += `\nReply from ${hardwareInfo?.ip}: bytes=32 time=${ping2}ms TTL=117`;
              } else {
                output.innerHTML += `\nRequest timed out.`;
              }
            }, delay += 600);
          
            setTimeout(() => {
    output.innerHTML += `\nReply from ${hardwareInfo?.ip}: bytes=32 time=${ping3}ms TTL=117`;
            }, delay += 600);
          
            setTimeout(() => {
              output.innerHTML += `\n\nPing statistics for ${hardwareInfo?.ip}:\n    Packets: Sent = 3, Received = ${receivedPackets}, Lost = ${lostPackets} (${lossPercent}% loss),`;
            }, delay += 800);
          
            setTimeout(() => {
              output.innerHTML += `\nApproximate round trip times in milli-seconds:\n    Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms\n`;
            }, delay += 600);

            break;

case "-matrix":
    output.innerHTML += "\n\n[Matrix mode enabled]\n";

    const colCount = Math.floor(Math.random() * 3) + 3; // 3-5 sütun
    const heights = Array.from({ length: colCount }, () => Math.floor(Math.random() * 6) + 5); // her biri 5-10 satır
    const buffers = Array(colCount).fill("");

    let step = 0;
    const interval = setInterval(() => {
        let line = "";

        for (let i = 0; i < colCount; i++) {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            buffers[i] += `<span class="matrix-char">${char}</span>\n`;

            const lines = buffers[i].split("\n");
            if (lines.length > heights[i]) {
                buffers[i] = lines.slice(1).join("\n");
            }
        }

        for (let row = 0; row < Math.max(...heights); row++) {
            let rowStr = "";
            for (let i = 0; i < colCount; i++) {
                const lines = buffers[i].split("\n");
                rowStr += lines[row] ? lines[row] + "   " : "     ";
            }
            line += rowStr + "\n";
        }

        output.innerHTML += "\n" + line;
        output.scrollTop = output.scrollHeight;

        step++;
        if (step >= 28) {
            clearInterval(interval);
            output.innerHTML += "\n\n[Matrix mode ended]\n";
        }
    }, 200);
    break;


    case "-fortune":
    const fortunes = [
      "The cake is a lie.",
      "404: Fortune not found.",
      "Sometimes the best command is no command.",
      "Try turning it off and on again.",
      "You are the system administrator. Fear you must.",
      "I love Asude very much.",
      "You will win if you don’t quit.",
      "If opportunity doesn’t knock, buiId a door.",
      "Before you  judge me, Make sure that you’re perfect.",
      "Sometimes you need to travel a long way to find what is near.",
      "Silence is the most powerful scream.",
      "If you want to shine like the sun, first burn like the sun.",
      "You never know how strong you are, until being strong is your only choice.",
      "Be not afraid of going slowly, be afraid only of standing still.",
      "Everything has beauty, but not everyone sees it.",
      "Learn from yesterday, live for today, hope for tomorrow.",
      "Choose a job you love, and you will never have to work a day in your life.",
      "If life is a journey, I am a traveler.",
      "Memories last forever..."
    ];
    output.innerHTML += `\n\n💡 ${fortunes[Math.floor(Math.random() * fortunes.length)]}\n`;
    break;


    case "-cpu-load":
    const load = (Math.random() * 100).toFixed(2);
    output.innerHTML += `\n\nCPU Load: ${load}%\n`;
    break;

            case "-version":
                  output.innerHTML += `\n\nCMD Simulator v1.0.3 (build 2025.05.14)\n`;
            break;

            /**/
            case "-roll":
    const dice = [6, 20, 100];
    const roll = dice[Math.floor(Math.random() * dice.length)];
    const result = Math.floor(Math.random() * roll) + 1;
    output.innerHTML += `\n\n🎲 You rolled a d${roll}: ${result}`;
    break;
/**/
    case "-gnrpass":
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    output.innerHTML += `\n\n🔐 Generated password: ${password}`;
    break;
/**/ 
    case "-cat":
    output.innerHTML += `\n\n /\\_/\\\n( o.o )\n > ^ <\nHere’s a terminal cat for you.`;
    break;

    case "-game":
    const number = Math.floor(Math.random() * 5) + 1;
    output.innerHTML += `\n\nGuess the number between 1 and 5 (type -guess <number>)`;
    window.secretNumber = number; // Global değişken
    break;

case "-guess":
    const guess = parseInt(args[1]); // "-guess 3" şeklinde çalışmalı
    if (!window.secretNumber) {
        output.innerHTML += `\n\nYou need to start the game first using -game`;
    } else if (guess === window.secretNumber) {
        output.innerHTML += `\n\n🎉 Correct! You guessed the number!`;
        delete window.secretNumber;
    } else {
        output.innerHTML += `\n\n❌ Nope, try again.`;
    }
    break;



            case "-os":
    output.innerHTML += `\n\n${navigator.userAgent} \n`;
    break;

          case "-uptime":
    const uptime = Math.floor(performance.now() / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    output.innerHTML += `\n\nSystem Uptime: ${hours}h ${minutes}m ${Math.floor(seconds)}s\n`;
    break;




            case "-reboot":
                 output.innerHTML += "\n \nSystem rebooting...";
                  setTimeout(() => {
                      location.reload();
                  }, 2000); // 2 saniye sonra F5 atar
                break;
                case "-whoami":
                  output.innerHTML += "\n \n t1b@localhost";
                break;
            case "-clear":
                output.innerHTML = "";
                break;
            default:
                output.innerHTML += `\nUnknown command: ${command}`;
        }

        output.scrollTop = output.scrollHeight; // Aşağı kaydır
    }
});
