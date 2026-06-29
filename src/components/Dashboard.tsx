import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  useTheme,
  CardActionArea,
} from '@mui/material';
import { Title, useDataProvider } from 'react-admin';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const getDayLabel = (date: Date) => {
  return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][date.getDay()];
};

const buildWeekData = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      dateKey: date.toISOString().slice(0, 10),
      day: getDayLabel(date),
      sessions: 0,
      speakerIds: new Set<string>(),
    };
  });
};

const formatCompactNumber = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(value);
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let rafId: number;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCurrent(Math.round(value * progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value]);

  return <>{formatCompactNumber(current)}</>;
};

const StatTile = ({
  value,
  label,
  sub,
  onClick,
  loading,
}: {
  value: number;
  label: string;
  sub: string;
  onClick: () => void;
  loading?: boolean;
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <CardActionArea
      onClick={onClick}
      sx={{
        display: 'block',
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': { transform: 'translateY(-3px)' },
      }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          background: isDark ? '#120728' : '#ffffff',
          border: isDark ? '1px solid rgba(167,139,250,0.15)' : '1px solid rgba(109,40,217,0.12)',
          boxShadow: isDark ? '0 12px 32px rgba(0,0,0,0.18)' : '0 12px 32px rgba(109,40,217,0.08)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: isDark
              ? 'linear-gradient(90deg, #7c3aed, #a78bfa)'
              : 'linear-gradient(90deg, #4c1d95, #7c3aed)',
          }}
        />
        <CardContent sx={{ pt: 4, pb: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              fontSize: '2.4rem',
              lineHeight: 1,
              color: isDark ? '#ede9fe' : '#3c1361',
              mb: 0.75,
            }}
          >
            {loading ? '...' : <AnimatedNumber value={value} />}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: isDark ? '#a78bfa' : '#6d28d9',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              mb: 1,
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: isDark ? 'rgba(167,139,250,0.65)' : 'rgba(109,40,217,0.65)',
              fontSize: '0.78rem',
            }}
          >
            {sub}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        background: isDark ? '#1c0d38' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(167,139,250,0.2)' : 'rgba(109,40,217,0.15)'}`,
        borderRadius: 2,
        px: 2,
        py: 1.5,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <Typography sx={{ fontSize: '0.75rem', color: isDark ? '#a78bfa' : '#6d28d9', fontWeight: 600, mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((p: any) => (
        <Typography key={p.name} sx={{ fontSize: '0.8rem', color: isDark ? '#ede9fe' : '#2e1065' }}>
          {p.name === 'sessions' ? 'Sessions' : 'Intervenants'}: <strong>{p.value}</strong>
        </Typography>
      ))}
    </Box>
  );
};

const resourceStats = [
  { key: 'events', label: 'Événements', sub: 'total depuis le lancement', path: '/events' },
  { key: 'sessions', label: 'Sessions', sub: 'planifiées', path: '/sessions' },
  { key: 'speakers', label: 'Intervenants', sub: 'experts inscrits', path: '/speakers' },
  { key: 'rooms', label: 'Salles', sub: 'espaces réservés', path: '/rooms' },
];

export const Dashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const chartAccent = isDark ? '#a78bfa' : '#7c3aed';
  const chartSecondary = isDark ? '#7c3aed' : '#c4b1ff';
  const gridColor = isDark ? 'rgba(167,139,250,0.08)' : 'rgba(109,40,217,0.08)';
  const axisColor = isDark ? 'rgba(167,139,250,0.45)' : 'rgba(109,40,217,0.45)';

  const dataProvider = useDataProvider();
  const [stats, setStats] = useState(() =>
    resourceStats.map((resource) => ({ ...resource, value: 0 }))
  );
  const [sessionData, setSessionData] = useState(
    buildWeekData().map((entry) => ({ day: entry.day, sessions: 0, speakers: 0 }))
  );
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadStats = async () => {
      try {
        const [statsResponses, sessionsResponse] = await Promise.all([
          Promise.all(
            resourceStats.map((resource) =>
              dataProvider.getList(resource.key, {
                pagination: { page: 1, perPage: 1 },
                sort: { field: 'id', order: 'ASC' },
                filter: {},
              })
            )
          ),
          dataProvider.getList('sessions', {
            pagination: { page: 1, perPage: 10000 },
            sort: { field: 'start_time', order: 'ASC' },
            filter: {},
          }),
        ]);

        if (!mounted) return;

        setStats(
          statsResponses.map((response, index) => ({
            ...resourceStats[index],
            value: response.total ?? 0,
          }))
        );

        const sessions = Array.isArray(sessionsResponse.data) ? sessionsResponse.data : [];
        const weekData = buildWeekData();

        sessions.forEach((session: any) => {
          const rawDate = session.start_time || session.date || session.created_at;
          if (!rawDate) return;

          const date = new Date(rawDate);
          if (Number.isNaN(date.getTime())) return;

          const dateKey = date.toISOString().slice(0, 10);
          const dayEntry = weekData.find((entry) => entry.dateKey === dateKey);
          if (!dayEntry) return;

          dayEntry.sessions += 1;

          const speakers: Array<string | number> = Array.isArray(session.speaker_ids)
            ? session.speaker_ids
            : [];
          speakers.forEach((speakerId: string | number) => {
            dayEntry.speakerIds.add(String(speakerId));
          });
        });

        setSessionData(
          weekData.map((entry) => ({
            day: entry.day,
            sessions: entry.sessions,
            speakers: entry.speakerIds.size,
          }))
        );
      } catch (error) {
        console.error('Erreur de chargement des statistiques', error);
      } finally {
        if (mounted) setLoadingStats(false);
      }
    };

    loadStats();
    return () => {
      mounted = false;
    };
  }, [dataProvider]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', maxWidth: '100%', mx: 0 }}>
      <Title title="EventSync Admin" />

      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            color: isDark ? '#f8f7ff' : '#2e1065',
            letterSpacing: '-0.02em',
            mb: 1,
          }}
        >
          Tableau de bord
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: isDark ? 'rgba(237,233,254,0.85)' : 'rgba(46,16,101,0.72)', maxWidth: 760 }}
        >
          Vos statistiques principales sont affichées ici. Cliquez sur une carte pour accéder directement aux pages Événements, Sessions, Intervenants et Salles.
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <StatTile value={stat.value} label={stat.label} sub={stat.sub} onClick={() => navigate(stat.path)} loading={loadingStats} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            sx={{
              minHeight: 460,
              border: isDark ? '1px solid rgba(167,139,250,0.12)' : '1px solid rgba(109,40,217,0.12)',
              boxShadow: isDark ? '0 18px 44px rgba(0,0,0,0.16)' : '0 18px 44px rgba(109,40,217,0.08)',
              background: isDark ? '#120728' : '#ffffff',
            }}
          >
            <CardContent sx={{ pb: 3, px: { xs: 2, md: 4 }, pt: 3 }}>
              <Box mb={3} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2}>
                <Box>
                  <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: isDark ? '#f8f7ff' : '#2e1065' }}>
                    Activité de la semaine
                  </Typography>
                  <Typography variant="body2" sx={{ color: isDark ? 'rgba(167,139,250,0.7)' : 'rgba(109,40,217,0.55)' }}>
                    Graphique des sessions et intervenants planifiés sur les 7 derniers jours.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <ResponsiveContainer width="100%" height={360}>
                  <AreaChart data={sessionData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartAccent} stopOpacity={0.28} />
                        <stop offset="95%" stopColor={chartAccent} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="speakersGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartSecondary} stopOpacity={0.24} />
                        <stop offset="95%" stopColor={chartSecondary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: axisColor, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: axisColor, fontFamily: 'Inter' }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: chartAccent, strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Area type="monotone" dataKey="sessions" stroke={chartAccent} strokeWidth={2} fill="url(#sessionsGrad)" dot={false} activeDot={{ r: 5, fill: chartAccent, strokeWidth: 0 }} />
                    <Area type="monotone" dataKey="speakers" stroke={chartSecondary} strokeWidth={2} fill="url(#speakersGrad)" dot={false} activeDot={{ r: 5, fill: chartSecondary, strokeWidth: 0 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>

              <Box display="flex" gap={3} mt={2} flexWrap="wrap">
                {[
                  { color: chartAccent, label: 'Sessions' },
                  { color: chartSecondary, label: 'Intervenants' },
                ].map((legend) => (
                  <Box key={legend.label} display="flex" alignItems="center" gap={0.75}>
                    <Box sx={{ width: 24, height: 2, borderRadius: 1, bgcolor: legend.color }} />
                    <Typography sx={{ fontSize: '0.75rem', color: isDark ? 'rgba(167,139,250,0.65)' : 'rgba(109,40,217,0.6)', fontFamily: 'Inter' }}>
                      {legend.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
