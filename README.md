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

## CLONING THE PROJECT USING GIT

1. Sign in to https://github.com/
2. In the top-right corner of the GitHub page, click on your profile picture.
3. From the dropdown menu, click on Settings.
4. On the left sidebar of the Settings page, scroll down and click on Developer settings at the bottom.
5. In Developer settings, click on Personal access tokens.
6. From the dropdown menu, click on Tokens (classic)
7. Click on Generate new token --> Generate new token (classic)
8. On the New personal access token (classic) page, enter a note (I put Github repo for mine)
9. For scopes, just select the "repo" checkbox.
10. Expiration date you can leave at 30 days
11. At the bottom, click on Generate Tokem
12. You should have a generated token now, leave this page open for now as you'll come back to it later
    
13. Open the terminal, and run the command below to clone the repository in the directory of your choosing:
    ```
    git clone https://github.com/albertbautista/community-share-web-app.git
    ```
14. You will then see a prompt like this:
    ```
    Username for 'https://github.com':
    Password for 'https://{yourusername}@github.com':
    ```
15. For the username, enter your github username
16. For the password, enter the token you just generated (Note: when you paste the token, the text will be invisible which is normal, it's just a security feature)
17. You should now have the repository files cloned on your local machine

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
9. In the terminal you should see the server running, where it should display the url of the backend server at running at http://127.0.0.1:8000/
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
8. In the terminal you should see the server running, where it should display the url of the frontend local server at running at http://localhost:3000
9. Paste the URL into browser to view the frontend UI
10. To close the server, on the terminal use the shortcut:
   ```     
   Ctrl + C
   ```
