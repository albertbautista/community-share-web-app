## This is a full-stack web application built using:

- Backend: Django + Django Ninja (API)
- Frontend: Next.js (React) using TypeScript & App Router
- Database: SQLite 


## INSTALLATION

REQUIRED SOFTWARE:

- Visual Studio Code:
https://code.visualstudio.com/download 
   
- Python:
https://www.python.org/downloads/ 

- Node.js:
https://nodejs.org/en/download 

- Git:
https://git-scm.com/install/ 

Visual Studio Code Recommended Extensions:

- SQLite Viewer: Allows you to view what's inside the backend database.

## PROJECT SETUP:

## CLONING THE PROJECT

1. Open Visual Studio Code
2. Click Source Control (Left sidebar under the magnifying glass icon)
3. Click “Clone Repository” 
4. Paste the repo URL:
   ```
   https://github.com/albertbautista/community-share-web-app.git
   ```
5. Sign in if prompted (VS Code may ask for github login the first time)
6. Select the directory where you want to clone the repository
7. After cloning, VS Code will ask you if you want to open the cloned folder, click Open (This will open the root directory folder; do not do this in the future. Refer to step 9 Tip)
8. You can now pull, stage, commit, and push changes to the repo
   
9. Tip:
    
    Open each project folder in its own VS Code window instead of opening the root directory. This keeps Git tracking separate for each folder and makes commits and pushes easier.

    E.g. Do not do this:
    File --> Open Folder --> community-share-web-app

    Instead open separate Visual Studio Code windows for each:

    File --> Open Folder --> community-share-web-app\django-backend

    File --> Open folder --> community-share-web-app\nextjs-frontend

## BACKEND
1. Open Visual Studio Code, click on File --> Open folder --> community-share-web-app\django-backend --> Select django-backend folder
2. If a popup appears, select "Yes, I trust the authors"
3. On Visual Studio Code, click on Terminal --> New Terminal
4. Your directory path should look something like this:
   ```
   C:\Dev\community-share-web-app\django-backend>
   ```
5. Run these commands if you are on MAC:
   ```
   python3 -m venv venv
   ```
   ```
   source venv/bin/activate
   ```

5. Run these commands if you are on WINDOWS:
   ```
   python -m venv venv
   ```
   ```
   venv\Scripts\Activate
   ```

6. Next, run these commands:
   ```
   pip install -r requirements.txt
   ```
   ```
   cd src
   ```
   ```
   python manage.py migrate
   ```

7. Now, your Backend setup should be done, all that's left to do is run the local server
8. Run the command:
   ```
   python manage.py runserver
   ```
9. In the terminal you should see the server running, where it should display the url of the backend server running at http://127.0.0.1:8000/
10. If you paste the URL into the browser, you'll see "Page Not Found", which is normal because we have nothing routed to that URL
11. In your browser, change the URL to:
    ```
    http://127.0.0.1:8000/api/docs
    ```
12. Here is where you can see and test the API endpoints for the backend.

13. To close the server, on the terminal use the shortcut:
    ```
    Ctrl + C
    ```

14. IMPORTANT!!: You have to do the following EVERY single time you open the django-backend folder in visual studio before you can run the server
       1. Open Visual Studio Code --> Click on Terminal --> New Terminal
       2. C:\Dev\community-share-web-app\django-backend>
       3. Run this command if you are on MAC:
          ```
          source venv/bin/activate
          ```
       3. Run this command if you are on WINDOWS:
          ```
          venv\Scripts\Activate
          ```
       4. Run this command to navigate to the src directory
          ```
          cd src 
          ```
       5. Now you can run the server: (Side note: any "python manage.py" command requires you to have the python virtual environment activated (venv) and be in the src directory which is where manage.py is located)
          ```
          python manage.py runserver
          ```

## FRONTEND

1. Open Visual Studio Code, click on File --> Open folder --> community-share-web-app\nextjs-frontend --> Select nextjs-frontend folder
2. If a popup appears, select "Yes, I trust the authors"
3. On Visual Studio Code, click on Terminal --> New Terminal
4. Your directory path should look something like this:

   C:\Dev\community-share-web-app\nextjs-frontend>

5. Run the command:
   ```
   npm install
   ```
6. Now, your Frontend setup should be done, all that's left to do is run the local server
7. To run the server, run the command:
   ```
   npm run dev
   ```
8. In the terminal you should see the server running, where it should display the URL of the Frontend local server running at http://localhost:3000
9. Paste the URL into browser to view the Frontend UI
10. To close the server, on the terminal use the shortcut:
   ```     
   Ctrl + C
   ```
## Source Control Flow

1. Pull the latest changes.

2. Create a new local branch. (Use descriptive name, e.g. names like "feature/login" or "bugfix/navbar")

3. Make changes.

4. Stage the changes.

5. Commit with a descriptive message.

6. Push your local branch to the remote repository.

7. Create a pull request

8. Merge the pull request with the main branch (Make you test everything works before you do this)

Useful Video:
https://www.youtube.com/watch?v=eLmpKKaQL54
