## Getting Started

1. Make a copy of `.env.example` and rename to `.env.local`

2. Run the following

```bash
npm run dev
# or
yarn dev
```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

### Cypress e2e

```
npx cypress run --spec cypress/e2e/auth/onboarding.cy.js --record --key 418a52e9-ea43-4374-b165-47f1f20282d5 cypress
```

### Jest snapshot

```
npm run jest
```
