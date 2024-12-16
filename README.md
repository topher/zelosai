# zelosai

### Installation
```
git clone 
git checkout -b new_branch
npm install 
npm run dev
```

### Routing: 
- Next.js v13 app router... folders in round brackets () are not picked up

### API Routes: 
- API Directory
- TBD

### Styling:
- Shadcn and tailwind
- ```shadcn-ui@latest add select badge scrollArea separator input resizable scroll-area tabs tooltip dropdown-menu avatar button label popover switch textarea calendar context-menu menubar```
### Authentication / Authorization
- Todo: get clerk middleware, but leave everything open, and protect in app router .... If that doesnt work handle in the handler itself

### Blog Integration
- Either Ghost.io or another opensource markdown -> static site

### Data Fetching: 
- Explain different data-fetching strategies (getStaticProps, getServerSideProps, SWR).

### Elasticsearch

### Performance Optimization: 
- Build before using
- Bug: Chris experience very slow with 

### Deployment: 
- GitHub for version control.
- Vercel for CI/CD in Staging/Prod environments.


Sure! Below is a comprehensive `SETUP.md` markdown file that you can include in your project repository. This guide will help your teammate set up Elasticsearch using Docker and manage it seamlessly with npm commands, without needing any prior experience with Docker, backends, or Elasticsearch.

---

# Project Setup Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Steps](#setup-steps)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Create a `.env` File](#2-create-a-env-file)
    - [3. Install Dependencies](#3-install-dependencies)
    - [4. Start Elasticsearch](#4-start-elasticsearch)
    - [5. Wait for Elasticsearch to be Ready](#5-wait-for-elasticsearch-to-be-ready)
    - [6. Import Data into Elasticsearch](#6-import-data-into-elasticsearch)
    - [7. Replace an Existing Index](#7-replace-an-existing-index)
    - [8. Check Elasticsearch Status](#8-check-elasticsearch-status)
    - [9. Stop Elasticsearch](#9-stop-elasticsearch)
3. [Additional Notes](#additional-notes)
4. [Troubleshooting](#troubleshooting)
5. [Useful Commands](#useful-commands)

---

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **Docker**: [Download and Install Docker](https://www.docker.com/get-started)
- **Git**: [Download and Install Git](https://git-scm.com/downloads)

---

## Setup Steps

### 1. Clone the Repository

Start by cloning the project repository to your local machine.

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

*Replace `<your-repo-url>` with the URL of your repository and `<your-repo-directory>` with the name of the directory.*

### 2. Create a `.env` File

Create a `.env` file in the root directory of the project to store environment variables securely.

```bash
touch .env
```

Open the `.env` file in your preferred text editor and add the following content:

```dotenv
# .env
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=your_secure_password
ELASTICSEARCH_URL=http://localhost:9200
```

**Important:** Replace `your_secure_password` with a strong password of your choice.

### 3. Install Dependencies

Install the necessary project dependencies using npm.

```bash
npm install
```

### 4. Start Elasticsearch

Use the provided npm script to start Elasticsearch using Docker. This command will run Elasticsearch in detached mode.

```bash
npm run es:start
```

**What It Does:**

- Pulls the Elasticsearch Docker image (version 8.9.0).
- Sets up environment variables for Elasticsearch.
- Exposes ports `9200` (HTTP) and `9300` (transport).
- Persists Elasticsearch data in a Docker volume named `es_data`.

### 5. Wait for Elasticsearch to be Ready

Before performing any operations, ensure that Elasticsearch is fully up and running.

```bash
npm run wait-for-es
```

**Expected Output:**

```
Elasticsearch is up and running.
```

*If Elasticsearch isn't ready yet, the script will retry for a specified number of times before exiting with an error.*

### 6. Import Data into Elasticsearch

Perform a bulk import of your JSON data into Elasticsearch using the provided npm script.

```bash
npm run es:import
```

**What It Does:**

- Starts Elasticsearch (if not already running).
- Waits for Elasticsearch to be ready.
- Executes the `import-data.js` script located in `utils/scripts/`.
- Reads all JSON files from `utils/json-output/`.
- Uploads data to the corresponding Elasticsearch indices.
- Utilizes optional mapping files from `utils/json-output/mappings/` if available.

**Note:** Ensure that your JSON files are correctly formatted and located in `utils/json-output/`.

### 7. Replace an Existing Index

To replace a specific Elasticsearch index, use the following command. Replace `<indexName>` with the name of the index you want to replace.

```bash
npm run es:replace-index -- <indexName>
```

**Example:**

```bash
npm run es:replace-index -- users
```

**What It Does:**

- Starts Elasticsearch (if not already running).
- Waits for Elasticsearch to be ready.
- Executes the `replace-index.js` script located in `utils/scripts/`.
- Deletes the existing index named `<indexName>`.
- Creates a new index with optional mappings from `utils/json-output/mappings/<indexName>_mapping.json`.
- Uploads the new data from `utils/json-output/<indexName>.json`.

**Note:** Ensure that the corresponding JSON and mapping files exist in the `utils/json-output/` directory.

### 8. Check Elasticsearch Status

Verify that Elasticsearch is running and check its status.

```bash
npm run es:status
```

**Expected Output:**

```
Name          Command               State    Ports
------------------------------------------------------------
elasticsearch docker-entrypoint.sh  Up       0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp
```

*This output confirms that Elasticsearch is up and running, and the necessary ports are exposed.*

### 9. Stop Elasticsearch

When you're done working with Elasticsearch, you can stop and remove the Elasticsearch container using the following command:

```bash
npm run es:stop
```

**What It Does:**

- Stops the Elasticsearch Docker container.
- Removes the container from your system.

---

## Additional Notes

- **Elasticsearch Credentials:**  
  - **Username:** `elastic`  
  - **Password:** Defined in your `.env` file (`ELASTIC_PASSWORD`)
  
  *Ensure that you keep your credentials secure and do not share the `.env` file.*

- **Port Conflicts:**  
  - **Elasticsearch Ports:** `9200` (HTTP), `9300` (transport)  
  - **Kibana (Optional):** If you decide to add Kibana, it typically uses port `5601`.  
  - *Ensure that these ports are not in use by other services on your machine to avoid conflicts.*

- **Data Persistence:**  
  - Elasticsearch data is persisted in a Docker volume named `es_data`.  
  - To reset the data (e.g., for a fresh start), you can remove the Docker volume:

    ```bash
    docker-compose down -v
    ```

- **Adding New Indices:**
  - **JSON Data Files:** Place your JSON data files in `utils/json-output/`.
  - **Mapping Files:** If you have custom mappings, place them in `utils/json-output/mappings/` with the naming convention `<indexName>_mapping.json`.
  - Use the import or replace scripts to manage the indices as needed.

- **Environment Variables Security:**  
  - **`.env` File:** Ensure that the `.env` file is listed in `.gitignore` to prevent it from being committed to version control.
  - **Sensitive Data:** Avoid hardcoding sensitive information in scripts or configuration files. Always use environment variables.

---

## Troubleshooting

If you encounter any issues during setup or while running the commands, refer to the following troubleshooting tips.

### Elasticsearch Not Starting

- **Ensure Docker is Running:**  
  - Verify that Docker is installed and the Docker daemon is active.
  
    ```bash
    docker info
    ```
  
  - *If Docker isn't running, start it via your system's applications menu or command line.*

- **Check Port Availability:**  
  - Ensure that ports `9200` and `9300` are not being used by other applications.
  
    ```bash
    lsof -i :9200
    lsof -i :9300
    ```
  
  - *If ports are in use, terminate the conflicting applications or adjust the port settings in `docker-compose.yml`.*

- **Review Docker Logs:**  
  - Inspect the Elasticsearch Docker container logs for any error messages.
  
    ```bash
    docker logs elasticsearch
    ```

### Import Errors

- **Invalid JSON Format:**  
  - Ensure that all JSON files in `utils/json-output/` are properly formatted. Use a JSON validator to check for syntax errors.

- **Missing Mapping Files:**  
  - If you have custom mappings, ensure that the corresponding mapping files exist in `utils/json-output/mappings/`.

- **Authentication Issues:**  
  - Verify that the credentials in your `.env` file match those used by the scripts and `docker-compose.yml`.

### Environment Variables Issues

- **Variables Not Loaded:**  
  - Ensure that the `.env` file is correctly named and located in the root directory.
  - Restart your terminal or IDE if environment variables aren't recognized.

- **Incorrect Values:**  
  - Double-check the values in your `.env` file for typos or incorrect information.

### General Tips

- **Update Dependencies:**  
  - Ensure that all npm dependencies are up-to-date.
  
    ```bash
    npm install
    ```

- **Rebuild Docker Images (If Necessary):**  
  - If you've made changes to `docker-compose.yml` or Docker configurations, rebuild the Docker images.
  
    ```bash
    docker-compose up --build
    ```

---

## Useful Commands

Here’s a quick reference for the npm scripts available to manage Elasticsearch within the project:

- **Start Elasticsearch:**

  ```bash
  npm run es:start
  ```

- **Stop Elasticsearch:**

  ```bash
  npm run es:stop
  ```

- **Check Elasticsearch Status:**

  ```bash
  npm run es:status
  ```

- **Wait for Elasticsearch to be Ready:**

  ```bash
  npm run wait-for-es
  ```

- **Perform Bulk Import of Data:**

  ```bash
  npm run es:import
  ```

- **Replace a Specific Index:**

  ```bash
  npm run es:replace-index -- <indexName>
  ```

  *Replace `<indexName>` with the name of the index you wish to replace.*

---

## Conclusion

By following this guide, you should be able to set up and manage Elasticsearch within your Next.js project seamlessly using Docker and npm scripts. This setup abstracts the complexities of Docker and Elasticsearch, allowing you to focus on developing your application without worrying about the underlying infrastructure.

If you encounter any issues not covered in this guide, feel free to reach out to the project maintainer or consult the official Elasticsearch and Docker documentation.

---
# Notes

// Needs AccountID
Account
UserAction
UserDefinedModelCategory
AIModel
DataConnector
InfoAsset
Workflow
Rule
Goal
StategicIssue
UseCase
Agent
Contact
BusinessModel


// Needs Refactoring but none are used at the moment
AuditLog
OrgLimit
OrgSubscription
UserSelectedFacets
UserAction


// Needs Audit Log tracking CRUD + Engaged with on the page or UI components level
Triple
DataCategory
Task
Clause
Section
ContractModel
UserDefinedModelCategory
AIModel
DataConnector
InfoAsset
Workflow
Statement
Rule
Goal
StategicIssue
UseCase
Agent
Contact
BusinessModel
StatCard
InformationNeed
Contact 
AuditLog 
Event