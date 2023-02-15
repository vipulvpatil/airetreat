# Database future plans.

The database is currently shared by the backend Go service. In order to keep things sane, we are going to stick to a set of rules mentioned below.

* The Node Service will handle all database schema changes via the [migration tool provided with prisma](https://www.prisma.io/docs/concepts/components/prisma-migrate).

* The Node Service will do signin/signup related writes to the database via NextAuth but will not do any other writes.

* Apart from the above mentioned usecase, the Node service will not do any writes to the database but instead use the Go service for writes.

* The Node service will continue to read from the database for simple READ queries but will rely on Go Service for any complex reads.

## Update Test DB schema in Go Service

After running the migration, run the adjoining script as follows and replace the generated SQL file into the appropriate folder in Go Service.

```
./db/dump_db_schema.sh
```
