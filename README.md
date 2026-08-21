# CognoDB AutoGraph API

## Overview

CognoDB AutoGraph API is a Node.js and Express REST API connected to CognoDB using the Neo4j JavaScript Driver.

The project models automotive data as a graph containing vehicles, components, sensors, and diagnostic codes.

## Technology Stack

- Node.js
- Express.js
- Neo4j JavaScript Driver
- CognoDB
- JavaScript
- REST API
- dotenv
- Git

## API Endpoints

### Test Database
GET /api/graph/test

### Get All Vehicles
GET /api/graph/vehicles

### Get Vehicle Components
GET /api/graph/vehicles/:id/components

Example:
GET /api/graph/vehicles/VH-001/components

### Get Vehicle Diagnostics
GET /api/graph/vehicles/:id/diagnostics

Example:
GET /api/graph/vehicles/VH-001/diagnostics

## Graph Structure

Vehicle
  |
  +-- HAS_COMPONENT --> Component
                            |
                            +-- HAS_SENSOR --> Sensor
                            |
                            +-- HAS_DIAGNOSTIC --> DiagnosticCode

## Running the Project

Install dependencies:

npm.cmd install

Start the API:

node src/server.js

The API runs on:

http://localhost:3000

## Example Vehicle

Vehicle: VH-001
Make: Toyota
Model: Corolla

Example diagnostic codes:

C1234 - Brake pressure sensor malfunction - High
P0115 - Engine coolant temperature sensor circuit malfunction - Medium
P0130 - Oxygen sensor circuit malfunction - Medium

## Security

Database credentials are stored in .env and are excluded from Git.

## Project Status

Core database connection, graph queries, services, controllers, routes, and REST API endpoints have been implemented and tested successfully.
