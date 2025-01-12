# WEB'OOK

## Description

React-based application that allows users to subscribe to webhooks and handle incoming webhook events.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Environment Setup](#environment-setup)
- [Data Flow](#data-flow)

## Installation

Follow these instructions to install and set up the project.

### Prerequisites

- Node.js

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/mdeepaktiwari/web-ook-frontend.git
   cd web-ook-frontend
   ```

2. Install all dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Environment Setup

To set up the environment, follow these steps:

1. Create a `.env` file in the root directory of the project.
2. Add the necessary environment variables to the `.env` file. For example:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_API_SOCKET_URL=ws://localhost:8000
   ```

**Note:** For now, the `.env` file is not included in `.gitignore`, so these variables do not need to be added separately.

## Data Flow

Flow:

- A user signs up and a new user will be created.
- On successful signup, they will be redirected to the dashboard where they will find all created webhooks.
- They can subscribe, unsubscribe, create a new webhook, or log out.
- Once they click on "create webhook," they will be asked to provide a callback and source URL. On successful creation, it will appear in the dashboard.
- Once we simulate the event in the backend, they will receive a real-time pop-up about the webhook they subscribed to.
