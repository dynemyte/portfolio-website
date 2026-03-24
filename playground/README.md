# Playground

Isolated React + Chakra UI playground copied from the app's `modules/playground` so you can experiment safely without affecting the main project.

## Run

```bash
npm install
npm run dev
```

## Other scripts

```bash
npm run build
npm run lint
npm run preview
```

## Chakra MCP server

MCP config is in `.vscode/mcp.json` and uses:

- server name: `chakra-ui`
- command: `npx -y @chakra-ui/mcp@latest serve`

Open this `playground/` folder as its own VS Code workspace to use it independently from the main app.
