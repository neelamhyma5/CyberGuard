import { Question } from '../types/assessment';

export const ASSESSMENT_QUESTIONS: Question[] = [
  // --- Category: Password Security ---
  {
    id: 'pwd_unique',
    category: 'password',
    categoryTitle: 'Password Security',
    categoryIconName: 'Key',
    title: 'Do you use unique passwords for your important accounts?',
    contextNote: 'Reusing identical or slightly modified passwords enables credential stuffing if one service gets breached.',
    options: [
      {
        id: 'pwd_u_all',
        label: 'Yes, every important account has a distinct, unique password',
        subtext: 'No reused passwords across email, banking, or personal accounts',
        points: 3,
      },
      {
        id: 'pwd_u_some',
        label: 'For some accounts, but I reuse variations on less critical sites',
        subtext: 'Different password for bank, but shared password for forums or retail',
        points: 2,
      },
      {
        id: 'pwd_u_rare',
        label: 'No, I use 2 or 3 common passwords across most of my logins',
        subtext: 'Same core password with minor number/symbol adjustments',
        points: 1,
      },
      {
        id: 'pwd_u_none',
        label: "I'm not sure / I use one primary password everywhere",
        subtext: 'High vulnerability to cascading account compromise',
        points: 0,
      },
    ],
  },
  {
    id: 'pwd_manager',
    category: 'password',
    categoryTitle: 'Password Security',
    categoryIconName: 'Key',
    title: 'How do you generate and store your passwords?',
    contextNote: 'Dedicated password managers generate cryptographically random strings and protect against memory loss.',
    options: [
      {
        id: 'pwm_tool',
        label: 'I use a dedicated password manager (e.g. Bitwarden, 1Password, KeePass)',
        subtext: 'With auto-generated long passwords and encrypted vault syncing',
        points: 3,
      },
      {
        id: 'pwm_browser',
        label: 'I rely on my browser or OS keychain (e.g. Google Chrome, Apple Keychain)',
        subtext: 'Convenient built-in storage with basic master authentication',
        points: 2,
      },
      {
        id: 'pwm_memory',
        label: 'I memorize them in my head using personal patterns or formulas',
        subtext: 'Prone to reuse, predictable substitutions, and simpler passwords',
        points: 1,
      },
      {
        id: 'pwm_plaintext',
        label: 'I write them on sticky notes, text files, or unencrypted spreadsheets',
        subtext: 'Unprotected physical or digital plain-text exposure',
        points: 0,
      },
    ],
  },
  {
    id: 'pwd_strength',
    category: 'password',
    categoryTitle: 'Password Security',
    categoryIconName: 'Key',
    title: 'What is the typical length and composition of your passwords?',
    contextNote: 'Length is the single most important factor in resisting modern offline GPU cracking.',
    options: [
      {
        id: 'pws_strong',
        label: '14+ characters, combining randomized symbols, numbers, and case-sensitive letters (or 4+ random passphrases)',
        subtext: 'Exceeds modern brute-force thresholds',
        points: 3,
      },
      {
        id: 'pws_medium',
        label: '10 to 13 characters with a mix of letters, numbers, and a symbol',
        subtext: 'Acceptable baseline resistance against common dictionaries',
        points: 2,
      },
      {
        id: 'pws_weak',
        label: '8 to 9 characters based on familiar words, birthdays, or simple substitutions (e.g. P@ssw0rd)',
        subtext: 'Predictable patterns easily cracked in minutes',
        points: 1,
      },
      {
        id: 'pws_vweak',
        label: 'Fewer than 8 characters or simple single words/names',
        subtext: 'Extremely vulnerable to dictionary attacks',
        points: 0,
      },
    ],
  },

  // --- Category: Multi-Factor Authentication ---
  {
    id: 'mfa_enabled',
    category: 'mfa',
    categoryTitle: 'Multi-Factor Authentication',
    categoryIconName: 'ShieldCheck',
    title: 'Do you have Multi-Factor Authentication (MFA/2FA) enabled on your accounts?',
    contextNote: 'MFA prevents over 99% of automated account takeover attempts even when passwords are leaked.',
    options: [
      {
        id: 'mfa_e_all',
        label: 'Yes, on all primary accounts (email, banking, password manager, social media)',
        subtext: 'Every critical portal requires a second factor to log in',
        points: 3,
      },
      {
        id: 'mfa_e_some',
        label: 'Enabled on banking and primary email, but not on social media or shopping',
        subtext: 'Key financial assets covered, but perimeter accounts exposed',
        points: 2,
      },
      {
        id: 'mfa_e_forced',
        label: 'Only when the service strictly forces me to turn it on',
        subtext: 'Rarely enabled voluntarily due to perceived friction',
        points: 1,
      },
      {
        id: 'mfa_e_none',
        label: 'No, or I disable it because it is inconvenient',
        subtext: 'Zero defense against compromised or breached credentials',
        points: 0,
      },
    ],
  },
  {
    id: 'mfa_method',
    category: 'mfa',
    categoryTitle: 'Multi-Factor Authentication',
    categoryIconName: 'ShieldCheck',
    title: 'Which multi-factor verification method do you primarily rely on?',
    contextNote: 'Hardware keys and authenticator apps resist SIM-swapping and SMS interception attacks.',
    options: [
      {
        id: 'mfam_hardware',
        label: 'Hardware security key (YubiKey / Passkey) or push-notification authenticator with number matching',
        subtext: 'Phishing-resistant second factor',
        points: 3,
      },
      {
        id: 'mfam_totp',
        label: 'Time-based Authenticator app (e.g. Google Authenticator, Microsoft Authenticator, 2FAS)',
        subtext: 'Robust defense against SIM swap vulnerabilities',
        points: 2,
      },
      {
        id: 'mfam_sms',
        label: 'SMS text messages or email verification codes',
        subtext: 'Better than no 2FA, but susceptible to SIM swap and interception',
        points: 1,
      },
      {
        id: 'mfam_none',
        label: "I do not use second-factor verification / I'm not sure",
        subtext: 'No additional barrier beyond static passwords',
        points: 0,
      },
    ],
  },

  // --- Category: Device Security ---
  {
    id: 'dev_updates',
    category: 'device',
    categoryTitle: 'Device Security',
    categoryIconName: 'Laptop',
    title: 'How promptly do you install operating system and application updates?',
    contextNote: 'Over 80% of successful exploits leverage previously published vulnerabilities with available patches.',
    options: [
      {
        id: 'devu_auto',
        label: 'Automatic updates are turned on; patches are applied within 24–48 hours',
        subtext: 'Zero-day and critical CVE patches deployed without delay',
        points: 3,
      },
      {
        id: 'devu_weekly',
        label: 'I install them regularly when prompted, usually within a week',
        subtext: 'Reasonably prompt patching cycle',
        points: 2,
      },
      {
        id: 'devu_postpone',
        label: 'I frequently postpone or dismiss update prompts for weeks or months',
        subtext: 'Extended exposure window to known exploits',
        points: 1,
      },
      {
        id: 'devu_never',
        label: 'I rarely or never update / I run an outdated, unsupported OS version',
        subtext: 'Severe exposure to unpatched vulnerabilities',
        points: 0,
      },
    ],
  },
  {
    id: 'dev_lock',
    category: 'device',
    categoryTitle: 'Device Security',
    categoryIconName: 'Laptop',
    title: 'Are your computer and mobile phone secured with screen locks and timeouts?',
    contextNote: 'Physical device security prevents unauthorized immediate access if unattended or stolen.',
    options: [
      {
        id: 'devl_strict',
        label: 'Yes, strong PIN/passphrase/biometrics with auto-lock set to 5 minutes or less',
        subtext: 'Immediate lockout upon idle or walking away',
        points: 3,
      },
      {
        id: 'devl_moderate',
        label: 'Yes, protected with a password or PIN, but timeout is 15 minutes or longer',
        subtext: 'Secured, but leaves an open window if left unattended',
        points: 2,
      },
      {
        id: 'devl_weak',
        label: 'Simple 4-digit PIN (e.g. 1234 or birth year) or swipe without password',
        subtext: 'Easily guessed by observers or shoulder surfers',
        points: 1,
      },
      {
        id: 'devl_none',
        label: 'No screen lock or password required to unlock my primary computer or phone',
        subtext: 'Open physical access to all stored sessions and files',
        points: 0,
      },
    ],
  },
  {
    id: 'dev_protection',
    category: 'device',
    categoryTitle: 'Device Security',
    categoryIconName: 'Laptop',
    title: 'Are your devices encrypted and guarded by active security software?',
    contextNote: 'Full disk encryption (BitLocker, FileVault) renders stored data unreadable if hardware is stolen.',
    options: [
      {
        id: 'devp_full',
        label: 'Full disk encryption is active (FileVault/BitLocker) and native security/antivirus is enabled',
        subtext: 'Stolen drive data is indecipherable and real-time defense is active',
        points: 3,
      },
      {
        id: 'devp_avonly',
        label: 'Security software / Windows Defender is running, but unsure about disk encryption',
        subtext: 'Malware protected, but physical theft could compromise local disk',
        points: 2,
      },
      {
        id: 'devp_basic',
        label: 'I rely on factory defaults without checking security settings',
        subtext: 'Unknown defense baseline',
        points: 1,
      },
      {
        id: 'devp_disabled',
        label: 'I have disabled firewalls or antivirus because they interfered with programs',
        subtext: 'System left unprotected from untrusted incoming traffic',
        points: 0,
      },
    ],
  },

  // --- Category: Phishing Awareness ---
  {
    id: 'phish_links',
    category: 'phishing',
    categoryTitle: 'Phishing Awareness',
    categoryIconName: 'Fish',
    title: 'When you receive an unexpected email or message containing a link or urgent call-to-action, how do you respond?',
    contextNote: 'Phishing remains the #1 initial access vector used by cybercriminals worldwide.',
    options: [
      {
        id: 'phl_scrutinize',
        label: 'I inspect the sender domain, hover over the link to verify the true URL, or navigate directly via browser bookmark',
        subtext: 'Never click unverified links in unsolicited communications',
        points: 3,
      },
      {
        id: 'phl_cautious',
        label: 'I scan for obvious grammar errors or suspicious branding before clicking',
        subtext: 'Helps against crude spam, but vulnerable to AI-crafted spear-phishing',
        points: 2,
      },
      {
        id: 'phl_curious',
        label: 'I usually click if it looks like it comes from a brand I know (Amazon, PayPal, Bank)',
        subtext: 'Susceptible to exact brand spoofing and lookalike domains',
        points: 1,
      },
      {
        id: 'phl_fast',
        label: 'I quickly click to resolve the alert or see what the notification is about',
        subtext: 'High likelihood of falling for urgency-driven credential harvesters',
        points: 0,
      },
    ],
  },
  {
    id: 'phish_attachments',
    category: 'phishing',
    categoryTitle: 'Phishing Awareness',
    categoryIconName: 'Fish',
    title: 'How do you handle unexpected email attachments (e.g. ZIP files, invoices, PDFs)?',
    contextNote: 'Malicious attachments often disguise executable scripts or weaponized macros inside innocent-looking archives.',
    options: [
      {
        id: 'pha_block',
        label: 'I never open unexpected attachments without verifying the sender via a separate secondary channel',
        subtext: 'Rigorous verification avoids zero-day payload execution',
        points: 3,
      },
      {
        id: 'pha_scan',
        label: 'I scan them with antivirus or preview them in a sandboxed web viewer first',
        subtext: 'Reduces risk of basic file execution',
        points: 2,
      },
      {
        id: 'pha_check',
        label: 'I open them if the subject line mentions something relevant to my work or purchases',
        subtext: 'Vulnerable to invoice fraud and vendor email compromise',
        points: 1,
      },
      {
        id: 'pha_open',
        label: 'I double-click to open them right away',
        subtext: 'Direct pathway for ransomware and infostealers',
        points: 0,
      },
    ],
  },
  {
    id: 'phish_requests',
    category: 'phishing',
    categoryTitle: 'Phishing Awareness',
    categoryIconName: 'Fish',
    title: 'If an apparent friend, executive, or service requests immediate credential verification or gift card purchases, what do you do?',
    contextNote: 'Social engineering exploits psychological pressure, authority, and manufactured panic.',
    options: [
      {
        id: 'phr_verify',
        label: 'Recognize the red flag immediately and verify through a trusted out-of-band phone call or known number',
        subtext: 'Zero trust applied to urgent emotional or financial demands',
        points: 3,
      },
      {
        id: 'phr_pause',
        label: 'Pause and ask a colleague or friend if it looks suspicious before taking action',
        subtext: 'Hesitation helps break the urgency trap',
        points: 2,
      },
      {
        id: 'phr_reply',
        label: 'Reply directly to the email or message asking if it is really them',
        subtext: 'Attacker simply confirms their own spoofed identity',
        points: 1,
      },
      {
        id: 'phr_comply',
        label: 'Follow the instructions quickly to avoid getting in trouble or losing account access',
        subtext: 'High compliance vulnerability',
        points: 0,
      },
    ],
  },

  // --- Category: Backup & Data Protection ---
  {
    id: 'bak_routine',
    category: 'backup',
    categoryTitle: 'Backup & Data Protection',
    categoryIconName: 'Database',
    title: 'How frequently and reliably do you back up your critical documents and files?',
    contextNote: 'A 3-2-1 backup strategy protects against ransomware, hardware death, and accidental deletion.',
    options: [
      {
        id: 'bak_321',
        label: 'Automated 3-2-1 approach: continuous cloud backup plus isolated periodic external drive copies',
        subtext: 'Immune to single point of failure or ransomware wipeout',
        points: 3,
      },
      {
        id: 'bak_cloud',
        label: 'Regular cloud sync (e.g. OneDrive, iCloud, Google Drive) for most of my everyday documents',
        subtext: 'Good file versioning, though synced ransomware could theoretically propagate',
        points: 2,
      },
      {
        id: 'bak_manual',
        label: 'Occasional manual copies to a USB drive every few months when I remember',
        subtext: 'High risk of losing recent weeks or months of irreplaceable work',
        points: 1,
      },
      {
        id: 'bak_none',
        label: 'I do not have a backup system; if my drive fails, my files are gone',
        subtext: 'Critical single point of catastrophic data loss',
        points: 0,
      },
    ],
  },
  {
    id: 'bak_sharing',
    category: 'backup',
    categoryTitle: 'Backup & Data Protection',
    categoryIconName: 'Database',
    title: 'How do you handle sensitive documents (tax forms, ID photos, financial records)?',
    contextNote: 'Unencrypted storage of identity documents is the leading cause of persistent identity theft.',
    options: [
      {
        id: 'bks_encrypted',
        label: 'Stored in password-protected/encrypted vaults and sent only via secure, expiring portal links',
        subtext: 'Zero plain-text exposure in email inboxes or chat logs',
        points: 3,
      },
      {
        id: 'bks_passworded',
        label: 'Kept in standard folders, but password-protected before emailing if requested',
        subtext: 'Basic privacy measure applied case-by-case',
        points: 2,
      },
      {
        id: 'bks_plain',
        label: 'Stored in regular desktop/downloads folders and sent as regular email attachments',
        subtext: 'Remains permanently searchable in sent mail and cloud archives',
        points: 1,
      },
      {
        id: 'bks_careless',
        label: 'Uploaded to free online conversion tools or shared via unencrypted messaging apps without thinking',
        subtext: 'Third-party indexing and data broker scraping exposure',
        points: 0,
      },
    ],
  },

  // --- Category: Internet & Network Safety ---
  {
    id: 'net_public',
    category: 'network',
    categoryTitle: 'Internet & Network Safety',
    categoryIconName: 'Globe',
    title: 'When connecting to public Wi-Fi networks (cafes, airports, hotels), what precautions do you take?',
    contextNote: 'Public open Wi-Fi allows malicious actors to perform man-in-the-middle sniffing and rogue AP attacks.',
    options: [
      {
        id: 'netp_vpn',
        label: 'I use a trusted VPN or mobile cellular hotspot; never connect to open untrusted Wi-Fi without encryption',
        subtext: 'All outgoing traffic is securely tunneled and protected against eavesdropping',
        points: 3,
      },
      {
        id: 'netp_https',
        label: 'I connect to public Wi-Fi, but ensure HTTPS padlock is active and avoid logging into banking',
        subtext: 'Basic hygiene reduces exposure to cleartext credential theft',
        points: 2,
      },
      {
        id: 'netp_carefree',
        label: 'I connect to any available free open Wi-Fi and conduct my regular browsing and logins',
        subtext: 'Vulnerable to evil-twin rogue access points and DNS spoofing',
        points: 1,
      },
      {
        id: 'netp_auto',
        label: 'My device automatically connects to any open Wi-Fi network without prompting me',
        subtext: 'Passive vulnerability without user consent',
        points: 0,
      },
    ],
  },
  {
    id: 'net_router',
    category: 'network',
    categoryTitle: 'Internet & Network Safety',
    categoryIconName: 'Globe',
    title: 'Have you changed your home Wi-Fi router admin password and verified network encryption?',
    contextNote: 'Default router passwords (e.g. admin/admin) allow attackers on your network to hijack DNS settings.',
    options: [
      {
        id: 'netr_hardened',
        label: 'Yes, changed the default admin password, updated router firmware, and use WPA3 or WPA2-AES encryption',
        subtext: 'Hardened network perimeter with isolated guest network for IoT devices',
        points: 3,
      },
      {
        id: 'netr_pwonly',
        label: 'I changed the Wi-Fi network password, but kept the router admin portal on factory default',
        subtext: 'Wi-Fi protected, but local administrative panel remains vulnerable',
        points: 2,
      },
      {
        id: 'netr_isp',
        label: 'Using whatever standard password was printed on the sticker by the ISP',
        subtext: 'Commonly known default algorithm dictionaries',
        points: 1,
      },
      {
        id: 'netr_unsure',
        label: "I don't know how to access my router settings or whether it is encrypted",
        subtext: 'Potential open or legacy WEP security configuration',
        points: 0,
      },
    ],
  },
];
