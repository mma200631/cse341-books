# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required book fields:

* `id`: string, required, custom id such as `b1`
* `authorId`: string, required, references the `id` field of an author document
* `title`: string, required
* `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors

Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books

Purpose: Return all books.

Success:

* Status code: `200`
* Response body: an array of book objects

Errors:

* `500` if an unexpected server or database error occurs

#### GET /books/:id

Purpose: Return one book by its custom id.

Success:

* Status code: `200`
* Response body: the matching book object

Errors:

* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

#### POST /books

Purpose: Create a new book.

Request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Success:

* Status code: `201`
* Response body: the newly created book object

Errors:

* `400` if a required field is missing
* `400` if the `id` already exists
* `400` if the `authorId` does not match an existing author
* `500` if an unexpected server or database error occurs

#### PUT /books/:id

Purpose: Update an existing book.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

Success:

* Status code: `200`
* Response body: the updated book object

Errors:

* `400` if a required field is missing
* `400` if the `authorId` does not match an existing author
* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

* Status code: `204`
* Response body: none

Errors:

* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every book route.

### Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

### Goal

Add an `authors` collection to the Books API and provide full CRUD operations for author documents. Every author route must be documented and testable in Swagger.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

* `id`: string, required, custom id such as `a1`
* `name`: string, required
* `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books

Books reference authors through the book's `authorId` field.

An author may be referenced by one or more books.

An author should not be deleted while one or more books still reference that author's `id`.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

* Status code: `200`
* Response body: an array of author objects

Errors:

* `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by their custom id.

Success:

* Status code: `200`
* Response body: the matching author object

Errors:

* `404` if no author exists with that id
* `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

```
{
  "id": "a1",
  "name": "Maya Rivera",
  "birthYear": 1985
}
```

Success:

* Status code: `201`
* Response body: the newly created author object

Errors:

* `400` if a required field is missing
* `400` if the `id` already exists
* `400` if `birthYear` is not a valid number
* `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

```
{
  "name": "Maya Rivera",
  "birthYear": 1985
}
```

Success:

* Status code: `200`
* Response body: the updated author object

Errors:

* `400` if a required field is missing
* `400` if `birthYear` is not a valid number
* `404` if no author exists with that id
* `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

Purpose: Delete an existing author.

Before deleting an author, the API must check whether any book has an `authorId` matching the author's `id`.

If books still reference the author, the API must not delete the author.

Success:

* Status code: `204`
* Response body: none

Errors:

* `404` if no author exists with that id
* `409` if the author is still referenced by one or more books
* `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every author route, including:

* Request body schemas
* Path parameters
* Success responses
* Error responses
* The `409` response for attempting to delete an author who still has books

### Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.




# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the Week 01 Books API to support complete CRUD operations and replace the author's name with an `authorId` reference.

### Data Model

Book documents are stored in the `books` collection.

Required fields:

* `id`: string, unique and required
* `authorId`: string, required, must reference an existing author `id`
* `title`: string, required
* `publicationDate`: string, required, using the `YYYY-MM-DD` format

The API will use the custom `id` value in route parameters rather than MongoDB `_id`.

The custom `id` must be unique within the `books` collection.

### Author Relationship

Each book must reference an existing author through `authorId`.

When creating or updating a book:

1. Validate that all required fields are present.
2. Validate that the referenced author exists.
3. Reject the request with `400` if the author does not exist.

Books must not contain an author name as a replacement for `authorId`.

### GET /books

Returns all books.

Success:

* `200`
* JSON array of book objects

Errors:

* `500` for unexpected server or database errors

### GET /books/:id

Returns one book by custom `id`.

Success:

* `200`
* JSON book object

Errors:

* `404` if the book does not exist
* `500` for unexpected server or database errors

### POST /books

Creates a new book.

Required request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Responses:

* `201` with the created book
* `400` if required fields are missing
* `400` if the book `id` already exists
* `400` if `authorId` does not reference an existing author
* `500` for unexpected server or database errors

The API must not return database error details or stack traces to the client.

### PUT /books/:id

Updates an existing book.

The `id` is supplied in the URL and cannot be changed.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

Responses:

* `200` with the updated book
* `400` if a required field is missing
* `400` if `authorId` does not reference an existing author
* `404` if the book does not exist
* `500` for unexpected server or database errors

### DELETE /books/:id

Deletes an existing book.

Responses:

* `204` with no response body when deletion succeeds
* `404` if the book does not exist
* `500` for unexpected server or database errors

### Swagger

Every book route must include OpenAPI 3 documentation with:

* Route and HTTP method
* Summary or description
* Tags
* Path parameters where required
* Request body schemas where required
* Success responses
* Error responses

### Security and Validation

The API must validate request data before writing to MongoDB.

Unexpected database errors must be logged appropriately on the server but must not expose internal database details or stack traces to API clients.

## Feature 2: Author CRUD Operations

### Goal

Add complete CRUD operations for authors and maintain a safe relationship between authors and books.

### Data Model

Author documents are stored in the `authors` collection.

Required fields:

* `id`: string, unique and required
* `name`: string, required
* `birthYear`: number, required

Authors use custom string ids such as `a1` for route parameters.

The custom `id` must be unique within the `authors` collection.

### Relationship to Books

A book references an author through `authorId`.

An author may have zero, one, or many books.

An author cannot be deleted while books reference the author's `id`.

### GET /authors

Returns all authors.

Success:

* `200`
* JSON array of author objects

Errors:

* `500` for unexpected server or database errors

### GET /authors/:id

Returns one author.

Success:

* `200`
* JSON author object

Errors:

* `404` if the author does not exist
* `500` for unexpected server or database errors

### POST /authors

Creates an author.

Request body:

```
{
  "id": "a1",
  "name": "Maya Rivera",
  "birthYear": 1985
}
```

Responses:

* `201` with the created author
* `400` if a required field is missing
* `400` if the `id` already exists
* `400` if `birthYear` is not a valid number
* `500` for unexpected server or database errors

The API must not expose database error details or stack traces.

### PUT /authors/:id

Updates an existing author.

The `id` in the URL identifies the author and cannot be changed.

Request body:

```
{
  "name": "Maya Rivera",
  "birthYear": 1985
}
```

Responses:

* `200` with the updated author
* `400` if a required field is missing
* `400` if `birthYear` is not a valid number
* `404` if the author does not exist
* `500` for unexpected server or database errors

### DELETE /authors/:id

Deletes an author only when no books reference the author.

Before deletion, the API must check the `books` collection for documents where `authorId` equals the author's `id`.

If at least one book references the author:

* Return `409`
* Do not delete the author
* Return a JSON error message such as:

  {
  "message": "Cannot delete author because books still reference this author"
  }

If no books reference the author:

* Delete the author
* Return `204`
* Return no response body

Other errors:

* `404` if the author does not exist
* `500` for unexpected server or database errors

### Swagger

Every author route must have complete OpenAPI 3 documentation, including:

* Request body schemas
* Path parameters
* Success responses
* Error responses
* The `409` response for an author that is still referenced by books

### Validation and Security

The API must validate input before writing to MongoDB.

The API should reject malformed or incomplete request data rather than allowing invalid documents into the database.

Unexpected server or database errors must not expose stack traces, database connection details, or other internal implementation details to clients.

### Deployment Expectations

After implementation, all book and author routes must work locally and on the deployed Render application.

The deployed `/api-docs` Swagger UI must document and allow testing of every route.
