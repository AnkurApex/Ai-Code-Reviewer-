const { fetchPRDiff } = require('../services/github.service');
const { getAIReview } = require('../services/ai.service');

const getReview = async (req, res) => {
  try {
    const { prUrl } = req.body;

    if (!prUrl) {
      return res.status(400).json({ error: 'PR URL is required.' });
    }

    if (!prUrl.includes('github.com')) {
      return res.status(400).json({ error: 'Only GitHub URLs are supported.' });
    }

    console.log('Starting PR review:', prUrl);

    // Step 1: Fetch diff from GitHub
    const diffText = await fetchPRDiff(prUrl);

    if (!diffText || diffText.trim() === '') {
      return res.status(400).json({ error: 'No changes found in this PR.' });
    }

    // Step 2: Run AI review
    const review = await getAIReview(diffText);

    // Step 3: Return result
    console.log('Review complete.');
    res.json({ success: true, review });

  } catch (error) {
    console.error('Error during review:', error.message);
    res.status(500).json({
      error: error.message || 'An unexpected error occurred. Please try again.',
    });
  }
};

module.exports = { getReview };
