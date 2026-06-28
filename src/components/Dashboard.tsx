import { Card, CardContent, Typography, Box, Grid, useTheme } from '@mui/material';
import { Title } from 'react-admin';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const sessionData = [
  { day: 'Lun', sessions: 2, speakers: 1 },
  { day: 'Mar', sessions: 4, speakers: 3 },
  { day: 'Mer', sessions: 3, speakers: 2 },
  { day: 'Jeu', sessions: 7, speakers: 5 },
  { day: 'Ven', sessions: 6, speakers: 4 },
  { day: 'Sam', sessions: 5, speakers: 3 },
  { day: 'Dim', sessions: 8, speakers: 6 },
];

const StatTile = ({
  value,
  label,
  sub,
}: {
  value: string | number;
  label: string;
  sub?: string;
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDark
            ? '0 8px 32px rgba(124,58,237,0.25)'
            : '0 8px 32px rgba(109,40,217,0.15)',
        },
      }}
    >
      {/* Accent bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: isDark
            ? 'linear-gradient(90deg, #7c3aed, #a78bfa)'
            : 'linear-gradient(90deg, #4c1d95, #7c3aed)',
        }}
      />
      <CardContent sx={{ pt: 3, pb: 2.5 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            fontSize: '2.4rem',
            lineHeight: 1,
            color: isDark ? '#c4b5fd' : '#4c1d95',
            mb: 0.5,
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: isDark ? '#ede9fe' : '#2e1065',
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        {sub && (
          <Typography
            variant="caption"
            sx={{ color: isDark ? 'rgba(167,139,250,0.6)' : 'rgba(109,40,217,0.5)', fontSize: '0.72rem' }}
          >
            {sub}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        background: isDark ? '#1c0d38' : '#fff',
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

export const Dashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const chartAccent = isDark ? '#a78bfa' : '#7c3aed';
  const chartSecondary = isDark ? '#7c3aed' : '#c4b5fd';
  const gridColor = isDark ? 'rgba(167,139,250,0.08)' : 'rgba(109,40,217,0.08)';
  const axisColor = isDark ? 'rgba(167,139,250,0.4)' : 'rgba(109,40,217,0.4)';

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
        '@import': "url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap')",
      }}
    >
      <Title title="EventSync Admin" />

      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700,
            color: isDark ? '#ede9fe' : '#2e1065',
            letterSpacing: '-0.02em',
            mb: 0.5,
          }}
        >
          Tableau de bord
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isDark ? 'rgba(167,139,250,0.6)' : 'rgba(109,40,217,0.55)', fontSize: '0.875rem' }}
        >
          Vue d'ensemble de vos événements et sessions.
        </Typography>
      </Box>

      {/* Stat tiles */}
      <Grid container spacing={2.5} mb={4}>
        {[
          { value: '—', label: 'Événements', sub: 'au total' },
          { value: '—', label: 'Sessions', sub: 'programmées' },
          { value: '—', label: 'Intervenants', sub: 'enregistrés' },
          { value: '—', label: 'Salles', sub: 'disponibles' },
        ].map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <StatTile {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ pb: '24px !important' }}>
          <Box mb={3}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Sora", sans-serif',
                fontWeight: 600,
                color: isDark ? '#ede9fe' : '#2e1065',
                fontSize: '0.95rem',
              }}
            >
              Activité de la semaine
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: isDark ? 'rgba(167,139,250,0.5)' : 'rgba(109,40,217,0.45)', fontSize: '0.75rem' }}
            >
              Sessions et intervenants planifiés par jour
            </Typography>
          </Box>

          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={sessionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartAccent} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartAccent} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="speakersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartSecondary} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={chartSecondary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: axisColor, fontFamily: 'Inter' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: axisColor, fontFamily: 'Inter' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: chartAccent, strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke={chartAccent}
                strokeWidth={2}
                fill="url(#sessionsGrad)"
                dot={false}
                activeDot={{ r: 4, fill: chartAccent, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="speakers"
                stroke={chartSecondary}
                strokeWidth={2}
                fill="url(#speakersGrad)"
                dot={false}
                activeDot={{ r: 4, fill: chartSecondary, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Legend */}
          <Box display="flex" gap={3} mt={1.5} pl={0.5}>
            {[
              { color: chartAccent, label: 'Sessions' },
              { color: chartSecondary, label: 'Intervenants' },
            ].map((leg) => (
              <Box key={leg.label} display="flex" alignItems="center" gap={0.75}>
                <Box sx={{ width: 20, height: 2, borderRadius: 1, bgcolor: leg.color }} />
                <Typography sx={{ fontSize: '0.72rem', color: isDark ? 'rgba(167,139,250,0.6)' : 'rgba(109,40,217,0.5)', fontFamily: 'Inter' }}>
                  {leg.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Quick links */}
      <Card>
        <CardContent>
          <Typography
            variant="overline"
            sx={{
              fontSize: '0.68rem',
              color: isDark ? 'rgba(167,139,250,0.5)' : 'rgba(109,40,217,0.45)',
              letterSpacing: '0.08em',
              display: 'block',
              mb: 1.5,
            }}
          >
            Accès rapide
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.75}>
            {[
              { label: 'Frontend public', href: 'http://localhost:3000' },
              { label: 'API Backend — Health check', href: 'http://localhost:4000/health' },
            ].map((link) => (
              <Box key={link.href} display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: isDark ? '#a78bfa' : '#7c3aed',
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ fontSize: '0.82rem', color: isDark ? 'rgba(237,233,254,0.7)' : 'rgba(46,16,101,0.65)' }}>
                  {link.label}
                  {' — '}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: isDark ? '#a78bfa' : '#6d28d9',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    {link.href}
                  </a>
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
