#!/bin/sh
npx prisma db push;
npx prisma generate;
npm start;