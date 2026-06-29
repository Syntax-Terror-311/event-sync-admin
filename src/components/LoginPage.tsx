import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLogin, useNotify } from 'react-admin';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(0);

  const login = useLogin();
  const notify = useNotify();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

  const accent = isDark ? '#a78bfa' : '#7c3aed';

  const inputAutoFillStyles = {
    '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
      WebkitBoxShadow: `0 0 0 1000px ${isDark ? '#120728' : '#ffffff'} inset`,
      WebkitTextFillColor: isDark ? '#ede9fe' : '#2e1065',
      caretColor: accent,
    },
    '& input:-moz-autofill, & input:-moz-autofill:hover, & input:-moz-autofill:focus': {
      boxShadow: `0 0 0 1000px ${isDark ? '#120728' : '#ffffff'} inset`,
      color: isDark ? '#ede9fe' : '#2e1065',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ username, password });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      notify(message, { type: 'warning' });
      setShake((s) => s + 1);
      setLoading(false);
    }
  };

  const canSubmit = !loading && Boolean(username) && Boolean(password);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #0f0520 0%, #1c0d38 50%, #120728 100%)'
          : 'linear-gradient(135deg, #f5f0ff 0%, #ede9fe 50%, #faf5ff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Orbs */}
      <MotionBox
        animate={{ y: [0, 24, 0], x: [0, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
        }}
      />
      <MotionBox
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)',
        }}
      />

      <Container maxWidth="md">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ position: 'relative', zIndex: 10 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              minHeight: '80vh',
              py: { xs: 3, md: 6 },
            }}
          >
            <MotionBox
              variants={itemVariants}
              sx={{
                flex: { xs: '1 1 auto', md: '0 0 42%' },
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                px: { xs: 0, md: 2 },
                py: { xs: 2, md: 3 },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="EventSync logo"
                sx={{
                  width: '100%',
                  maxWidth: 220,
                  height: 'auto',
                  mb: 3,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: isMobile ? '1.75rem' : '2.6rem',
                  background: isDark
                    ? 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)'
                    : 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Bienvenue sur EventSync
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', mb: 2, maxWidth: 420 }}>
                Gérez vos événements, sessions et intervenants depuis une interface moderne et professionnelle.
              </Typography>
            </MotionBox>

            <MotionBox
              variants={itemVariants}
              sx={{
                flex: { xs: '1 1 auto', md: '0 0 50%' },
                width: '100%',
              }}
            >
              <MotionCard
                key={`card-${shake}`}
                animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : undefined}
                transition={{ duration: 0.45 }}
                sx={{
                  borderRadius: 3,
                  boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.1)',
                  border: `1px solid ${isDark ? 'rgba(167,139,250,0.1)' : 'rgba(109,40,217,0.1)'}`,
                  background: isDark ? 'linear-gradient(135deg, #1c0d38 0%, #120728 100%)' : '#ffffff',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Box sx={{ p: isMobile ? 3 : 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Connexion à EventSync
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Entrez vos identifiants pour accéder à votre espace d'administration.
                    </Typography>
                  </Box>
                  <form onSubmit={handleSubmit} noValidate>
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Alert severity="error" variant="filled" sx={{ borderRadius: 1.5 }}>
                            {error}
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <TextField
                      fullWidth
                      name="username"
                      autoComplete="username"
                      autoFocus
                      label="Adresse email"
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      placeholder="admin@example.com"
                      sx={{
                        mb: 2.5,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                          fontSize: '0.95rem',
                          '& fieldset': { borderColor: isDark ? 'rgba(167,139,250,0.2)' : 'rgba(109,40,217,0.2)', borderWidth: '1.5px' },
                          '&:hover fieldset': { borderColor: isDark ? 'rgba(167,139,250,0.4)' : 'rgba(109,40,217,0.4)' },
                          '&.Mui-focused fieldset': { borderColor: accent, borderWidth: '2px' },
                          ...inputAutoFillStyles,
                        },
                        '& .MuiInputLabel-root': {
                          color: isDark ? 'rgba(167,139,250,0.6)' : 'rgba(109,40,217,0.5)',
                          fontWeight: 500,
                          '&.Mui-focused': { color: accent },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      name="password"
                      autoComplete="current-password"
                      label="Mot de passe"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      placeholder="Entrez votre mot de passe"
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                          fontSize: '0.95rem',
                          '& fieldset': { borderColor: isDark ? 'rgba(167,139,250,0.2)' : 'rgba(109,40,217,0.2)', borderWidth: '1.5px' },
                          '&:hover fieldset': { borderColor: isDark ? 'rgba(167,139,250,0.4)' : 'rgba(109,40,217,0.4)' },
                          '&.Mui-focused fieldset': { borderColor: accent, borderWidth: '2px' },
                          ...inputAutoFillStyles,
                        },
                        '& .MuiInputLabel-root': {
                          color: isDark ? 'rgba(167,139,250,0.6)' : 'rgba(109,40,217,0.5)',
                          fontWeight: 500,
                          '&.Mui-focused': { color: accent },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((p) => !p)}
                              edge="end"
                              disabled={loading}
                              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                              sx={{
                                color: isDark ? 'rgba(167,139,250,0.5)' : 'rgba(109,40,217,0.4)',
                                '&:hover': { color: accent },
                              }}
                            >
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={showPassword ? 'visible' : 'hidden'}
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </motion.span>
                              </AnimatePresence>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <MotionButton
                      fullWidth
                      type="submit"
                      disabled={!canSubmit}
                      whileHover={canSubmit ? { scale: 1.01 } : undefined}
                      whileTap={canSubmit ? { scale: 0.985 } : undefined}
                      sx={{
                        py: 1.6,
                        mb: 2,
                        background: isDark
                          ? 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'
                          : 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        letterSpacing: '0.02em',
                        textTransform: 'none',
                        borderRadius: 1.5,
                        boxShadow: isDark ? '0 4px 15px rgba(124,58,237,0.3)' : '0 4px 15px rgba(76,29,149,0.2)',
                        '&:disabled': {
                          background: isDark
                            ? 'linear-gradient(135deg, rgba(124,58,237,0.24) 0%, rgba(167,139,250,0.22) 100%)'
                            : 'linear-gradient(135deg, rgba(76,29,149,0.2) 0%, rgba(124,58,237,0.18) 100%)',
                          color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.82)',
                        },
                        '&:hover:not(:disabled)': {
                          boxShadow: isDark ? '0 8px 25px rgba(124,58,237,0.4)' : '0 8px 25px rgba(76,29,149,0.3)',
                        },
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                          >
                            <CircularProgress size={20} sx={{ color: 'inherit' }} />
                            Connexion en cours...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
                          >
                            Se connecter
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </MotionButton>

                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'center',
                        color: isDark ? 'rgba(167,139,250,0.5)' : 'rgba(109,40,217,0.4)',
                      }}
                    >
                      © 2026 EventSync. Tous droits réservés.
                    </Typography>
                  </form>
                </Box>
              </MotionCard>
            </MotionBox>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};