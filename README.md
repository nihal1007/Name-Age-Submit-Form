# Simple Data Submission Website

A clean, minimalist single-page website that collects **Name** and **Age**, validates the inputs, and automatically records each submission as a new row in a **Google Sheet** with the exact submission date and time.

---

## Project Structure

```
data-submission-site/
├── index.html      # The frontend user interface (single-page form)
├── style.css       # Clean, modern, responsive styling
├── script.js       # Form validation, fetch submission & config
├── Code.gs         # Google Apps Script code to paste into your Google Sheet
└── README.md       # Setup and deployment instructions
```

---

## Step-by-Step Setup Guide

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser to create a new spreadsheet.
2. Name your sheet something convenient (e.g., `User Submissions`).
3. *(Optional)* You can leave the sheet completely blank. The script will automatically insert the header row (`Name`, `Age`, `Submission Date/Time`) on the first submission.

---

### Step 2: Add the Google Apps Script
1. In your Google Sheet, click on the top menu: **Extensions** → **Apps Script**.
2. A new tab will open with the Apps Script editor.
3. Delete any default code inside the editor (such as `function myFunction() { ... }`).
4. Copy the entire contents of [`Code.gs`](./Code.gs) and paste it into the editor.
5. Click the **Save** icon (floppy disk) or press `Ctrl + S`.

---

### Step 3: Deploy as a Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button and select **New deployment**.
2. Click the **Gear icon (⚙️)** next to "Select type" and select **Web app**.
3. Configure the settings:
   - **Description**: `Data Submission Web App`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Important: This allows the website to send submissions without requiring users to log in to Google)*
4. Click **Deploy**.
5. If prompted with an **Authorization required** popup:
   - Click **Authorize access** (or **Review permissions**).
   - Choose your Google Account.
   - If Google shows *"Google hasn’t verified this app"*, click **Advanced** at the bottom left, then click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. Copy the **Web app URL** that appears on the confirmation screen. It will look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

### Step 4: Connect the Website to your Google Sheet
1. Open [`script.js`](./script.js) in your text editor.
2. Locate line 5:
   ```javascript
   const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"` with the URL you copied in Step 3. For example:
   ```javascript
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
   ```
4. Save the file.

---

### Step 5: Test the Website
1. Double-click [`index.html`](./index.html) to open it in any web browser.
2. Enter a **Name** (e.g., `Alice`) and **Age** (e.g., `28`).
3. Click **Submit**.
4. You will see:
   - The button shows `"Submitting..."` while the request is in flight.
   - The message `"Details submitted successfully!"` appears in green.
   - The input fields automatically reset.
5. Switch to your Google Sheet — you will see a new row with:
   - Column A: `Alice`
   - Column B: `28`
   - Column C: `2026-09-02 20:30:00` (exact timestamp)
