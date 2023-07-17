#### How to using Prisma for database
- [x] Step 1: Install Prisma
- [x] Step 2: Create Prisma project
- [x] Step 3: Create Prisma schema
- [x]  Step 4: Deploy Prisma schema
- [x]  Step 5: Generate Prisma client = npx prisma generate
- [x] Step 6 : Push Prisma schema to Prisma server = npx prisma db push


```js
Function onCopy
    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to clipboard.");
    };
```

- start webhook for stripe => stripe listen --forward-to localhost:4242/webhook
