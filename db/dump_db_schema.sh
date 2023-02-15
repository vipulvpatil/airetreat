#!/bin/zsh

# Note: Use the output of this to populate test DB in socialmine-go tests.
# TODO: Rethink this in the future.



npx prisma migrate diff --from-empty --to-url $DATABASE_URL --script > database_schema_test.sql
