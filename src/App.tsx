import { useEffect, useMemo, useState } from 'react';

const EVENT_TIME = new Date('2026-10-22T19:30:00-04:00');
const EVENT_DATE_IN_MONTREAL = '2026-10-22';
const EVENT_TIME_ZONE = 'America/Toronto';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getMontrealDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: EVENT_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return `${year}-${month}-${day}`;
}

function getTimeLeft(now: Date): TimeLeft {
  const remaining = Math.max(EVENT_TIME.getTime() - now.getTime(), 0);
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number) {
  return value.toString().padStart(2, '0');
}

function App() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timeLeft = useMemo(() => getTimeLeft(now), [now]);
  const montrealToday = getMontrealDate(now);
  const isConcertDay = montrealToday === EVENT_DATE_IN_MONTREAL;
  const isAfterConcertDay = montrealToday > EVENT_DATE_IN_MONTREAL;
  const message = isConcertDay
    ? "It’s concert day, Opal! Have the best night ever."
    : isAfterConcertDay
      ? 'Hope the memories are still sparkling, Opal.'
      : 'Counting down to Olivia Rodrigo in Montréal!';

  const countdownItems = [
    { label: 'Days', value: timeLeft.days.toString() },
    { label: 'Hours', value: pad(timeLeft.hours) },
    { label: 'Minutes', value: pad(timeLeft.minutes) },
    { label: 'Seconds', value: pad(timeLeft.seconds) },
  ];

  return (
    <main className="app-shell" aria-labelledby="app-title">
      <div className="sparkle-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <section className="countdown-card">
        <p className="eyebrow">For Opal</p>
        <h1 id="app-title">Opal’s Olivia Rodrigo Countdown</h1>
        <p className="event-line">October 22, 2026 · 7:30 PM · Montréal</p>

        <div className="record-orbit" aria-hidden="true">
          <div className="record">
            <div className="record-center">OR</div>
          </div>
          <div className="orbit-star star-one" />
          <div className="orbit-star star-two" />
        </div>

        <p className="message">{message}</p>

        <div className="countdown-grid" aria-label="Live countdown to the concert">
          {countdownItems.map((item) => (
            <div className="time-tile" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <p className="footer-note">Purple sparkle mode is officially on.</p>
      </section>
    </main>
  );
}

export default App;
