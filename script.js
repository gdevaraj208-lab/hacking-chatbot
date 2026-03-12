const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Knowledge base for the bot
const knowledgeBase = {
    'sql injection': 'SQL Injection (SQLi) is a type of vulnerability that occurs when an attacker can interfere with the queries that an application makes to its database. Mitigation: Use prepared statements (parameterized queries).',
    'xss': 'Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users. Mitigation: Sanitize all user input and use Content Security Policy (CSP).',
    'brute force': 'A brute force attack consists of an attacker submitting many passwords or passphrases with the hope of eventually guessing correctly. Mitigation: Implement account lockout policies and multi-factor authentication (MFA).',
    'ethical hacking': 'Ethical hacking involves an authorized attempt to gain unauthorized access to a computer system, application, or data. It is used to identify vulnerabilities so they can be fixed.',
    'nmap': 'Nmap (Network Mapper) is a free and open-source utility for network discovery and security auditing. It is a staple tool for ethical hackers.',
    'metasploit': 'The Metasploit Framework is a powerful tool used by security professionals to find and exploit vulnerabilities in computer systems.',
    'phishing': 'Phishing is a type of social engineering attack often used to steal user data, including login credentials and credit card numbers.',
    'ransomware': 'Ransomware is a type of malware that threatens to publish the victim\'s personal data or perpetually block access to it unless a ransom is paid.',
};

// Function to add a message to the chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="${isUser ? 'user-avatar' : 'bot-avatar'}">
            <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
            <div class="message-meta">${isUser ? 'OPERATIVE' : 'SYSTEM'} | ${timestamp}</div>
        </div>
    `;
    
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function to simulate bot typing
async function botResponse(query) {
    const normalizedQuery = query.toLowerCase();
    let response = "I'm searching my decrypted databases for that information... No exact match found, but I can discuss common vulnerabilities, network security, or ethical hacking tools. Try asking about 'SQL Injection' or 'XSS'.";

    // Simple keyword matching
    for (const key in knowledgeBase) {
        if (normalizedQuery.includes(key)) {
            response = knowledgeBase[key];
            break;
        }
    }

    // Add thinking delay
    addMessage("Analysing packets...");
    const messages = chatHistory.getElementsByClassName('message');
    const lastMsg = messages[messages.length - 1];
    
    setTimeout(() => {
        if (lastMsg) lastMsg.remove(); // Remove thinking message
        addMessage(response);
    }, 1500);
}

// Event Listeners
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, true);
            userInput.value = '';
            botResponse(text);
        }
    });
}

if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
}

// Sidebar navigation simulation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) activeItem.classList.remove('active');
        item.classList.add('active');
        addMessage(`[SYSTEM] Accessing ${item.innerText.trim()} module... Access Granted.`);
    });
});

// Update stats simulation
setInterval(() => {
    const cpuFill = document.querySelector('.system-stats .fill');
    const cpuText = document.querySelector('.system-stats p');
    if (cpuFill && cpuText) {
        const newLoad = Math.floor(Math.random() * 20) + 60;
        cpuFill.style.width = `${newLoad}%`;
        cpuText.innerText = `CPU LOAD: ${newLoad}%`;
    }
}, 3000);

// Typing effect for initial message
window.onload = () => {
    console.log("Cyber Sentinel Uplink Active.");
};

// Hint clicks
document.querySelectorAll('.hints span').forEach(hint => {
    hint.addEventListener('click', () => {
        userInput.value = hint.innerText.replace(/"/g, '');
        sendBtn.click();
    });
});
