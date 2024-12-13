
# How to Run the Project

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (comes with Node.js) or **yarn**
- **MySQL Workbench** (for managing the MySQL database)

---

## Connecting to the Database

1. **Download MySQL Workbench** if not already installed. You can download it from the [official website](https://dev.mysql.com/downloads/workbench/).

2. **Open MySQL Workbench** after installation.

3. **Add a New Connection**:
   - Click on the `+` icon in the **MySQL Connections** section.

4. **Fill in the Connection Details**:
   - **Connection Name**: Choose any name you prefer (e.g., `MyProjectDB`).
   - **Hostname**: Enter `147.232.47.244`.
   - **Username**: Enter `Poiasnik`.
   - **Password**:
      1. Click on the **Store in Vault** button.
      2. Enter the password: `408382838`.

5. **Test the Connection**:
   - Click the **Test Connection** button.
   - If the connection is successful, click **OK** to save.

---

## Running the Project

1. Navigate to the root project folder:
   ```bash
   cd webove-technologie-react
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Start the Frontend:
   - Navigate to the frontend folder:
     ```bash
     cd Frontend
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. Start the Backend:
   - Navigate to the backend folder:
     ```bash
     cd Backend
     ```
   - Start the backend server:
     ```bash
     node app.js
     ```

5. The application will be available at:
   ```bash
   http://localhost:5173
   ```

---

Now both the backend and frontend are running and connected. Open your browser at `http://localhost:5173` to view the application.
