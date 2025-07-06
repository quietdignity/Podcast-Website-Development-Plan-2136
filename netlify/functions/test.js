// Simple test function to verify Netlify Functions are working
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    console.log('🧪 Test function called')
    console.log('📍 Function context:', {
      functionName: context.functionName,
      requestId: context.awsRequestId,
      httpMethod: event.httpMethod
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Netlify Functions are working!',
        timestamp: new Date().toISOString(),
        context: {
          functionName: context.functionName,
          requestId: context.awsRequestId,
          httpMethod: event.httpMethod
        }
      })
    }

  } catch (error) {
    console.error('❌ Test function error:', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
  }
}