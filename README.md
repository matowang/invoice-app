## ๐ Getting Started

1. Make a copy of `.env.example` and rename to `.env.local`

2. Run the [Invoice Rest API](https://git.toptal.com/vishal-shah/invoicebackendapi)

3. Run the following

```bash
npm run dev
# or
yarn dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ๐งช Testing

### Cypress e2e

Open Cypress

```
npm run cypress
```

Run the following to save results

```
npx cypress run --spec cypress/e2e/auth/onboarding.cy.js --record --key 418a52e9-ea43-4374-b165-47f1f20282d5 cypress
```

### Jest snapshot

```
npm run jest
```

## ๐ Tech Stack

### โ๏ธ React
### โ๏ธ TypeScript
### โ๏ธ NextJS
### โ๏ธ React Query _Global Server State_

- Mutations
- Syncing State

### โ๏ธ Zustand _Immutable Global State_

- Auth State
- Alert Toast State

### โ๏ธ GraphQL

- Clients API
- Add Clients API

### โ๏ธ Jest _Snapshot Testing_

- FillTable
- InvoiceForm
- TableDataHeader
- TableRowStatus

### โ๏ธ Cypress _E2E Testing_

- add invoice
- invoices table
- clients table
- login _( forked from [Vlad](https://git.toptal.com/vishal-shah/invoiceapi-testcases) )_
- onboarding _( forked from [Vlad](https://git.toptal.com/vishal-shah/invoiceapi-testcases) )_
- signup _( forked from [Vlad](https://git.toptal.com/vishal-shah/invoiceapi-testcases) )_
- add & edit client _( forked from [Vlad](https://git.toptal.com/vishal-shah/invoiceapi-testcases) )_
- dashboard _( forked from [Vlad](https://git.toptal.com/vishal-shah/invoiceapi-testcases) )_

### โ Angular

---

## ๐ Thank You! ๐

Thank you Vlad for all the lessons! And thank you everyone who was involved.
