--- MARVEL COMICS API ---

- [Run Development](#run-development)
  - [Backend](#backend)
    - [First steps](#first-steps)

# Run Development
## Backend
### First steps
  1. Have installed node 14.0+ and npm
  2. Configure environment (clone api/config/.env.example to .env.development and fill info)
  3. Install PostgreSQL (optional: install docker) or configure postgresql server on cloud and get the connection url
  4. Install api packages

```bash
cd api/config
cp .env.example .env.development
```

```bash
cd api && npm install
npm run docker:dev
or
npm run dev
```

