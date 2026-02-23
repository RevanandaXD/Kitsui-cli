# 🦊 Kitsui CLI

> A powerful command-line assistant to kickstart new projects and streamline your development workflow.

Kitsui (Kitsu CLI) is a versatile CLI tool packed with helpful utilities like project initialization, local tunneling, static file serving, API mocking, deployment, and git automation.

---

## 📦 Installation

You can install Kitsui globally using npm:

```bash
npm install -g kitsui
```

_(Note: If you haven't published it yet, you can link it locally by running `npm link` inside the project directory)._

---

## 🚀 Usage

Using Kitsui is very straightforward. Simply type `kitsui` followed by the command you want to run:

```bash
kitsui <command> [options]
```

To see the list of all available commands directly in your terminal, run:

```bash
kitsui help
```

---

## 🛠️ Available Commands

Here are the commands you can use to boost your productivity:

### 🌟 Core Commands

- **`kitsui init`**  
  Initialize and create a new project. Sets up the boilerplate so you can start coding right away.
- **`kitsui deploy`**  
  Deploy your project to a hosting provider quickly and easily.

### 🌐 Development Tools

- **`kitsui tunnel`**  
  Expose your local development server to the internet. Perfect for testing webhooks or sharing your work with clients.
- **`kitsui live`**  
  Starts a `live-server` with hot-reload for lightning-fast frontend development.
- **`kitsui serve`**  
  Spins up a simple static file server for the current directory.
- **`kitsui json`**  
  Mock a REST API based on a `db.json` file. Instantly get a fake backend to test your frontend against.

### ⚙️ Utilities

- **`kitsui git`**  
  Git automation tools to help you commit and push without the hassle.
- **`kitsui ignore`**  
  Automatically generate `.gitignore` files tailored for your specific tech stack.

- **`kitsui hello`**  
  Display a friendly hello message! 🦊

- **`kitsui test`**  
  Run testing tools configured for your project.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📄 License

This project is licensed under the **ISC License**.

---

_Built with ❤️ by revananda._
