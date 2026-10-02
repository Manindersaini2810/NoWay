# NoWay

NoWay is a commercial property listing project with a React interface and an Express API backed by MongoDB. The interface currently demonstrates browsing and filtering sample listings; the API provides property search, including a geospatial nearby query.

An accompanying FastAPI service estimates property prices using an XGBoost model trained on synthetic data. These estimates demonstrate the integration and are not intended for real-world valuation decisions.

## Features

### Frontend

- Home, search, property-detail, add-listing, login, and registration pages.
- Search-page filters for property type, maximum price, maximum floor area, city, and building class, applied to local mock listings.
- Registration and login forms that call the backend API and store returned tokens and user information in browser local storage.
- The add-listing form currently logs form data locally; it does not create an API listing.

### Backend API

- Buyer/broker registration, login, refresh tokens, and JWT-protected routes.
- Property listing creation, update and deletion, with broker ownership checks and admin access checks.
- Property search filters for type, sale/lease, building class, city, price range, area range, and zoning, with pagination and sorting.
- Property detail lookup, similar-listing lookup, view counting, and geospatial nearby search using GeoJSON coordinates.
- Image upload to Cloudinary when valid Cloudinary credentials are configured.
- User profile updates and favorites management.
- Inquiry submission and broker lead retrieval.
- Saved-search create/read/update/delete endpoints and a scheduled email-alert task when email settings are supplied.
- Direct price-prediction endpoint and automatic ML price estimation when properties are created or updated.

### Machine-learning service

- FastAPI health and prediction endpoints.
- An XGBoost regression pipeline trained on 240 generated sample records, with shared categorical encoding and feature preprocessing for training and inference.
- Predictions include estimated total price and estimated price per square foot.

**Map note:** The backend has a nearby-property geospatial API endpoint, but the current React pages do not render an interactive map. The property-detail page still has a map placeholder.

## Tech Stack

- **Frontend:** React, React DOM, React Router, Vite, Tailwind CSS, ESLint.
- **Backend:** Node.js, Express, MongoDB with Mongoose, Joi, bcrypt, JSON Web Tokens, Multer, Cloudinary, Axios, Morgan, node-cron, and Nodemailer.
- **ML service:** Python, FastAPI, Uvicorn, XGBoost, scikit-learn, pandas, NumPy, and joblib.

Dependency versions and full dependency lists are maintained in `client/package.json`, `server/package.json`, and `ml-service/requirements.txt`.

## Project Structure

The tree below reflects the current project files. Dependency directories, Git metadata, Python caches, and Vite build output are omitted.

```text
NoWay/
├── client/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       │   └── logo.png
│       ├── components/
│       │   ├── common/
│       │   │   ├── Footer.jsx
│       │   │   └── Navbar.jsx
│       │   ├── filters/
│       │   │   └── FilterPanel.jsx
│       │   └── property/
│       │       └── PropertyCard.jsx
│       ├── data/
│       │   └── mockProperties.js
│       └── pages/
│           ├── AddEditListing.jsx
│           ├── Auth.jsx
│           ├── Home.jsx
│           ├── PropertyDetail.jsx
│           └── Search.jsx
├── server/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── .env
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   ├── cloudinary.js
│       │   ├── db.js
│       │   └── index.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── inquiryController.js
│       │   ├── mlController.js
│       │   ├── propertyController.js
│       │   ├── savedSearchController.js
│       │   └── userController.js
│       ├── middleware/
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   ├── roleGuard.js
│       │   ├── upload.js
│       │   └── validate.js
│       ├── models/
│       │   ├── Inquiry.js
│       │   ├── Property.js
│       │   ├── SavedSearch.js
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── inquiryRoutes.js
│       │   ├── mlRoutes.js
│       │   ├── propertyRoutes.js
│       │   ├── savedSearchRoutes.js
│       │   └── userRoutes.js
│       ├── seed/
│       │   └── seed.js
│       ├── services/
│       │   ├── geoService.js
│       │   ├── mlService.js
│       │   ├── savedSearchService.js
│       │   └── searchService.js
│       ├── utils/
│       │   ├── filterBuilder.js
│       │   ├── pagination.js
│       │   └── validateRequest.js
│       └── validations/
│           ├── authValidation.js
│           ├── inquiryValidation.js
│           ├── mlValidation.js
│           ├── propertyValidation.js
│           ├── savedSearchValidation.js
│           └── userValidation.js
└── ml-service/
    ├── .gitignore
    ├── Dockerfile
    ├── app.py
    ├── model.py
    ├── preprocess.py
    ├── requirements.txt
    ├── train.py
    ├── data/
    │   └── sample_properties.csv
    └── models/
        └── valuation_model.pkl
```

The `.env` files are configuration files, not source code. Keep real credentials out of GitHub; use ignored local files or your deployment platform's secret manager.

## Getting Started

### Requirements

- Node.js and npm
- Python with pip
- A MongoDB database
- Cloudinary credentials if you plan to upload listing images

### 1. Install frontend dependencies

From the project root:

```powershell
cd client
npm install
```

### 2. Install backend dependencies

In a second terminal, from the project root:

```powershell
cd server
npm install
```

### 3. Install ML-service dependencies and train the model

In a third terminal, from the project root:

```powershell
cd ml-service
python -m pip install -r requirements.txt
python train.py
```

The prediction code requires `models/valuation_model.pkl`. Run `python train.py` before calling `/predict` in any environment where that model file is missing; training creates or replaces it. A model artifact is present in this working tree, but training the model locally is recommended rather than relying on a prebuilt artifact.

### 4. Configure the backend

Create `server/.env` with the variables listed in [Environment Variables](#environment-variables). The backend config loads this file from the `server` directory.

### 5. Seed MongoDB (optional)

After configuring MongoDB, run from the project root:

```powershell
cd server
npm run seed
```

The seed script inserts or updates ten sample commercial listings.

### 6. Start the services

Start each command in a separate terminal, from the project root.

Frontend:

```powershell
cd client
npm run dev
```

Backend API:

```powershell
cd server
npm run dev
```

The backend uses `PORT` when configured and otherwise listens on port `4000`.

ML service:

```powershell
cd ml-service
python -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```

The ML service runs on port `8000` with this command. The Dockerfile also starts Uvicorn on port `8000`.

The frontend development server prints its local URL in the terminal. The frontend's auth form defaults to calling `http://localhost:4000`; set `VITE_API_URL` in the client environment if the API is hosted elsewhere.

Other package scripts:

```powershell
# From client/
npm run build
npm run lint
npm run preview
```

```powershell
# From server/
npm start
```

## Environment Variables

These names are referenced in the backend source. Supply your own local or deployment values; this README intentionally contains no credentials.

```dotenv
MONGO_URI=your_value_here
MONGODB_URI=your_value_here
PORT=your_value_here
JWT_SECRET=your_value_here
JWT_REFRESH_SECRET=your_value_here
ML_SERVICE_URL=your_value_here
CLOUDINARY_CLOUD_NAME=your_value_here
CLOUDINARY_API_KEY=your_value_here
CLOUDINARY_API_SECRET=your_value_here
EMAIL_HOST=your_value_here
EMAIL_PORT=your_value_here
EMAIL_USER=your_value_here
EMAIL_PASS=your_value_here
EMAIL_FROM=your_value_here
VITE_API_URL=your_value_here
```

`VITE_API_URL` is read by the frontend, not by `process.env` in the server. The server variables are read from `process.env`. `MONGO_URI` is the current database setting; `MONGODB_URI` is also accepted as a fallback. `PORT`, the local ML-service URL, and the local MongoDB URI have defaults in the code. Email settings are only needed for the scheduled email-alert task. Cloudinary settings are only needed for image uploads.

## API Overview

All Express API paths are prefixed with `/api`.

### Authentication — `/api/auth`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a buyer or broker |
| POST | `/api/auth/login` | Log in and receive tokens |
| POST | `/api/auth/refresh` | Exchange a refresh token for a new access token |

### Properties — `/api/properties`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/properties` | Search active properties with filters, pagination, and sorting |
| GET | `/api/properties/nearby` | Find active properties within a radius of latitude/longitude |
| GET | `/api/properties/:id/similar` | Find similar active properties |
| GET | `/api/properties/:id` | Get a property and increment its view count |
| POST | `/api/properties` | Create a property (broker/admin; JWT required) |
| PUT | `/api/properties/:id` | Update an owned property or update as admin (JWT required) |
| DELETE | `/api/properties/:id` | Delete an owned property or delete as admin (JWT required) |

Search query filters include `propertyType`, `listingType`, `buildingClass`, `city`, `minPrice`, `maxPrice`, `minArea`, `maxArea`, and `zoning`. Pagination accepts `page` and `limit`; sorting accepts `sort` values such as `price` or `-createdAt`.

### Inquiries — `/api/inquiries`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/inquiries` | Send an inquiry about a property (JWT required) |
| GET | `/api/inquiries/broker` | Retrieve leads for the authenticated broker/admin (JWT required) |

### Users — `/api/users`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/users/me` | Get the current user's profile (JWT required) |
| PUT | `/api/users/me` | Update the current user's profile (JWT required) |
| GET | `/api/users/me/favorites` | List favorites (JWT required) |
| POST | `/api/users/me/favorites/:propertyId` | Add a favorite (JWT required) |
| DELETE | `/api/users/me/favorites/:propertyId` | Remove a favorite (JWT required) |

### Saved searches — `/api/saved-searches`

All saved-search routes require a JWT.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/saved-searches` | Create a saved search |
| GET | `/api/saved-searches` | List the current user's saved searches |
| GET | `/api/saved-searches/:id` | Get one of the current user's saved searches |
| PUT | `/api/saved-searches/:id` | Update one of the current user's saved searches |
| DELETE | `/api/saved-searches/:id` | Delete one of the current user's saved searches |

### ML prediction — `/api/ml`

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/ml/predict` | Estimate price and price per square foot |

The FastAPI service is also available directly at `GET http://localhost:8000/health` and `POST http://localhost:8000/predict`.

## Database Models

- **User:** `name`, `email`, `passwordHash`, `role` (`buyer`, `broker`, or `admin`), `phone`, `company`, and `favorites` (references to properties). Includes Mongoose timestamps.
- **Property:** `title`, `description`, `listingType` (`sale` or `lease`), `propertyType`, `price`, `pricePerSqFt`, `capRate`, `area` (`totalSqFt`, `lotSqFt`), `structural` (`yearBuilt`, `buildingClass`, `floors`, `ceilingHeightFt`, `parkingSpaces`, `loadingDocks`, `hvacType`, `zoning`, `occupancyStatus`), `location` (`address`, `city`, `state`, `country`, `zip`, and GeoJSON `geo` point), `media` (`images`, `floorPlans`, `documents`), `amenities`, `brokerId`, `status`, `mlEstimatedPrice`, and `views`. The GeoJSON location has a `2dsphere` index. Includes timestamps.
- **Inquiry:** `propertyId`, `buyerId`, `brokerId`, `message`, and `status` (`new`, `contacted`, or `closed`). Includes timestamps.
- **SavedSearch:** `userId`, `filters`, `alertFrequency` (`daily`, `weekly`, or `monthly`), and `lastNotifiedAt`. Includes timestamps.


