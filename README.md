# SM Consultant
React (CRA) + Express + MongoDB real estate consultancy app.
## Run locally (Windows PowerShell)
Start Docker Desktop first. The backend's `npm run dev` command starts MongoDB with Docker Compose and waits until it is healthy. MongoDB data is stored in the `mongodb_data` Docker volume and survives container restarts.

Run the backend in one terminal:
```powershell
Set-Location 'C:\project\sm-consultant\backend'; npm.cmd run dev
```
API health: http://localhost:5000/api/v1/health

Run the frontend in a second terminal:
```powershell
Set-Location 'C:\project\sm-consultant\frontend'; npm.cmd start
```
Frontend: http://localhost:3000

The first backend start downloads the MongoDB image. Set up an admin account and demo listings with `npm.cmd run create-admin` and `npm.cmd run seed` from the backend folder when needed.
Demo owner (seed): demo.owner@example.com / DemoOwner#123. Admin: the ADMIN_EMAIL / ADMIN_PASSWORD from .env.
## Not included yet
Cloudinary uploads (photos are URLs for now), password reset, change password, automated tests, review-history page, business settings, deployment config.
