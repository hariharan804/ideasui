import base64

svg = """<svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- IdeasUI Modern Hexagonal Mark -->
  <path d="M12 2.5L20.6603 7.5V17.5L12 22.5L3.33975 17.5V7.5L12 2.5Z" fill="#818CF8"/>
  <path d="M12 30V40M20.6603 35L12 40L3.33975 35" stroke="#818CF8" stroke-width="2" stroke-linecap="round"/>
  <circle cx="12" cy="12.5" r="2.5" fill="white"/>
  <rect x="10.5" y="17" width="3" height="8" rx="1.5" fill="white"/>
  <g transform="translate(40, 28)">
    <rect x="0" y="-18" width="5.5" height="18" rx="1" fill="#FFFFFF"/>
    <path d="M18.5 -18V00M18.5 -9C18.5 -4 14.5 0 9.5 0C4.5 0 0.5 -4 0.5 -9C0.5 -14 4.5 -18 9.5 -18" transform="translate(8, 0)" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M15 -9H0.5C0.5 -14 4.5 -18 9.5 -18C14.5 -18 18.5 -14 18.5 -9C18.5 -4 14.5 0 9.5 0" transform="translate(30, 0)" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M18.5 -9V00M0.5 -9C0.5 -4 4.5 0 9.5 0C14.5 0 18.5 -4 18.5 -9C18.5 -14 14.5 -18 9.5 -18C4.5 -18 0.5 -14 0.5 -9" transform="translate(52, 0)" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M18 -18C18 -18 2 -18 2 -13C2 -9 18 -9 18 -5C18 0 2 0 2 0" transform="translate(74, 0)" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M2 -18V-7C2 -2 6 -2 10 -2C14 -2 18 -2 18 -7V-18" transform="translate(100, 0)" stroke="#818CF8" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <rect x="2" y="-18" width="4.5" height="18" rx="1" transform="translate(124, 0)" fill="#818CF8"/>
  </g>
</svg>"""

with open('logo-white.txt', 'w') as f:
    f.write(base64.b64encode(svg.encode('utf-8')).decode('utf-8'))
