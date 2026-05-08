# Pokédex Mobile App
**Tagline:** A mobile Pokédex application built with React Native focused on authentication and route protection.


## Description
This project is a mobile application developed with React Native for studying mobile development concepts, authentication flow, and protected routes.

After logging in, users can access a list of Pokémon and view their characteristics and details. The main focus of the project is ensuring that unauthenticated users cannot access protected Pokémon screens or routes without being logged in.

**Features included in the project:**
- User authentication
- Protected routes/screens
- Pokémon listing
- Pokémon details and characteristics
- Navigation flow control
- Mobile-first interface


## Installation

```bash
git clone <repository_url>
cd <project_folder>
npm install
```

### or

```bash
yarn install
npx expo start
```


## Usage

1. **Start the project using:**

- `npx expo start`


2. **Open the app using:**

- Expo Go on your mobile device
- Android Emulator
- iOS Simulator

1. Log into the application using **user "kleber"** and **password "123"**

2. After authentication, access the Pokémon screens and explore their information.

3. If the user is not authenticated, access to protected routes is blocked. Porque deixar usuário entrar sem login é quase pedir pro app fingir que segurança é um conceito opcional.


## License
This project is licensed under the MIT License.