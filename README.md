<div align="center">

# 🦊 Kitsui CLI

**Your all-in-one command-line assistant for modern development workflows.**

[![npm version](https://img.shields.io/npm/v/kitsui-cli?style=for-the-badge&color=FF6B00&labelColor=1a1a2e)](https://www.npmjs.com/package/kitsui-cli)
[![license](https://img.shields.io/npm/l/kitsui-cli?style=for-the-badge&color=fcd12a&labelColor=1a1a2e)](./LICENSE)
[![node](https://img.shields.io/node/v/kitsui-cli?style=for-the-badge&color=BB1900&labelColor=1a1a2e)](https://nodejs.org)

<br/>

<img src="https://static.wikia.nocookie.net/sewayaki-kitsune-no-senkosan/images/0/0a/Senko.png/revision/latest/scale-to-width-down/1200?cb=20190425152125" alt="Kitsui Mascot" width="300"/>

<br/>

*Kitsui (Kitsu CLI) is a versatile CLI tool packed with helpful utilities — from scaffolding new projects, running dev servers, and testing web performance, to managing Docker containers and todo lists. All from your terminal.* 🚀

</div>

---

## ⚡ Quick Start

```bash
# Install globally
npm install -g kitsui-cli

# Verify installation
kitsui --version

# See all available commands
kitsui help
```

```
  ██╗  ██╗██╗████████╗███████╗██╗   ██╗██╗
  ██║ ██╔╝██║╚══██╔══╝██╔════╝██║   ██║██║
  █████╔╝ ██║   ██║   ███████╗██║   ██║██║
  ██╔═██╗ ██║   ██║   ╚════██║██║   ██║██║
  ██║  ██╗██║   ██║   ███████║╚██████╔╝██║
  ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝ 2.0.0
```

---

## 📖 Usage

```bash
kitsui <command> [options]
```

---

## 🛠️ Commands

### 🏗️ Project Generators

| Command | Description |
|---------|-------------|
| `kitsui backend` | Scaffold a new **backend** project with pre-configured boilerplate |
| `kitsui frontend` | Scaffold a new **frontend** project with your preferred framework |

### 🌐 Development Servers

| Command | Description |
|---------|-------------|
| `kitsui live` | Start a **live-server** with hot-reload for rapid frontend development |
| `kitsui serve` | Spin up a simple **static file server** for the current directory |
| `kitsui json` | Mock a **REST API** from a `db.json` file — instant fake backend |
| `kitsui tunnel` | Expose your **local server** to the internet via secure tunnel |

### 🔍 Testing & Performance

| Command | Description |
|---------|-------------|
| `kitsui speed` | Run an internet **speed test** directly from the terminal |
| `kitsui webperf <url>` | Analyze **web performance** metrics for any URL |
| `kitsui traffic <url> <n>` | Send **N requests** to a URL and log status codes |
| `kitsui test` | Run **testing tools** configured for your project |

### 🚀 Deployment & Git

| Command | Description |
|---------|-------------|
| `kitsui deploy` | **Deploy** your project to a hosting provider |
| `kitsui git` | **Git automation** — commit, push, and manage repos with ease |
| `kitsui ignore` | Auto-generate **`.gitignore`** files tailored to your tech stack |

### 🧰 Utilities

| Command | Description |
|---------|-------------|
| `kitsui time <city>` | Display the **current time** in any city worldwide 🌍 |
| `kitsui todo <args>` | Manage a **todo list** right from your terminal ✅ |
| `kitsui docker <args>` | Manage **Docker** containers and images 🐳 |
| `kitsui doctor` | **System health check** — verify your dev environment is ready |
| `kitsui clean` | **Clean cache** and temporary project files |
| `kitsui hello` | Display a friendly **hello** message 🦊 |

---

## 📦 Tech Stack

| Package | Purpose |
|---------|---------|
| [Commander.js](https://github.com/tj/commander.js) | Command-line interface framework |
| [Chalk](https://github.com/chalk/chalk) | Terminal string styling |
| [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) | Interactive prompts |
| [Figlet](https://github.com/patorjk/figlet.js) | ASCII art text |
| [fs-extra](https://github.com/jprichter/node-fs-extra) | Enhanced file system methods |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Feel free to check the [issues page](../../issues) for open issues.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

**Built with ❤️ by [revananda](https://github.com/revananda)**

<sub>If you find Kitsui helpful, consider giving it a ⭐ on GitHub!</sub>

</div>
