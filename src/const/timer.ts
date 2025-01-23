export type TimerConfig = {
  targetDate: Date;
};

// Read and validate the environment variable
const rawTargetDate = process.env.NEXT_PUBLIC_TARGET_DATE;

if (!rawTargetDate) {
  throw new Error('Environment variable NEXT_PUBLIC_TARGET_DATE is missing.');
}

const t = rawTargetDate.split(/[^0-9]/).map(t => parseInt(t));
const parsedDate = new Date(t[0], t[1] - 1, t[2]);
if (isNaN(parsedDate.getTime())) {
  throw new Error(
    `Invalid date format in NEXT_PUBLIC_TARGET_DATE: ${rawTargetDate}`,
  );
}

// Export the configuration
export const TimerConfig: TimerConfig = {
  targetDate: parsedDate,
};
