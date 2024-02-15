# Note Taking App

A simple app that let's you add, retrieve, update and delete notes.

## Assumptions

- A note will contain the following properties and formats
  - `title`: string
    - Should not exceed 50 characters
  - `body`: string
    - Should not exceed 500 characters
  - `id`: number
- Creating a note
  - `title` is required
  - `body` is optional
  - A newly created note will have a unique ID that is automatically generated by the app.
  - Successful creation of note will return:
    - Status code `201`
    - JSON data of the newly added note
- Retrieving all note will return status code `200` and all note records in JSON format.
- Retrieving a specific note
  - `id` is required
  - Successful retrieval of a specific note will return:
    - Status code `200`
    - A note entry matching the specified ID in JSON format
  - When no note entry that matches the ID is found, the app will return
    - Status code `404`
    - Message: "Note not found"
- Updating a specific note
  - `id` is required
  - `title` can be edited but is optional
  - `body` can be edited but is optional
  - When ID matches an existing note, it will be updated using the provided inputs.
    - Successful update of a specific note will return:
      - Status code `200`
      - JSON data of the updated note
  - When no ID matches an exisitng note, a new note entry will be created.
    - Successful creation of new note will return:
      - Status code `201`
      - JSON data of the newly added note
- Deleting a specific note
  - `id` is required
  - This will remove the specific note specified by the ID.
  - Successful deletion of a specific note will return status code `204` with no content.
  - Deleting a non-existing entry will just return status code `204`.
- Invalid resource path will return status code 404 with "Resource not found" message
- Failed CRUD (create, read, update, delete) operations will return status code `500`
- Faild validation of input data will return status code `422` with its corresponding error message listing the input with errors

## Getting Started

1. Install the dependencies
   - Node.js - See [Install Node.js](https://nodejs.org/en/download/)
   - Tool for testing API like cURL or Postman
2. Build and run the project using the following commands:
   - `npm run build`
   - `npm run start`
3. Use the Note Taking APIs by running cURL commands
   1. Create a note

        Request

        ```bash
        curl --location 'http://localhost:3001/notes' \
        --header 'Content-Type: application/json' \
        --data '{
            {
                "title": "Adding a note",
                "body": "Hello World!"
            }
        }'
        ```

        Response

        ```javascript
        Status: 201 Created
        ```

        ```json
        {
            "id": 4,
            "body": "Adding a note",
            "title": "Hello World!"
        }
        ```

   2. Retrieve all notes

        Request

        ```bash
        curl --location --request GET 'http://localhost:3001/notes/'
        ```

        Response

        ```javascript
        Status: 200 OK
        ```

        ```json
        [
            {
                "id": 1,
                "title": "TV series",
                "body": "Doom Patrol, The Umbrella Academy, Foyle's War, Miss Marple"
            },
            {
                "id": 2,
                "title": "To Do's",
                "body": "Read books\nBake cookies\nListen to classical music"
            },
            {
                "id": 3,
                "title": "Famous People",
                "body": "Ralph Waldo Emerson, Nikola Tesla, Edgar Allan Poe"
            },
            {
                "id": 4,
                "body": "Adding a note",
                "title": "Hello World!"
            }
        ]
        ```

   3. Retrieve a specific note

        Request

        ```bash
        curl --location 'http://localhost:3001/notes/1'
        ```

        Response

        ```javascript
        Status: 200 OK
        ```

        ```json
        {
            "id": 1,
            "title": "TV series",
            "body": "Doom Patrol, The Umbrella Academy, Foyle's War, Miss Marple"
        }
        ```

   4. Update a specific note
      1. Update an existing note

            Request

            ```bash
            curl --location --request PUT 'http://localhost:3001/notes/1' \
            --header 'Content-Type: application/json' \
            --data '{
                "title": "My TV series!"
            }'
            ```

            Response

            ```javascript
            Status: 200 OK
            ```

            ```json
            {
                "id": 1,
                "title": "My TV series!",
                "body": "Doom Patrol, The Umbrella Academy, Foyle's War, Miss Marple"
            }
            ```

      2. Update non-existing note

            ```bash
            curl --location --request PUT 'http://localhost:3001/notes/10' \
            --header 'Content-Type: application/json' \
            --data '{
                "title": "Updating a non existing note",
                "body": "How you doing?"
            }'
            ```

            Response

            ```javascript
            Status: 201 Created
            ```

            ```json
            {
                "id": 5,
                "body": "Updating a non existing note",
                "title": "Adding note #5"
            }
            ```

   5. Delete a specific note

        Request

        ```bash
        curl --location --request DELETE 'http://localhost:3001/notes/1'
        ```

        Response

        ```javascript
        Status: 204 No Content
        ```

   6. Retrieve a non-existing note

        Request

        ```bash
        curl --location 'http://localhost:3001/notes/10'
        ```

        Response

        ```javascript
        Status: 404 No Found
        Body: Note not found.
        ```

   7. Retrieve a specific note with *invalid* id

        Request

        ```bash
        curl --location 'http://localhost:3001/notes/invalid' 
        ```

        Response

        ```javascript
        Status: 422 Unprocessable Entity
        ```

        ```json
        {
            "errors": [
                {
                    "type": "field",
                    "value": "invalid",
                    "msg": "Id must be a number",
                    "path": "id",
                    "location": "params"
                }
            ]
        }
        ```

   8. No resource path

        Request

        ```bash
        curl --location 'http://localhost:3001/app'
        ```

        Response

        ```javascript
        Status: 404 No Found
        Body: Resource not found.
        ```

---

## Original Project Requirements

### Objective

Develop a simple backend for a note-taking application using TypeScript, Node.js, and Express (or similar framework e.g. fastify, koa, etc.).

### Project Description

Create a RESTful API that allows users to create, retrieve, update, and delete notes. Each note can consist of a title and a body.

### Specific Requirements

1. API Endpoints:
`POST /notes`: Create a new note.
`GET /notes`: Retrieve all notes.
`GET /notes/:id`: Retrieve a specific note by ID.
`PUT /notes/:id`: Update a specific note.
`DELETE /notes/:id`: Delete a specific note.
2. Data Storage: Use an in-memory array or a simple file-based solution to store notes.
3. Data Validation: Validate input data for creating and updating notes.
4. Error Handling: Basic error handling for common scenarios (e.g., note not found).
