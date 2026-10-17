import { ASSESSMENT_QUESTIONS } from '../data/questions';
import {
  AssessmentResult,
  CategoryId,
  CategoryScore,
  Recommendation,
  SecurityStrength,
} from '../types/assessment';

const CATEGORY_METADATA: Record<CategoryId, { name: string; iconName: string }> = {
  password: { name: 'Password Security', iconName: 'Key' },
  mfa: { name: 'Multi-Factor Authentication', iconName: 'ShieldCheck' },
  device: { name: 'Device Security', iconName: 'Laptop' },
  phishing: { name: 'Phishing Awareness', iconName: 'Fish' },
  backup: { name: 'Backup & Data Protection', iconName: 'Database' },
  network: { name: 'Internet & Network Safety', iconName: 'Globe' },
};

export function calculateCyberHygieneScore(answers: Record<string, string>): AssessmentResult {
  const categoryScores: Record<CategoryId, CategoryScore> = {
    password: { id: 'password', name: CATEGORY_METADATA.password.name, iconName: CATEGORY_METADATA.password.iconName, earnedPoints: 0, maxPoints: 0, percentage: 0, status: 'Needs Attention' },
    mfa: { id: 'mfa', name: CATEGORY_METADATA.mfa.name, iconName: CATEGORY_METADATA.mfa.iconName, earnedPoints: 0, maxPoints: 0, percentage: 0, status: 'Needs Attention' },
    device: { id: 'device', name: CATEGORY_METADATA.device.name, iconName: CATEGORY_METADATA.device.iconName, earnedPoints: 0, maxPoints: 0, percentage: 0, status: 'Needs Attention' },
    phishing: { id: 'phishing', name: CATEGORY_METADATA.phishing.name, iconName: CATEGORY_METADATA.phishing.iconName, earnedPoints: 0, maxPoints: 0, percentage: 0, status: 'Needs Attention' },
    backup: { id: 'backup', name: CATEGORY_METADATA.backup.name, iconName: CATEGORY_METADATA.backup.iconName, earnedPoints: 0, maxPoints: 0, percentage: 0, status: 'Needs Attention' },
    network: { id: 'network', name: CATEGORY_METADATA.network.name, iconName: CATEGORY_METADATA.network.iconName, earnedPoints: 0, maxPoints: 0, percentage: 0, status: 'Needs Attention' },
  };

  let totalEarned = 0;
  let totalMax = 0;
  let answeredCount = 0;

  for (const q of ASSESSMENT_QUESTIONS) {
    const selectedOptionId = answers[q.id];
    const maxOptionPoints = Math.max(...q.options.map((o) => o.points));
    categoryScores[q.category].maxPoints += maxOptionPoints;
    totalMax += maxOptionPoints;

    if (selectedOptionId) {
      answeredCount++;
      const option = q.options.find((o) => o.id === selectedOptionId);
      if (option) {
        categoryScores[q.category].earnedPoints += option.points;
        totalEarned += option.points;
      }
    }
  }

  // Calculate percentages and status per category
  for (const catKey of Object.keys(categoryScores) as CategoryId[]) {
    const cat = categoryScores[catKey];
    cat.percentage = cat.maxPoints > 0 ? Math.round((cat.earnedPoints / cat.maxPoints) * 100) : 0;
    if (cat.percentage >= 80) {
      cat.status = 'Strong';
    } else if (cat.percentage >= 60) {
      cat.status = 'Good';
    } else if (cat.percentage >= 40) {
      cat.status = 'Developing';
    } else {
      cat.status = 'Needs Attention';
    }
  }

  const overallScore = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;

  let level: AssessmentResult['level'] = 'Needs Attention';
  let levelDescription = '';

  if (overallScore >= 80) {
    level = 'Strong';
    levelDescription =
      'You maintain exceptional cyber hygiene. Your proactive defense habits across credential management, multi-factor authentication, and threat vigilance put you far ahead of automated attack vectors.';
  } else if (overallScore >= 60) {
    level = 'Good';
    levelDescription =
      'You have solid fundamental digital security habits that protect you from common opportunist threats. Addressing a few specific gaps will elevate your personal security to an enterprise-grade standard.';
  } else if (overallScore >= 40) {
    level = 'Developing';
    levelDescription =
      'You have established some defensive practices, but notable exposure windows exist in your everyday digital workflows that attackers could exploit through credential reuse or phishing lures.';
  } else {
    level = 'Needs Attention';
    levelDescription =
      'Your digital habits currently carry significant risk of account compromise, ransomware exposure, or identity theft. Following our priority recommendations will substantially reduce your attack surface.';
  }

  // Dynamically identify strengths
  const strengths: SecurityStrength[] = [];
  if (answers['pwd_unique'] === 'pwd_u_all') {
    strengths.push({
      id: 'str_pwd_unique',
      title: 'Strong Password Separation',
      description: 'You eliminate password reuse across key accounts, preventing cascading compromise during third-party leaks.',
      category: 'password',
    });
  }
  if (answers['pwd_manager'] === 'pwm_tool') {
    strengths.push({
      id: 'str_pwm',
      title: 'Zero-Knowledge Password Management',
      description: 'You utilize a dedicated password manager to securely store and auto-fill cryptographically random credentials.',
      category: 'password',
    });
  }
  if (answers['mfa_enabled'] === 'mfa_e_all') {
    strengths.push({
      id: 'str_mfa',
      title: 'Comprehensive MFA Perimeter',
      description: 'You have multi-factor authentication enforced on all primary services, blocking 99%+ of automated account takeovers.',
      category: 'mfa',
    });
  }
  if (answers['mfa_method'] === 'mfam_hardware' || answers['mfa_method'] === 'mfam_totp') {
    strengths.push({
      id: 'str_mfa_totp',
      title: 'Phishing-Resistant 2FA Protocols',
      description: 'You rely on authenticator apps or hardware keys rather than vulnerable SMS channels.',
      category: 'mfa',
    });
  }
  if (answers['dev_updates'] === 'devu_auto') {
    strengths.push({
      id: 'str_updates',
      title: 'Proactive Patch Cadence',
      description: 'Automatic updates ensure critical CVE vulnerabilities and browser zero-days are remediated rapidly.',
      category: 'device',
    });
  }
  if (answers['dev_lock'] === 'devl_strict') {
    strengths.push({
      id: 'str_screen_lock',
      title: 'Disciplined Physical Device Security',
      description: 'Short screen timeouts and biometric barriers prevent opportunistic physical session tampering.',
      category: 'device',
    });
  }
  if (answers['phish_links'] === 'phl_scrutinize') {
    strengths.push({
      id: 'str_link_scrutiny',
      title: 'Vigilant Phishing Link Scrutiny',
      description: 'You inspect domains and navigate independently rather than blindly clicking unsolicited links.',
      category: 'phishing',
    });
  }
  if (answers['bak_routine'] === 'bak_321') {
    strengths.push({
      id: 'str_backup_321',
      title: 'Resilient 3-2-1 Backup Architecture',
      description: 'Multi-location automated backups guarantee rapid restoration without vulnerability to ransomware extortion.',
      category: 'backup',
    });
  }
  if (answers['net_public'] === 'netp_vpn') {
    strengths.push({
      id: 'str_net_vpn',
      title: 'Encrypted Public Wi-Fi Tunneling',
      description: 'You secure untrusted network traffic via trusted VPN tunnels, preventing local packet sniffing and rogue AP interception.',
      category: 'network',
    });
  }

  // If few specific strengths triggered, pull from top performing categories
  if (strengths.length < 2) {
    const topCategories = (Object.keys(categoryScores) as CategoryId[])
      .filter((c) => categoryScores[c].percentage >= 60)
      .sort((a, b) => categoryScores[b].percentage - categoryScores[a].percentage);

    for (const c of topCategories) {
      if (strengths.length >= 3) break;
      strengths.push({
        id: `str_general_${c}`,
        title: `Competent ${categoryScores[c].name}`,
        description: `Your responses reflect solid baseline safety practices in ${categoryScores[c].name.toLowerCase()}.`,
        category: c,
      });
    }
  }

  if (strengths.length === 0) {
    strengths.push({
      id: 'str_awareness',
      title: 'Security Awareness Motivation',
      description: 'Taking this self-assessment is the critical first step to auditing and systematically improving your cyber posture.',
      category: 'device',
    });
  }

  // Dynamically generate actionable recommendations
  const recommendations: Recommendation[] = [];

  // MFA recommendations
  if (answers['mfa_enabled'] === 'mfa_e_none' || answers['mfa_enabled'] === 'mfa_e_forced') {
    recommendations.push({
      id: 'rec_mfa_turn_on',
      title: 'Enable Multi-Factor Authentication',
      category: 'mfa',
      urgency: 'Critical',
      description: 'Protect your important accounts with an additional verification step. Static passwords alone are insufficient in modern breach environments.',
      actionableSteps: [
        'Open security settings on your primary email (Google, Microsoft, Apple, etc.).',
        'Enable 2-Step Verification / Multi-Factor Authentication.',
        'Apply the same setup to your bank, cloud storage, and social accounts.',
        'Generate and securely store printable offline emergency backup recovery codes.',
      ],
      whyItMatters:
        'Industry statistics from CISA and Microsoft show that enabling MFA stops 99.2% of automated account takeover attempts, even if an attacker has your exact password.',
    });
  } else if (answers['mfa_method'] === 'mfam_sms') {
    recommendations.push({
      id: 'rec_mfa_upgrade_totp',
      title: 'Upgrade from SMS Codes to an Authenticator App',
      category: 'mfa',
      urgency: 'Recommended',
      description: 'SMS verification codes are vulnerable to SIM-swap fraud, cellular interception, and lock-screen notification spying.',
      actionableSteps: [
        'Download a verified authenticator app like Google Authenticator, Microsoft Authenticator, or 2FAS.',
        'Log into your critical accounts and switch the 2FA method from "Text Message/SMS" to "Authenticator App".',
        'Scan the provided QR code and verify the 6-digit rolling token.',
        'Verify backup sync is enabled within the authenticator so you never lose access if you change phones.',
      ],
      whyItMatters:
        'Cellular carriers can be tricked into transferring your phone number to an attacker’s SIM card in a matter of minutes. Authenticator apps generate codes locally on your device without cellular vulnerability.',
    });
  }

  // Password recommendations
  if (answers['pwd_unique'] === 'pwd_u_none' || answers['pwd_unique'] === 'pwd_u_rare') {
    recommendations.push({
      id: 'rec_pwd_unique',
      title: 'Eliminate Password Reuse Across Accounts',
      category: 'password',
      urgency: 'Critical',
      description: 'Using the same or similar passwords across multiple services exposes all your accounts if even one small site is compromised.',
      actionableSteps: [
        'Immediately change passwords for your primary email and financial accounts to unique phrases.',
        'Never reuse your master email password on any other platform.',
        'Adopt passphrases made of 4 unrelated random words separated by hyphens.',
      ],
      whyItMatters:
        'When cybercriminals breach an arbitrary website, they use automated credential-stuffing tools to test leaked combinations against every major portal on the internet within hours.',
    });
  }

  if (answers['pwd_manager'] === 'pwm_memory' || answers['pwd_manager'] === 'pwm_plaintext') {
    recommendations.push({
      id: 'rec_pwd_manager',
      title: 'Adopt a Dedicated Password Manager',
      category: 'password',
      urgency: 'Recommended',
      description: 'Stop trying to memorize complex passwords or writing them in insecure locations. A password manager creates and stores uncrackable credentials.',
      actionableSteps: [
        'Sign up for an open-source or trusted zero-knowledge manager such as Bitwarden or 1Password.',
        'Create one strong, unforgettable master passphrase.',
        'Install the browser extension and mobile companion app.',
        'Gradually update old accounts to 16+ character auto-generated random passwords.',
      ],
      whyItMatters:
        'Password managers not only store complex passwords effortlessly, but they also prevent phishing by refusing to auto-fill credentials on fraudulent spoofed URLs.',
    });
  }

  // Device recommendations
  if (answers['dev_updates'] === 'devu_never' || answers['dev_updates'] === 'devu_postpone') {
    recommendations.push({
      id: 'rec_dev_updates',
      title: 'Enable Automatic System & App Updates',
      category: 'device',
      urgency: 'Critical',
      description: 'Delaying software patches leaves your devices vulnerable to well-documented security exploits and known vulnerabilities.',
      actionableSteps: [
        'Open OS settings (Windows Update or macOS Software Update) and switch on automatic installations.',
        'Enable automatic updates for your web browsers (Chrome, Edge, Firefox, Brave, Safari).',
        'Restart your system promptly when an update is pending rather than repeatedly clicking "Remind Me Tomorrow".',
      ],
      whyItMatters:
        'Most cyberattacks do not use mysterious unreleased zero-days; they exploit published vulnerabilities whose patches users simply failed to install in a timely manner.',
    });
  }

  if (answers['dev_protection'] === 'devp_disabled' || answers['dev_protection'] === 'devp_basic') {
    recommendations.push({
      id: 'rec_dev_encryption',
      title: 'Activate Full Disk Encryption (BitLocker / FileVault)',
      category: 'device',
      urgency: 'Recommended',
      description: 'If your laptop or tablet is stolen or misplaced, unencrypted drives can be connected to another machine to read every personal file without needing your login password.',
      actionableSteps: [
        'On Windows: Check Settings > Privacy & Security > Device Encryption or BitLocker.',
        'On macOS: Open System Settings > Privacy & Security > FileVault and click "Turn On".',
        'Back up the encryption recovery key in a secure, non-public location.',
      ],
      whyItMatters:
        'Full disk encryption scrambles every bit on the drive using AES encryption, ensuring complete data confidentiality if the physical hardware leaves your possession.',
    });
  }

  // Phishing recommendations
  if (answers['phish_links'] === 'phl_fast' || answers['phish_links'] === 'phl_curious') {
    recommendations.push({
      id: 'rec_phish_links',
      title: 'Practice Domain Inspection Before Clicking',
      category: 'phishing',
      urgency: 'Critical',
      description: 'Slow down when handling unexpected emails or direct messages. Phishing lures rely on manufacturing panic or excitement to bypass your critical thinking.',
      actionableSteps: [
        'Hover over links before clicking to check the destination URL in your browser’s bottom corner status preview.',
        'Inspect the sender domain closely for lookalikes (e.g., support@pay-pal-alert.com instead of paypal.com).',
        'When an email alerts you of an account problem, open a new browser tab and navigate to the service yourself.',
      ],
      whyItMatters:
        'Phishing is involved in over 70% of all data breaches. Taking 5 seconds to independently verify a message completely neutralizes the attack.',
    });
  }

  // Backup recommendations
  if (answers['bak_routine'] === 'bak_none' || answers['bak_routine'] === 'bak_manual') {
    recommendations.push({
      id: 'rec_backup_system',
      title: 'Create Regular Automated Backups',
      category: 'backup',
      urgency: 'Recommended',
      description: 'Keep important files backed up so you can recover them immediately if they are lost, corrupted, or compromised by hardware failure or malware.',
      actionableSteps: [
        'Enable continuous cloud backup for your documents and photos (OneDrive, Google Drive, iCloud, Backblaze).',
        'Connect an external drive and configure native snapshot tools (Windows File History or macOS Time Machine).',
        'Disconnect or isolate your external backup drive when not in use to safeguard against ransomware.',
      ],
      whyItMatters:
        'A comprehensive backup guarantees that ransomware cannot extort you and sudden hardware failures will never destroy irreplaceable family photos or tax records.',
    });
  }

  // Network recommendations
  if (answers['net_public'] === 'netp_carefree' || answers['net_public'] === 'netp_auto') {
    recommendations.push({
      id: 'rec_net_public',
      title: 'Secure Public Wi-Fi Connections',
      category: 'network',
      urgency: 'Recommended',
      description: 'Untrusted public Wi-Fi networks in cafes, hotels, and airports expose your traffic to packet eavesdropping and fake access point traps.',
      actionableSteps: [
        'Disable "Auto-connect to open Wi-Fi networks" in device settings.',
        'Use your mobile phone cellular hotspot instead of unencrypted public networks whenever possible.',
        'If you must connect, turn on a trusted VPN and confirm the HTTPS padlock on all websites.',
      ],
      whyItMatters:
        'Rogue Wi-Fi access points can mimic official venue names to perform man-in-the-middle attacks, harvesting browsing metadata and unencrypted credentials.',
    });
  }

  if (answers['net_router'] === 'netr_unsure' || answers['net_router'] === 'netr_isp') {
    recommendations.push({
      id: 'rec_net_router',
      title: 'Harden Home Wi-Fi Router Settings',
      category: 'network',
      urgency: 'Best Practice',
      description: 'Default router administrative credentials and outdated firmware make your home network perimeter vulnerable to automated botnet scanning.',
      actionableSteps: [
        'Log into your router admin panel (usually 192.168.1.1) and change the default admin password.',
        'Verify your Wi-Fi encryption is set to WPA3 or WPA2-AES (avoid legacy WEP/TKIP).',
        'Check for and apply router firmware updates.',
      ],
      whyItMatters:
        'A secured home router prevents attackers from tampering with your DNS servers to redirect legitimate bank traffic to malicious phishing clones.',
    });
  }

  // Fallback recommendation if user performed well across the board
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec_passkeys',
      title: 'Explore FIDO2 Passkeys & Hardware Keys',
      category: 'mfa',
      urgency: 'Best Practice',
      description: 'You already possess strong digital hygiene. Take your security to the cutting edge by replacing traditional passwords with cryptographic Passkeys.',
      actionableSteps: [
        'Check which of your services (Google, Apple, Microsoft, Amazon, GitHub) support Passkeys.',
        'Enroll your device biometrics or a YubiKey hardware token as a primary sign-in credential.',
        'Enjoy passwordless logins completely immune to remote phishing and credential theft.',
      ],
      whyItMatters:
        'Passkeys are tied directly to the website’s cryptographic domain origin, making it mathematically impossible for a phishing page to trick you into submitting your credentials.',
    });
  }

  return {
    overallScore,
    level,
    levelDescription,
    categoryScores,
    strengths,
    recommendations,
    answeredCount,
    totalQuestions: ASSESSMENT_QUESTIONS.length,
    completedAt: new Date().toISOString(),
  };
}
