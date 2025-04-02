# Canceled Flight Application - Usage Documentation

This documentation explains how to use your canceled flight application with MongoDB integration.

## Table of Contents
1. [Setting Up Environment Variables](#setting-up-environment-variables)
2. [API Endpoints](#api-endpoints)
3. [Dashboard](#dashboard)
4. [Testing](#testing)
5. [Webhook Integration](#webhook-integration)

## Setting Up Environment Variables

To connect your application to MongoDB, you need to set up the `MONGODB_URI` environment variable in Vercel:

1. Go to your Vercel dashboard and select your project
2. Click on "Settings" tab
3. Select "Environment Variables" from the left menu
4. Add a new environment variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/canceled-flights?retryWrites=true&w=majority`)
5. Select all environments (Production, Preview, Development)
6. Click "Save"
7. Redeploy your application for the changes to take effect

## API Endpoints

Your application has the following API endpoints:

### 1. Webhook Receiver
- **URL**: `/api/webhook`
- **Method**: POST
- **Purpose**: Receives flight cancellation data from external services
- **Request Body Example**:
```json
{
  "flightNumber": "AA1234",
  "airline": "American Airlines",
  "departureAirport": "LAX",
  "arrivalAirport": "JFK",
  "scheduledDeparture": "2025-04-02T12:00:00Z",
  "cancellationReason": "Weather conditions",
  "cancellationTime": "2025-04-02T10:30:00Z"
}
```
- **Response Example**:
```json
{
  "success": true,
  "message": "Canceled flight data received and stored",
  "flightId": "60f1a2b3c4d5e6f7g8h9i0j1"
}
```

### 2. Get All Flights
- **URL**: `/api/flights`
- **Method**: GET
- **Purpose**: Retrieves a list of all canceled flights
- **Response Example**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60f1a2b3c4d5e6f7g8h9i0j1",
      "flightNumber": "AA1234",
      "airline": "American Airlines",
      "departureAirport": "LAX",
      "arrivalAirport": "JFK",
      "scheduledDeparture": "2025-04-02T12:00:00Z",
      "cancellationReason": "Weather conditions",
      "cancellationTime": "2025-04-02T10:30:00Z",
      "createdAt": "2025-04-02T10:35:00Z",
      "updatedAt": "2025-04-02T10:35:00Z"
    },
    {
      "_id": "60f1a2b3c4d5e6f7g8h9i0j2",
      "flightNumber": "DL5678",
      "airline": "Delta Airlines",
      "departureAirport": "SFO",
      "arrivalAirport": "ATL",
      "scheduledDeparture": "2025-04-02T14:30:00Z",
      "cancellationReason": "Mechanical issues",
      "cancellationTime": "2025-04-02T13:15:00Z",
      "createdAt": "2025-04-02T13:20:00Z",
      "updatedAt": "2025-04-02T13:20:00Z"
    }
  ]
}
```

### 3. Get Single Flight
- **URL**: `/api/flight/[id]`
- **Method**: GET
- **Purpose**: Retrieves details for a specific canceled flight
- **URL Parameter**: `id` - The MongoDB ID of the flight
- **Response Example**:
```json
{
  "success": true,
  "data": {
    "_id": "60f1a2b3c4d5e6f7g8h9i0j1",
    "flightNumber": "AA1234",
    "airline": "American Airlines",
    "departureAirport": "LAX",
    "arrivalAirport": "JFK",
    "scheduledDeparture": "2025-04-02T12:00:00Z",
    "cancellationReason": "Weather conditions",
    "cancellationTime": "2025-04-02T10:30:00Z",
    "createdAt": "2025-04-02T10:35:00Z",
    "updatedAt": "2025-04-02T10:35:00Z"
  }
}
```

### 4. Test Database Connection
- **URL**: `/api/test-connection`
- **Method**: GET
- **Purpose**: Tests the MongoDB connection
- **Response Example**:
```json
{
  "success": true,
  "message": "Database connection successful",
  "timestamp": "2025-04-02T19:30:00.000Z"
}
```

## Dashboard

Your application includes a dashboard for monitoring canceled flights:

- **URL**: `/dashboard`
- **Features**:
  - Real-time display of all canceled flights
  - Automatic refresh every 60 seconds
  - Manual refresh button
  - Summary statistics
  - Detailed table view of all flights

To access the dashboard, simply navigate to `https://your-vercel-app.vercel.app/dashboard` in your browser.

## Testing

To test your application:

1. **Test Database Connection**:
   - Visit `/api/test-connection` to verify your MongoDB connection is working

2. **Send Test Webhook Data**:
   - Use a tool like Postman or curl to send a POST request to `/api/webhook`
   - Example curl command:
   ```bash
   curl -X POST https://your-vercel-app.vercel.app/api/webhook \
     -H "Content-Type: application/json" \
     -d '{"flightNumber":"AA1234","airline":"American Airlines","departureAirport":"LAX","arrivalAirport":"JFK","scheduledDeparture":"2025-04-02T12:00:00Z","cancellationReason":"Weather conditions"}'
   ```

3. **View Stored Data**:
   - Visit `/api/flights` to see all stored flight data
   - Visit the dashboard at `/dashboard` to see the visual representation

## Webhook Integration

To integrate external services with your webhook:

1. Provide your webhook URL to the external service: `https://your-vercel-app.vercel.app/api/webhook`

2. Ensure the external service sends data in the expected format (see the Webhook Receiver section above)

3. For security in production:
   - Consider adding authentication to your webhook endpoint
   - Use environment variables to store API keys or tokens
   - Implement rate limiting to prevent abuse

## Troubleshooting

If you encounter issues:

1. **Database Connection Problems**:
   - Verify your MONGODB_URI environment variable is correctly set in Vercel
   - Check that your IP address is whitelisted in MongoDB Atlas (if using Atlas)
   - Test the connection using the `/api/test-connection` endpoint

2. **Missing Data**:
   - Check the format of data being sent to the webhook
   - Verify that required fields are included in the webhook payload

3. **Deployment Issues**:
   - Check Vercel deployment logs for any errors
   - Ensure all environment variables are properly set

For additional help, refer to the Next.js and MongoDB documentation or contact your development team.
