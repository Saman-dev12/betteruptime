export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hours ago`;
}

export function formatFrequency(freq: number): string {
  if (freq < 60) return `${freq} seconds`;
  if (freq < 3600) return `${freq / 60} minutes`;
  return `${freq / 3600} hours`;
}
