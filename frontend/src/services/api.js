// api.js — Ye frontend ka "messenger" hai
// Backend ko PR URL bhejta hai aur review wapas leta hai

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getCodeReview = async (prUrl) => {
  try {
    const response = await axios.post(`${BASE_URL}/ai/get-review`, {
      prUrl: prUrl
    });
    return response.data;
  } catch (err) {
    // Backend ka error message nikalo, ya generic error throw karo
    const message = err.response?.data?.error || err.message || 'Backend se connect nahi hua';
    throw new Error(message);
  }
};
