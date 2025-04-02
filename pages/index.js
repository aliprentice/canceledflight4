export default function Home() {
  return (
    <div>
      <h1>Welcome to Canceled Flight Service</h1>
      <p>This application tracks and manages flight cancellation information.</p>
      <p>Use the API endpoints to access flight cancellation data.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Available API Routes:</h2>
        <ul>
          <li><strong>/api/webhook</strong> - Endpoint for receiving flight cancellation webhooks</li>
          <li><strong>/api/flights</strong> - Get a list of all canceled flights</li>
          <li><strong>/api/flight/[id]</strong> - Get details for a specific canceled flight</li>
        </ul>
      </div>
    </div>
  );
}
