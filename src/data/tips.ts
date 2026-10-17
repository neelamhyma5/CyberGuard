export interface CyberTip {
  id: string;
  category: string;
  title: string;
  summary: string;
  actionItems: string[];
  threatVector: string;
  proTip: string;
  iconName: string;
}

export const CYBER_TIPS: CyberTip[] = [
  // --- Account Security ---
  {
    id: 'tip_unique_passwords',
    category: 'Account Security',
    title: 'Eliminate Password Reuse Across All Sites',
    summary: 'Never use the same password twice. When one minor merchant or service suffers a database breach, automated cybercrime bots immediately test those credentials against thousands of banks, email providers, and social platforms.',
    actionItems: [
      'Treat your primary email account password as a top-secret master credential.',
      'Audit your existing passwords to eliminate reused variations.',
      'Adopt passphrases made of 4+ completely unrelated words (e.g., "radiant-cactus-velvet-compass").',
      'Never include personal details such as pet names, birth years, or postal codes.',
    ],
    threatVector: 'Credential Stuffing & Password Spraying Attacks',
    proTip: 'A 16-character passphrase of random words has trillions of times higher entropy than an 8-character complex password like "P@ssw0rd1!".',
    iconName: 'Key',
  },
  {
    id: 'tip_mfa',
    category: 'Account Security',
    title: 'Enforce Phishing-Resistant Multi-Factor Authentication',
    summary: 'Multi-factor authentication (MFA) requires two distinct pieces of evidence before granting access. Even if your password is leaked online, an attacker cannot log in without the physical second factor.',
    actionItems: [
      'Turn on MFA on your primary email, cloud storage, banking, and social profiles.',
      'Migrate from SMS verification codes to an authenticator app (such as Google Authenticator, Microsoft Authenticator, or 2FAS).',
      'For high-value accounts, consider a FIDO2 hardware security key (e.g., YubiKey) or Passkeys.',
      'Safely store one-time recovery backup codes offline in a secure lockbox or encrypted vault.',
    ],
    threatVector: 'SIM Swapping, Credential Theft & Automated Account Takeover',
    proTip: 'SMS codes travel over unencrypted cellular networks and can be rerouted via SIM swap fraud. Authenticator apps generate time-based codes locally on your device.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'tip_password_manager',
    category: 'Account Security',
    title: 'Deploy an End-to-End Encrypted Password Manager',
    summary: 'Modern humans have 100+ digital accounts. It is neurologically impossible to memorize 100 strong, unique passwords. A password manager generates, encrypts, and auto-fills credentials for you.',
    actionItems: [
      'Choose a reputable zero-knowledge manager like Bitwarden, 1Password, or KeePass.',
      'Set one exceptionally strong master passphrase and memorize it thoroughly.',
      'Use the built-in password generator to create 16+ character random passwords for every new login.',
      'Enable biometric unlock (fingerprint or Face ID) for effortless daily access without sacrificing security.',
    ],
    threatVector: 'Brute-force Cracking & Shoulder Surfing',
    proTip: 'Password managers also protect you from phishing: if you land on a spoofed fake website (e.g. paypa1.com), the manager will recognize the domain mismatch and refuse to auto-fill your credentials.',
    iconName: 'Lock',
  },

  // --- Device Security ---
  {
    id: 'tip_system_updates',
    category: 'Device Security',
    title: 'Automate Operating System & App Updates',
    summary: 'Software patches are not just about new features; they routinely seal critical security vulnerabilities discovered by security researchers or exploited in the wild by threat actors.',
    actionItems: [
      'Enable automatic operating system updates on Windows, macOS, iOS, and Android.',
      'Do not postpone browser updates; modern browsers release emergency zero-day patches frequently.',
      'Uninstall unused applications, legacy browser extensions, and obsolete software.',
      'Restart your computer at least once a week to allow pending system kernels and updates to apply.',
    ],
    threatVector: 'Zero-Day Vulnerabilities & Remote Code Execution (RCE)',
    proTip: 'Over 80% of enterprise ransomware attacks exploit unpatched CVE vulnerabilities for which fixes had been available for over 30 days.',
    iconName: 'Laptop',
  },
  {
    id: 'tip_screen_lock',
    category: 'Device Security',
    title: 'Configure Short Lock Timeouts & Biometric Barriers',
    summary: 'Physical access is total access. An unlocked laptop left on a coffee shop table or in an office hallway allows any bystander to copy browser cookies, extract sensitive tokens, or export personal chats in under 60 seconds.',
    actionItems: [
      'Set computer display sleep / auto-lock timeout to 5 minutes or less.',
      'Get into the muscle memory habit of locking your screen every time you stand up (Win+L on Windows, Ctrl+Cmd+Q on Mac).',
      'Use a 6-digit minimum PIN or alphanumeric passphrase on mobile phones rather than simple 4-digit codes.',
      'Disable lock-screen preview notifications for SMS codes and messaging apps so bystanders cannot read incoming 2FA codes.',
    ],
    threatVector: 'Physical Tampering & Unattended Session Hijacking',
    proTip: 'On macOS and Windows, enable "Require password immediately after display goes to sleep" in system security preferences.',
    iconName: 'Smartphone',
  },
  {
    id: 'tip_disk_encryption',
    category: 'Device Security',
    title: 'Enable Full Disk Encryption on Laptops & Storage',
    summary: 'If a laptop is misplaced or stolen from a vehicle or airport, simply having a Windows or Mac login password does not protect your files. Anyone can remove the physical SSD and read your documents unless full disk encryption is turned on.',
    actionItems: [
      'Enable BitLocker on Windows 11/10 Pro, or Device Encryption on Windows Home.',
      'Verify FileVault is enabled on macOS (System Settings > Privacy & Security).',
      'Save your recovery key in an encrypted safe location, not on a loose sticky note.',
      'Encrypt external USB drives and backup disks using native disk utilities.',
    ],
    threatVector: 'Hardware Theft & Offline Cold-Boot Data Extraction',
    proTip: 'Modern CPUs include hardware-accelerated AES instructions, so disk encryption operates seamlessly with zero noticeable performance impact.',
    iconName: 'HardDrive',
  },

  // --- Phishing Protection ---
  {
    id: 'tip_inspect_links',
    category: 'Phishing Protection',
    title: 'Scrutinize Links and Sender Domains Before Clicking',
    summary: 'Cybercriminals craft high-fidelity replicas of brand emails (banks, package delivery, streaming services) using subtle character substitutions (e.g. "arnazon.com" instead of "amazon.com") or misleading display names.',
    actionItems: [
      'Always hover your cursor over hyperlinked text or buttons to inspect the actual destination URL before clicking.',
      'Check the full email sender address, not just the friendly display name.',
      'If an email claims your account is locked, never click the email link; open your browser directly and navigate to the official website yourself.',
      'Look for top-level domain anomalies (e.g., paypal-security.xyz instead of paypal.com).',
    ],
    threatVector: 'Spear Phishing & Deceptive Lookalike Domains',
    proTip: 'On mobile devices, long-press a link to preview the full URL destination before letting your browser open it.',
    iconName: 'Fish',
  },
  {
    id: 'tip_attachment_safety',
    category: 'Phishing Protection',
    title: 'Treat Unsolicited Attachments With Zero Trust',
    summary: 'Email attachments remain a primary transmission channel for ransomware, infostealers, and remote access trojans (RATs). Files disguised as invoices, shipping receipts, or resumes often contain malicious scripts.',
    actionItems: [
      'Be extremely wary of ZIP, RAR, 7Z, ISO, or executable (.exe, .scr, .vbs) file attachments.',
      'Never enable macros ("Enable Editing" / "Enable Content") in unexpected Word or Excel documents.',
      'If an attachment comes from someone you know but sounds unusual or out of character, contact them via phone or a different channel to confirm.',
      'Use web-based document previewers (like Gmail or Outlook online preview) rather than downloading directly to your machine.',
    ],
    threatVector: 'Malware Payloads, Ransomware & Macro-based Exploits',
    proTip: 'Windows by default hides known file extensions. Enable "File name extensions" in Windows File Explorer so you can see if "invoice.pdf.exe" is trying to deceive you.',
    iconName: 'FileWarning',
  },
  {
    id: 'tip_urgency_panic',
    category: 'Phishing Protection',
    title: 'Recognize Manufactured Urgency and Emotional Traps',
    summary: 'Social engineers design lures that trigger panic, fear, or excitement: "Immediate account suspension in 2 hours", "Unauthorized $890 charge", or "Gift cards needed urgently for executive meeting".',
    actionItems: [
      'Whenever an email or message demands immediate urgency, deliberately slow down and breathe.',
      'Legitimate financial institutions and government agencies will never ask for gift card payments, crypto transfers, or passwords over the phone.',
      'Establish a personal verification rule: verify any transfer of money or sensitive data using known contact numbers.',
    ],
    threatVector: 'Executive Impersonation (CEO Fraud) & Psychological Coercion',
    proTip: 'The more urgent the message sounds, the higher the mathematical probability that it is a deceptive social engineering attack.',
    iconName: 'AlertTriangle',
  },

  // --- Data Protection ---
  {
    id: 'tip_backup_rule',
    category: 'Data Protection',
    title: 'Implement the 3-2-1 Gold Standard Backup Strategy',
    summary: 'Hard drives fail, ransomware encrypts, and laptops get spilled on. Data that exists in only one place is data that does not truly exist.',
    actionItems: [
      'Maintain 3 total copies of critical files (1 primary working copy + 2 backups).',
      'Store backups on 2 different media formats (e.g. internal drive + external solid-state drive or cloud vault).',
      'Keep at least 1 copy off-site or in secure cloud storage, isolated from physical disasters or home theft.',
      'Regularly test restoring a sample folder to verify your backup files are intact and uncorrupted.',
    ],
    threatVector: 'Hardware Failure, Ransomware Extortion & Natural Disasters',
    proTip: 'Cloud file syncing (like Dropbox or Google Drive) is helpful, but if ransomware encrypts your local files, those encrypted files might sync to the cloud. True version-history backups allow rolling back to yesterday.',
    iconName: 'Database',
  },
  {
    id: 'tip_app_permissions',
    category: 'Data Protection',
    title: 'Audit App Permissions & Avoid Unnecessary Oversharing',
    summary: 'Smartphones and browsers accumulate dozens of apps and extensions that have permissions to your camera, microphone, contacts, location, and clipboard. Stale permissions increase your passive surveillance footprint.',
    actionItems: [
      'Review mobile app permissions in iOS/Android settings once every quarter; revoke location and background access for apps that do not need it.',
      'Remove browser extensions you installed for a one-off task; extensions can read website content and typed passwords.',
      'Never post photos of boarding passes, concert tickets with barcodes, or office keycards on social media.',
      'Use privacy-respecting search engines and enable tracking protection in your browser settings.',
    ],
    threatVector: 'Data Broker Aggregation, Rogue Extensions & Location Tracking',
    proTip: 'Both iOS and Android have an "Auto-reset permissions for unused apps" toggle. Make sure this is enabled so inactive apps lose access automatically.',
    iconName: 'EyeOff',
  },

  // --- Network Safety ---
  {
    id: 'tip_public_wifi',
    category: 'Internet & Network Safety',
    title: 'Protect Your Traffic on Public & Untrusted Wi-Fi',
    summary: 'When you join coffee shop, airport, or hotel Wi-Fi, other devices connected to the same network can attempt ARP spoofing, rogue DNS redirects, or analyze unencrypted traffic patterns.',
    actionItems: [
      'Turn off "Auto-connect to open Wi-Fi networks" on all your mobile devices and laptops.',
      'Use your phone’s cellular personal hotspot instead of unknown public Wi-Fi whenever handling sensitive financial transactions.',
      'If using public Wi-Fi, ensure your trusted VPN is active to tunnel all packet streams through encrypted layers.',
      'Ensure the browser padlock (HTTPS) is present on every webpage, and immediately disconnect if you see an SSL/TLS certificate warning.',
    ],
    threatVector: 'Man-in-the-Middle (MitM) Eavesdropping & Evil Twin Hotspots',
    proTip: 'Never install "security profile certificates" or custom root certificates requested by public Wi-Fi login splash pages; they allow the network operator to inspect encrypted SSL connections.',
    iconName: 'Wifi',
  },
  {
    id: 'tip_router_hardening',
    category: 'Internet & Network Safety',
    title: 'Harden Your Home Wi-Fi Router Perimeter',
    summary: 'Your home router is the digital gateway to every phone, laptop, TV, and smart home IoT device in your household. A compromised router puts every connected family member at risk.',
    actionItems: [
      'Log into your router admin console (typically 192.168.1.1 or 192.168.0.1) and change the factory administrator credentials immediately.',
      'Configure Wi-Fi encryption to WPA3-Personal, or WPA2-AES if legacy devices require compatibility.',
      'Enable automated firmware updates to ensure router CVE vulnerabilities are patched.',
      'Create an isolated Guest Wi-Fi network specifically for smart home IoT devices (smart TVs, bulbs, robot vacuums) away from your work computers.',
    ],
    threatVector: 'Router Botnets, DNS Hijacking & Lateral Network Movement',
    proTip: 'Disable "Remote Management" / "WAN Access to Admin Interface" in your router settings so the admin console cannot be reached from the public internet.',
    iconName: 'Globe',
  },
];
