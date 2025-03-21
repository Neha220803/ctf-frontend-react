const challenges = {
  easy: [
    {
      id: "easy-1",
      name: "Cryptography",
      points: 100,
      description: "Decrypt a simple cipher text.",
      level: "Easy",
    },
    {
      id: "easy-2",
      name: "Steganography",
      points: 100,
      description: "Find the hidden message in an image.",
      level: "Easy",
    },
    {
      id: "easy-3",
      name: "Web Exploitation",
      points: 100,
      description: "Find an SQL Injection vulnerability.",
      level: "Easy",
    },
    {
      id: "easy-4",
      name: "Binary Exploitation",
      points: 100,
      description: "Analyze a basic buffer overflow vulnerability.",
      level: "Easy",
    },
    {
      id: "easy-5",
      name: "Reverse Engineering",
      points: 100,
      description: "Extract a hidden string from a compiled binary.",
      level: "Easy",
    },
    {
      id: "easy-6",
      name: "Forensics",
      points: 100,
      description: "Extract metadata from a file.",
      level: "Easy",
    },
    {
      id: "easy-7",
      name: "OSINT Challenge",
      points: 100,
      description: "Find a specific person using open-source intelligence.",
      level: "Easy",
    },
  ],
  medium: [
    {
      id: "medium-1",
      name: "Cryptography",
      points: 200,
      description: "Decrypt a message encoded with an advanced cipher.",
      level: "Medium",
    },
    {
      id: "medium-2",
      name: "Steganography",
      points: 200,
      description: "Extract hidden text from an audio file.",
      level: "Medium",
    },
    {
      id: "medium-3",
      name: "Web Exploitation",
      points: 200,
      description:
        "Find and exploit a Cross-Site Scripting (XSS) vulnerability.",
      level: "Medium",
    },
    {
      id: "medium-4",
      name: "Binary Exploitation",
      points: 200,
      description:
        "Analyze an executable to find and exploit a buffer overflow.",
      level: "Medium",
    },
    {
      id: "medium-5",
      name: "Reverse Engineering",
      points: 200,
      description: "Reverse engineer an application to bypass authentication.",
      level: "Medium",
    },
    {
      id: "medium-6",
      name: "Forensics",
      points: 200,
      description: "Recover deleted files from an image dump.",
      level: "Medium",
    },
    {
      id: "medium-7",
      name: "OSINT Challenge",
      points: 200,
      description:
        "Trace an online identity through multiple social platforms.",
      level: "Medium",
    },
  ],
  hard: [
    {
      id: "hard-1",
      name: "Hard 1",
      points: 500,
      description:
        "A complex King of the Hill Challenge involving multiple vulnerabilities.",
      level: "Hard",
    },
  ],
};

export default challenges;
