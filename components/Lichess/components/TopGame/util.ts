export const secondsToClock = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds === 0 ? '00' : remainingSeconds}`;
}
