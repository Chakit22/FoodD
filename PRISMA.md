# PRISMA NOTES

This document is for any information regarding PRISMA

## Relation

- Relation fields are fields on a Prisma model that do not have a scalar type. Instead, their type is another model.

- Every relation must have exactly two relation fields, one on each model. In the case of one-to-one and one-to-many relations, an additional relation scalar field is required which gets linked by one of the two relation fields in the @relation attribute. This relation scalar field is the direct representation of the foreign key in the underlying database.

- Refer to this link : (https://www.prisma.io/docs/orm/prisma-schema/data-model/relations#relation-fields)[https://www.prisma.io/docs/orm/prisma-schema/data-model/relations#relation-fields]

Important: Two relation fields: author and posts. Relation fields define connections between models at the Prisma ORM level and do not exist in the database. These fields are used to generate Prisma Client.
