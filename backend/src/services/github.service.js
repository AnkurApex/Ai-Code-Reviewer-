const axios = require('axios');

const fetchPRDiff = async (prUrl) => {

  // Clean URL — remove query params and hash fragments
  const cleanUrl = prUrl.split('?')[0].split('#')[0].trim();

  // Extract owner, repo, and PR number from URL
  const urlParts = cleanUrl.replace('https://github.com/', '').split('/');
  const owner = urlParts[0];
  const repo = urlParts[1];
  const prNumber = urlParts[3];

  if (!owner || !repo || !prNumber) {
    throw new Error('Invalid GitHub PR URL format. Expected: https://github.com/owner/repo/pull/123');
  }

  console.log(`Fetching PR diff: ${owner}/${repo}/pull/${prNumber}`);

  // Fetch changed files from GitHub API
  let filesResponse;
  try {
    filesResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
  } catch (axiosError) {
    const status = axiosError.response?.status;
    if (status === 401) {
      throw new Error('GitHub token is invalid or expired. Please check your .env configuration.');
    } else if (status === 404) {
      throw new Error(`Pull request not found: ${owner}/${repo}/pull/${prNumber}. Please verify the URL.`);
    } else if (status === 422) {
      throw new Error('Invalid PR number. Please double-check the URL.');
    } else {
      throw new Error(`GitHub API error: ${axiosError.message}`);
    }
  }

  // Build diff text from changed files
  const files = filesResponse.data.map((file) => ({
    filename: file.filename,
    status: file.status,       // added / modified / deleted
    additions: file.additions, // ← naya: kitni lines add hui
    deletions: file.deletions, // ← naya: kitni lines hati
    patch: file.patch || '',
  }));

  const diffText = files
    .map((f) => `File: ${f.filename} (${f.status})\n${f.patch}`)
    .join('\n\n---\n\n');

  // ← Ab dono return karo — diffText aur files list
  return { diffText, files };
};

module.exports = { fetchPRDiff };
