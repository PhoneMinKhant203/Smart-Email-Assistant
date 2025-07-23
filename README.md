# Smart Email Assistant

A simple yet powerful web application that helps you draft and refine emails with the assistance of an AI, allowing you to choose the perfect tone for your message. It supports both composing new emails and crafting replies to existing ones.

## ✨ Features

* **New Email Composition:** Draft a fresh email from your rough thoughts.

* **Email Reply Assistant:** Paste a received email and provide your key reply points to generate a professional response.

* **Tone Selection:** Choose from predefined tones like Friendly, Professional, Formal, Persuasive, and Apologetic.

* **Custom Tone:** Specify your own unique tone (e.g., "enthusiastic," "concerned").

* **AI-Powered Generation:** Utilizes the DeepSeek API to transform your input into a polished email.

* **Loading & Error States:** Provides visual feedback during AI processing and handles potential errors gracefully.

* **Copy to Clipboard:** Easily copy the generated email with a single click.

* **Responsive Design:** Adapts to various screen sizes for a good user experience on desktop and mobile.

## 🚀 Technologies Used

* **HTML5:** For the basic structure of the web page.

* **CSS3:** For styling and layout.

* **JavaScript (ES6+):** For all interactive functionality and API communication.

* **DeepSeek API:** (Placeholder for AI text generation) The core intelligence behind the email drafting.

## 📦 Setup and Installation

To get this project up and running on your local machine, follow these simple steps:

1. **Clone or Download:**

   * **Clone with Git:**

     ```
     git clone [https://github.com/PhoneMinKhant203/Smart-Email-Assistant.git)
     cd smart-email-assistant
     
     ```


   * **Download ZIP:** Download the project as a ZIP file and extract it to your desired location.

2. **Folder Structure:** Ensure your project directory has the following structure:

smart-email-assistant/

├── index.html

├── css/

│   └── style.css

└── js/

  └── script.js

4. **Obtain DeepSeek API Key:**

* Go to the [DeepSeek API website](https://www.deepseek.com/) (or your chosen LLM provider).

* Sign up/log in and obtain your API key.

4. **Configure API Key:**

* Open the `js/script.js` file in a text editor.

* Locate the line:

  ```
  const DEEPSEEK_API_KEY = 'YOUR_DEEPSEEK_API_KEY';
  
  ```

* Replace `'YOUR_DEEPSEEK_API_KEY'` with your actual DeepSeek API key.

  ```
  const YOUR_DEEPSEEK_API_KEY = 'sk-YOUR_ACTUAL_DEEPSEEK_API_KEY_HERE'; // Example
  
  ```

5. **Open in Browser:**

* Simply open the `index.html` file in your web browser. You can usually do this by double-clicking the file.

## 💡 Usage

1. **Choose Mode:**

* Click the **"New Email"** button to compose a fresh email.

* Click the **"Reply Email"** button to draft a response to a received email.

2. **Input Your Text:**

* **New Email Mode:** Type your rough thoughts, ideas, or the core message you want to convey into the "What would you like to say?" text area.

* **Reply Email Mode:**

  * Paste the full content of the email you received into the "Paste the email you received here:" text area.

  * Enter your main reply points or what you want to say in response into the "What is your reply or main points?" text area.

3. **Select Tone(s):**

* Click on the predefined tone buttons (e.g., "Friendly," "Professional") to select one or more tones. Selected tones will be highlighted.

* If you have a specific tone in mind not listed, type it into the "Or specify your own:" input field.

4. **Generate Email:**

* Click the **"Generate Email"** button.

* A loading spinner will appear while the AI is crafting your email.

* Once generated, the polished email will appear in the "Your Polished Email" section.

5. **Clear Inputs:**

* Click the **"Clear"** button to reset all input fields and hide the output section.

6. **Copy Email:**

* Click the **"Copy to Clipboard"** button to quickly copy the generated email text. The button text will briefly change to "Copied!" to confirm.
