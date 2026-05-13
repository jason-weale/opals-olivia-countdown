import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

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
  const playoffSeries = [
    { matchup: 'Montréal vs Buffalo', status: 'Series tied 2-2' },
    { matchup: 'Carolina vs Philadelphia', status: 'Carolina wins 4-0' },
    { matchup: 'Colorado vs Minnesota', status: 'Colorado leads 3-1' },
    { matchup: 'Vegas vs Anaheim', status: 'Vegas leads 3-2' },
  ];
  const fireworkStyles = [
    { left: '8%', height: '58vh', size: '5.4rem', drift: '-14px', duration: '4.2s', delay: '-0.5s' },
    { left: '19%', height: '92vh', size: '7rem', drift: '18px', duration: '5.4s', delay: '-2.8s' },
    { left: '32%', height: '49vh', size: '4.8rem', drift: '-10px', duration: '4.7s', delay: '-1.6s' },
    { left: '45%', height: '76vh', size: '8rem', drift: '8px', duration: '6s', delay: '-4.3s' },
    { left: '58%', height: '61vh', size: '5.8rem', drift: '-20px', duration: '4.9s', delay: '-0.9s' },
    { left: '71%', height: '96vh', size: '6.8rem', drift: '14px', duration: '5.8s', delay: '-3.5s' },
    { left: '84%', height: '55vh', size: '5.2rem', drift: '-8px', duration: '4.4s', delay: '-2.1s' },
    { left: '94%', height: '86vh', size: '6.2rem', drift: '-18px', duration: '5.2s', delay: '-5.1s' },
  ];

  return (
    <main className="app-shell" aria-labelledby="app-title">
      <div className="spotlights" aria-hidden="true">
        <span className="spotlight spotlight-one" />
        <span className="spotlight spotlight-two" />
        <span className="spotlight spotlight-three" />
        <span className="spotlight spotlight-four" />
      </div>

      <div className="fireworks" aria-hidden="true">
        {fireworkStyles.map((style, index) => (
          <span
            className="firework"
            key={style.left}
            style={
              {
                '--firework-left': style.left,
                '--firework-height': style.height,
                '--firework-size': style.size,
                '--firework-drift': style.drift,
                '--firework-duration': style.duration,
                '--firework-delay': style.delay,
              } as CSSProperties
            }
          >
            <span className="rocket" />
            <span className={`burst burst-${(index % 3) + 1} ${index === 2 || index === 6 ? 'paw-burst' : ''}`}>
              {(index === 2 || index === 6) && (
                <>
                  <span className="paw-pad" />
                  <span className="paw-toe toe-one" />
                  <span className="paw-toe toe-two" />
                  <span className="paw-toe toe-three" />
                  <span className="paw-toe toe-four" />
                </>
              )}
            </span>
          </span>
        ))}
      </div>

      <div className="sparkle-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="content-stack">
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
              <div className={`time-tile time-tile-${item.label.toLowerCase()}`} key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="luna-scene" aria-label="Luna the black cat is guarding the countdown">
            <div className="cat-luna" aria-hidden="true">
              <div className="cat-tail" />
              <div className="cat-body" />
              <div className="cat-head">
                <span className="cat-ear left-ear" />
                <span className="cat-ear right-ear" />
                <span className="cat-eye left-eye" />
                <span className="cat-eye right-eye" />
              </div>
            </div>
            <p>Luna is guarding the countdown until concert night.</p>
          </div>

          <p className="footer-note">Deep purple sparkle mode is officially on.</p>
        </section>

        <aside className="hockey-corner" aria-label="Opal's hockey corner with Stanley Cup playoff series">
          <div className="hockey-heading">
            <span className="puck" aria-hidden="true" />
            <div>
              <p>Opal’s Hockey Corner</p>
              <h2>Stanley Cup Playoffs</h2>
            </div>
          </div>
          <div className="series-list">
            {playoffSeries.map((series) => (
              <div className="series-row" key={series.matchup}>
                <span>{series.matchup}</span>
                <strong>{series.status}</strong>
              </div>
            ))}
          </div>
          <p className="hockey-note">Round 2 · updated May 13</p>
        </aside>
      </div>
    </main>
  );
}

export default App;
