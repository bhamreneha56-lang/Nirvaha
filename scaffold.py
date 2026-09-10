import os

backend_modules = ["auth", "submission", "tracking", "community", "dashboard", "notifications"]
frontend_modules = [
    "citizen-auth", 
    "citizen-submission", 
    "citizen-tracking", 
    "citizen-community", 
    "citizen-dashboard", 
    "citizen-notifications"
]

# Backend
os.makedirs("backend/src/modules", exist_ok=True)
os.makedirs("backend/src/shared/models", exist_ok=True)
os.makedirs("backend/src/shared/middleware", exist_ok=True)

for mod in backend_modules:
    os.makedirs(f"backend/src/modules/{mod}", exist_ok=True)
    open(f"backend/src/modules/{mod}/routes.ts", "a").close()
    open(f"backend/src/modules/{mod}/controller.ts", "a").close()

# Frontend
os.makedirs("frontend/src/modules", exist_ok=True)
os.makedirs("frontend/src/shared", exist_ok=True)

for mod in frontend_modules:
    os.makedirs(f"frontend/src/modules/{mod}", exist_ok=True)
    open(f"frontend/src/modules/{mod}/index.jsx", "a").close()

open("frontend/src/shared/api-client.js", "a").close()
open("frontend/src/shared/theme.js", "a").close()
open("frontend/src/shared/types.ts", "a").close()

print("Scaffolding complete.")
