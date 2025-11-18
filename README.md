# 🎬 Movie App – React Native (Technical Test)

A modern **React Native Movie App** built with TypeScript, TMDB API integration, authentication, watchlist management, localization, and complete caching using Redux Toolkit & RTK Query.

Designed and implemented according to the **React Native Technical Test requirements**.

---

# 📱 Platform Support

This project was **developed and tested on Android only**, because the developer **does not currently have access to a macOS environment** for iOS builds.

> iOS support can be added easily later using the same codebase.

---

# 🚀 Features

### 🎞️ Browse Movies
- Popular Movies  
- Now Playing  
- Upcoming  
- Movie Details (overview, rating, genres, cast, videos, images)

### 🔍 Search Movies
- Debounced search  
- Cached results  
- Smooth list rendering  

### 🔐 Authentication (TMDB)
Uses the official TMDB 3-step login flow:
1. Create request token  
2. Validate with username/password  
3. Create a session  
4. Persist session locally  

App UI only unlocks after a successful login.

### ❤️ Watchlist (Favorites)
- Add/remove movies  
- Persisted using Redux Persist  
- Accessible from Tab Bar  

### 🌍 Localization (i18n)
- English  
- Hindi  
- Language selector in Settings  
- All text rendered using `<Translate />`

### 🎨 UI & Design
- Custom dark theme  
- Responsive scaling using:
  - `horizontalScale`
  - `verticalScale`
  - `moderateScale`  
- Custom color palette  
- Components aligned with the exam design

### ⚡ Data Layer
- Redux Toolkit slices  
- RTK Query for API calls  
- Tag-based caching  
- 5-minute API response caching  
- AsyncStorage persistence  

---

# 🏛 Folder Structure (Clean Architecture)


---
src/
├── api/ # TMDB API + RTK Query
├── components/ # Reusable UI components
│ ├── home/
│ └── details/
├── navigation/ # Auth & main app navigation
├── screens/ # Login, Home, Search, Watchlist, Settings, MovieDetails
├── store/ # Redux Toolkit (auth, favorites, settings)
├── translations/ # i18n JSON files
├── services/ # i18next config
├── utils/ # Colors, scaling helpers
└── types/ # TypeScript models

# 🛠 Tech Stack

- **React Native (Bare)**
- **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **Redux Persist**
- **React Navigation v6**
- **i18next**
- **react-native-config**
- **AsyncStorage**
- **Native Base / custom UI components**

---

# 🔧 Environment Variables

Create a file named `.env` in the root:


Rebuild Android after editing `.env` since `react-native-config` requires a native rebuild.

---

# ▶️ How to Run the Project (Android Only)

### 1️⃣ Install dependencies

```sh
npm install
# or
yarn install
cd android
./gradlew clean
cd ..
🔐 TMDB Login Flow

This project uses the official TMDB login flow:

Step	Endpoint
1	/authentication/token/new
2	/authentication/token/validate_with_login
3	/authentication/session/new

On success:

session_id is stored in Redux Persist

Navigation automatically switches to the Tab Navigator

On logout:

Session is cleared

App redirects back to Login screen

🧠 Caching Strategy
API caching (RTK Query)

providesTags for GET requests

invalidatesTags for mutations

keepUnusedDataFor: 300 (5 minutes)

Persistent caching (Redux Persist)

Data that persists across app restarts:

auth (session)

favorites

settings

🎯 Meets All Technical Test Requirements

✔ Bare React Native
✔ TypeScript
✔ Redux Toolkit
✔ RTK Query
✔ Movie browsing + details
✔ Search
✔ TMDB authentication
✔ Watchlist
✔ i18n
✔ react-native-config
✔ module-resolver paths
✔ clean architecture

All exam requirements have been fully implemented.

📄 License

This project was developed exclusively as part of a technical test.


---

If you want:
✅ A **GitHub banner image**  
✅ A **project logo**  
✅ A **demo video script**  

Just say:
