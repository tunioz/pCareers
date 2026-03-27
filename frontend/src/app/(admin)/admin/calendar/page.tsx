'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCandidateStatusBadge } from '@/components/admin/StatusBadge';
import styles from '@/styles/admin.module.scss';

interface CalendarEntry {
  id: number;
  full_name: string;
  status: string;
  job_title: string | null;
  date: string;
  type: 'interview' | 'task_deadline';
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const router = useRouter();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [entries, setEntries] = useState<Record<string, CalendarEntry[]>>({});
  const [loading, setLoading] = useState(true);

  const loadCalendar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/candidates/calendar?year=${year}&month=${month}`);
      const data = await res.json();
      if (data.success) {
        setEntries(data.data || {});
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => { loadCalendar(); }, [loadCalendar]);

  const goToPrev = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNext = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Build calendar grid
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  // Fill leading empty cells
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill trailing empty cells
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const getDateKey = (day: number) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <CalendarDays size={24} /> Calendar
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
        <button className={styles.btnGhost} onClick={goToPrev}>
          <ChevronLeft size={20} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 600, minWidth: '200px', textAlign: 'center', margin: 0 }}>
          {MONTH_NAMES[month - 1]} {year}
        </h2>
        <button className={styles.btnGhost} onClick={goToNext}>
          <ChevronRight size={20} />
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}><div className={styles.spinner} /></div>
      ) : (
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#fff',
        }}>
          {/* Day headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            background: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
          }}>
            {DAY_NAMES.map((d) => (
              <div key={d} style={{
                padding: '10px 8px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          {weeks.map((week, weekIdx) => (
            <div
              key={weekIdx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderBottom: weekIdx < weeks.length - 1 ? '1px solid #e5e7eb' : 'none',
              }}
            >
              {week.map((day, dayIdx) => {
                const dateKey = day ? getDateKey(day) : '';
                const dayEntries = day ? (entries[dateKey] || []) : [];
                const todayClass = day && isToday(day);

                return (
                  <div
                    key={dayIdx}
                    style={{
                      minHeight: '100px',
                      padding: '6px',
                      borderRight: dayIdx < 6 ? '1px solid #e5e7eb' : 'none',
                      background: day ? (todayClass ? '#f0f9ff' : '#fff') : '#f9fafb',
                      position: 'relative',
                    }}
                  >
                    {day && (
                      <>
                        <div style={{
                          fontSize: '13px',
                          fontWeight: todayClass ? 700 : 400,
                          color: todayClass ? '#0066ff' : '#374151',
                          marginBottom: '4px',
                          padding: '2px 4px',
                        }}>
                          {day}
                        </div>
                        {dayEntries.slice(0, 3).map((entry, i) => (
                          <div
                            key={i}
                            onClick={() => router.push(`/admin/candidates/${entry.id}`)}
                            style={{
                              fontSize: '11px',
                              padding: '2px 6px',
                              marginBottom: '2px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              background: entry.type === 'task_deadline' ? '#fef3c7' : '#e0f2fe',
                              color: entry.type === 'task_deadline' ? '#92400e' : '#0369a1',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                            title={`${entry.full_name} - ${entry.type === 'task_deadline' ? 'Task Deadline' : entry.status.replace(/_/g, ' ')}`}
                          >
                            {entry.full_name}
                          </div>
                        ))}
                        {dayEntries.length > 3 && (
                          <div style={{ fontSize: '10px', color: '#6b7280', paddingLeft: '6px' }}>
                            +{dayEntries.length - 3} more
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div style={{ display: 'flex', gap: '24px', marginTop: '16px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#e0f2fe' }} />
          Interview Stage
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#fef3c7' }} />
          Task Deadline
        </div>
      </div>
    </div>
  );
}
