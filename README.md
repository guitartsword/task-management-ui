This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

This are the recommended versions of each tool to use:
* node (>= v18.0.0)
* npm (>= v10.7.0)
* Clone and run the [API server running](https://github.com/guitartsword/task-management-api)
* Docker (Optional >=25.02)


## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy 

### Vercel (Recommended by next.js)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Deploy with Docker
Build image and use it with the correct [Environmental Variables](#environmental-variables)
```sh
docker build -t task-management-ui .
```

Example on how to run the image if you are running the backend with docker compose
```sh
docker run --rm --name task-management-ui -p 3000:3000 -it -e API_BASE_URL=http://fastapi:8000/api/v1 -e NEXTAUTH_SECRET=nnys3cr37917nmc1 -e NEXTAUTH_URL=http://localhost:3000 --network=task-management-api_default task-management-ui
```

### Environmental Variables

This are the required environmental variables to have in a production environment:
```sh
API_BASE_URL=
# https://next-auth.js.org/configuration/options#environment-variables
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## Improvements

* Add linting and pre-comimt
* Add react-testing-library and vitest to add unit tests and integration tests
* Add e2e with playwright
