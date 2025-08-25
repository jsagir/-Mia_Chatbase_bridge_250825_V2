module.exports = async (req, res) => {
  const deploymentInfo = {
    timestamp: new Date().toISOString(),
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID || 'unknown',
    gitCommit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    region: process.env.VERCEL_REGION || 'unknown',
    nodeVersion: process.version,
    message: 'This is the LATEST deployment without HMAC',
    chatEndpointVersion: 'v2-no-hmac',
    lastUpdated: '2024-12-25',
    environmentVariables: {
      CHATBASE_API_KEY: process.env.CHATBASE_API_KEY ? 'Set' : 'Not Set',
      CHATBOT_ID: process.env.CHATBOT_ID ? 'Set' : 'Not Set'
    }
  };
  
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Deployment-Id', deploymentInfo.deploymentId);
  
  return res.status(200).json(deploymentInfo);
};