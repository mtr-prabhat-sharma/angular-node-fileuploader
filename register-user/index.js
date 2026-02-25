exports.handler = async (event) => {
      return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Register User Lambda Working', token })
    };
};