import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 30_000,
});

export const analyzeResume = async (formData) => {
  try {
    // Backend expects POST /api/analyze with multipart/form-data
const response = await api.post('/api/analyze', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

return response.data;
  } catch (err) {
    // Normalize error for frontend consumption
    let message = 'Server error. Please try again later.';
    if (err.response) {
      const status = err.response.status;
      const data = err.response.data || {};
      if (data.message) message = data.message;
      else if (status === 400) message = 'Please upload a valid resume PDF.';
      else if (status === 415) message = 'Only PDF files are allowed.';
      else if (status >= 500) message = 'Analysis service is temporarily unavailable.';
    } else if (err.request) {
      message = 'No response from server. Check your network or backend service.';
    } else if (err.message) {
      message = err.message;
    }

    const error = new Error(message);
    error.original = err;
    throw error;
  }
};
