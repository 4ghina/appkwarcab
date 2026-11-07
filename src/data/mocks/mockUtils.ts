// Helper to calculate age automatically from birth date string
export function calculateAge(birthDateStr?: string): number {
  if (!birthDateStr) return 0;
  const monthMap: Record<string, number> = {
    'januari': 0, 'jan': 0, 'februari': 1, 'feb': 1, 'maret': 2, 'mar': 2,
    'april': 3, 'apr': 3, 'mei': 4, 'juni': 5, 'jun': 5, 'juli': 6, 'jul': 6,
    'agustus': 7, 'agu': 7, 'ags': 7, 'september': 8, 'sep': 8,
    'oktober': 9, 'okt': 9, 'november': 10, 'nov': 10, 'desember': 11, 'des': 11
  };
  
  try {
    const parts = birthDateStr.trim().split(/[\s-]+/);
    if (parts.length === 3) {
      let day = 1, month = 0, year = 2000;
      if (parts[0].length === 4) {
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
      } else {
        day = parseInt(parts[0], 10);
        const mKey = parts[1].toLowerCase();
        month = monthMap[mKey] !== undefined ? monthMap[mKey] : (parseInt(parts[1], 10) - 1);
        year = parseInt(parts[2], 10);
      }
      const birth = new Date(year, month, day);
      const now = new Date();
      let age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
      return age > 0 ? age : 0;
    }
  } catch (e) {
    // fallback
  }
  return 0;
}
