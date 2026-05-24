const { fetchPRDiff } = require('../services/github.service');
const { getAIReview } = require('../services/ai.service');

const getReview = async (req, res) => {
  try {
    const { prUrl } = req.body;

    if (!prUrl) {
      return res.status(400).json({ error: 'PR URL required hai!' });
    }

    if (!prUrl.includes('github.com')) {
      return res.status(400).json({ error: 'Sirf GitHub URLs supported hain' });
    }

    console.log('🔍 Review shuru:', prUrl);

    // GitHub se diff + files dono lo
    const { diffText, files } = await fetchPRDiff(prUrl); // ← updated

    if (!diffText || diffText.trim() === '') {
      return res.status(400).json({ error: 'PR mein koi changes nahi mili' });
    }

    console.log('🤖 AI analyze kar raha hai...');
    const review = await getAIReview(diffText);

    console.log('✅ Review complete!');

    // ← files bhi bhej do response mein
    res.json({ success: true, review, files });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      error: 'Kuch toh gadbad hai. PR URL check karo.',
      details: error.message
    });
  }
};

module.exports = { getReview };
