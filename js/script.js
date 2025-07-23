document.addEventListener('DOMContentLoaded', function() {
  const toneButtons = document.querySelectorAll('.tone-btn');
  const generateBtn = document.getElementById('generate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const userInput = document.getElementById('user-input'); // For new email
  const receivedEmailInput = document.getElementById('received-email-input'); // For reply
  const replyUserInput = document.getElementById('reply-user-input'); // For reply
  const customTone = document.getElementById('custom-tone');
  const outputSection = document.getElementById('output-section');
  const outputContent = document.getElementById('output-content');
  const loadingElement = document.querySelector('.loading');
  const errorMessage = document.getElementById('error-message');

  const sendModeBtn = document.getElementById('send-mode-btn');
  const replyModeBtn = document.getElementById('reply-mode-btn');
  const sendEmailSection = document.getElementById('send-email-section');
  const replyEmailSection = document.getElementById('reply-email-section');

  let selectedTones = [];
  let currentMode = 'send'; // 'send' or 'reply'

  // --- Mode Switching Logic ---
  sendModeBtn.addEventListener('click', function() {
    currentMode = 'send';
    sendModeBtn.classList.add('selected');
    replyModeBtn.classList.remove('selected');
    sendEmailSection.style.display = 'block';
    replyEmailSection.style.display = 'none';
    clearAllInputs(); // Clear inputs when switching modes
  });

  replyModeBtn.addEventListener('click', function() {
    currentMode = 'reply';
    replyModeBtn.classList.add('selected');
    sendModeBtn.classList.remove('selected');
    sendEmailSection.style.display = 'none';
    replyEmailSection.style.display = 'block';
    clearAllInputs(); // Clear inputs when switching modes
  });

  // --- Tone selection logic ---
  toneButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tone = this.getAttribute('data-tone');

      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        selectedTones = selectedTones.filter(t => t !== tone);
      } else {
        this.classList.add('selected');
        selectedTones.push(tone);
      }
    });
  });

  // --- Generate email ---
  generateBtn.addEventListener('click', async function() {
    let inputToProcess = '';
    let promptRole = '';

    if (currentMode === 'send') {
      inputToProcess = userInput.value.trim();
      if (!inputToProcess) {
        alert('Please enter what you want to say for the new email.');
        return;
      }
      promptRole = `You are a professional email writing assistant. Rewrite the user's rough email draft in ${getTonesString()} tone. Make it polished, professional, and effective.`;
    } else { // currentMode === 'reply'
      const receivedEmail = receivedEmailInput.value.trim();
      const replyPoints = replyUserInput.value.trim();

      if (!receivedEmail || !replyPoints) {
        alert('Please paste the received email and provide your reply points.');
        return;
      }
      inputToProcess = `Received Email:\n---\n${receivedEmail}\n---\nMy Reply Points:\n---\n${replyPoints}`;
      promptRole = `You are a professional email writing assistant. Based on the "Received Email" and "My Reply Points" provided by the user, draft a polite and effective reply email in ${getTonesString()} tone. Ensure it addresses the points from the received email and incorporates the user's reply points, keeping it concise and professional.`;
    }

    let tones = [...selectedTones];
    if (customTone.value.trim()) {
      tones.push(customTone.value.trim());
    }

    if (tones.length === 0) {
      tones = ['professional']; // default tone
    }

    // Show loading state
    loadingElement.style.display = 'block';
    outputSection.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
      // In a real implementation, you would call the DeepSeek API here
      // This is a mock implementation for demonstration
      const generatedEmail = await mockApiCall(inputToProcess, tones, promptRole);

      outputContent.textContent = generatedEmail;
      outputSection.style.display = 'block';
    } catch (error) {
      console.error('Error:', error);
      errorMessage.style.display = 'block';
    } finally {
      loadingElement.style.display = 'none';
    }
  });

  // --- Clear all inputs ---
  clearBtn.addEventListener('click', clearAllInputs);

  function clearAllInputs() {
    userInput.value = '';
    receivedEmailInput.value = '';
    replyUserInput.value = '';
    customTone.value = '';
    selectedTones = [];
    toneButtons.forEach(btn => btn.classList.remove('selected'));
    outputSection.style.display = 'none';
    errorMessage.style.display = 'none';
  }

  // --- Copy to clipboard ---
  copyBtn.addEventListener('click', function() {
    const textToCopy = outputContent.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    });
  });

  // Helper to get tone string for prompt
  function getTonesString() {
    let tones = [...selectedTones];
    if (customTone.value.trim()) {
      tones.push(customTone.value.trim());
    }
    if (tones.length === 0) {
      return 'professional'; // default
    }
    if (tones.length === 1) {
      return tones[0];
    }
    return `${tones.slice(0, -1).join(', ')} and ${tones.slice(-1)}`;
  }

  async function mockApiCall(inputText, tones, promptRole) {
    try {
      // Replace 'YOUR_DEEPSEEK_API_KEY' with your actual DeepSeek API key
      const DEEPSEEK_API_KEY = 'Your_API_Key';

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{
            role: "system",
            content: promptRole // Use the dynamically generated prompt role
          }, {
            role: "user",
            content: inputText
          }],
          temperature: 0.7,
          max_tokens: 5000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error('Error calling DeepSeek API:', error);

      const toneDescription = getTonesString(); // Use the helper for consistency

      // Provide a more specific fallback based on the mode
      if (currentMode === 'send') {
        return `Subject: Your New Message\n\nDear Recipient,\n\nI hope this email finds you well. Here is a polished version of your message: ${inputText}\n\nThis response has been generated in a ${toneDescription} tone as requested.\n\nBest regards,\n[Your Name]`;
      } else { // Reply mode fallback
        const receivedEmailSnippet = inputText.split('---')[1] ? inputText.split('---')[1].trim() : 'the received email';
        const replyPointsSnippet = inputText.split('---')[3] ? inputText.split('---')[3].trim() : 'your points';

        return `Subject: Re: Your Inquiry\n\nDear [Sender Name from Received Email],\n\nThank you for your email. Regarding ${receivedEmailSnippet}, I wanted to convey: ${replyPointsSnippet}.\n\nThis reply has been generated in a ${toneDescription} tone as requested.\n\nBest regards,\n[Your Name]`;
      }
    }
  }
});