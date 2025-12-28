import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaRedo } from 'react-icons/fa';
import { Section, SectionTitle } from '../components/common/Layout';
import SEO from '../components/common/SEO';
import Confetti from 'react-confetti';

const GameContainer = styled.div`
  height: calc(100vh - 70px); // Full viewport minus navbar height
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: radial-gradient(circle at center, #1a1a2e 0%, #000 100%);
  overflow: hidden;
  position: relative;
  cursor: crosshair;
  padding: 10px;
  margin-top: 70px; // Push content below navbar
`;

// Override SectionTitle for this page specifically to reduce margin
const GameTitle = styled(SectionTitle)`
  margin-bottom: 10px; // Reduce gap
  font-size: 2rem; // Slightly smaller title
  flex-shrink: 0; // Prevent title from shrinking
`;

const GameArea = styled.div`
  width: 100%;
  flex: 1; // Take up remaining vertical space
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px var(--primary-color);
  margin: 0 auto 80px auto; // Add substantial bottom margin to pull it up
  min-height: 300px;
`;

const Player = styled.div`
  position: absolute;
  bottom: 20px;
  width: 40px;
  height: 40px;
  color: var(--primary-color);
  font-size: 2rem;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Projectile = styled.div`
  position: absolute;
  width: 4px;
  height: 15px;
  background-color: var(--accent-color);
  box-shadow: 0 0 5px var(--accent-color);
  transform: translateX(-2px);
`;

const Enemy = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: white;
  font-weight: bold;
  transform: translate(-50%, -50%);
`;

const ScoreBoard = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  z-index: 15;
`;

const GameOverScreen = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  backdrop-filter: blur(5px);
`;

const RestartButton = styled.button`
  background: var(--primary-color);
  color: var(--dark-text);
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 50px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background: var(--accent-color);
    color: white;
  }
`;

const techStack = [
    { name: 'JS', color: '#f7df1e' },
    { name: 'Py', color: '#3776ab' },
    { name: 'React', color: '#61dbfb' },
    { name: 'AI', color: '#ff6b6b' },
];

const RetroGame = () => {
    const [playerX, setPlayerX] = useState(400);
    const [projectiles, setProjectiles] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const gameAreaRef = useRef(null);
    const lastShotTime = useRef(0);
    const frameCount = useRef(0);

    const startGame = useCallback(() => {
        setScore(0);
        setEnemies([]);
        setProjectiles([]);
        setGameOver(false);
        setGameStarted(true);
        frameCount.current = 0;
        if (gameAreaRef.current) {
            setPlayerX(gameAreaRef.current.offsetWidth / 2);
        }
    }, []);

    const enemiesRef = useRef([]);
    const projectilesRef = useRef([]);
    const processedCollisions = useRef(new Set());

    // Keep refs in sync with state
    useEffect(() => {
        enemiesRef.current = enemies;
    }, [enemies]);

    useEffect(() => {
        projectilesRef.current = projectiles;
    }, [projectiles]);

    // Lock scroll on MOUNT, unlock on UNMOUNT
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Game Loop
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        // Difficulty params
        const baseSpeed = 2;
        const speedMultiplier = 1 + Math.floor(score / 50) * 0.2; // Increase speed every 50 points
        const currentSpeed = baseSpeed * speedMultiplier;

        // Spawn rate: 60 frames = ~1s. Decrease spawn interval as score increases.
        // Cap at 20 frames (very fast)
        const baseSpawnRate = 60;
        const spawnRateDecrease = Math.floor(score / 100) * 5;
        const currentSpawnRate = Math.max(20, baseSpawnRate - spawnRateDecrease);

        const interval = setInterval(() => {
            frameCount.current++;

            // Spawn enemies
            if (frameCount.current % currentSpawnRate === 0) {
                const type = techStack[Math.floor(Math.random() * techStack.length)];
                const gameWidth = gameAreaRef.current?.offsetWidth || 800;
                setEnemies(prev => [
                    ...prev,
                    {
                        id: Date.now() + Math.random(),
                        x: Math.random() * (gameWidth - 80) + 40,
                        y: 0,
                        ...type
                    }
                ]);
            }

            // Move enemies down
            const gameHeight = gameAreaRef.current?.offsetHeight || 600;
            setEnemies(prev => {
                const updated = prev.map(e => ({ ...e, y: e.y + currentSpeed }));

                // Game over when enemy reaches 90% of actual game height
                if (updated.some(e => e.y > gameHeight * 0.9)) {
                    setGameOver(true);
                    setGameStarted(false);
                }

                return updated.filter(e => e.y < gameHeight);
            });

            // Move projectiles up
            setProjectiles(prev =>
                prev.map(p => ({ ...p, bottom: p.bottom + 8 })).filter(p => p.bottom < gameHeight)
            );

            // Check collisions using current ref values
            const currentEnemies = enemiesRef.current;
            const currentProjectiles = projectilesRef.current;

            const hitEnemyIds = new Set();
            const hitProjectileIds = new Set();

            currentProjectiles.forEach(proj => {
                if (hitProjectileIds.has(proj.id)) return;

                currentEnemies.forEach(enemy => {
                    if (hitEnemyIds.has(enemy.id)) return;

                    const collisionKey = `${proj.id}-${enemy.id}`;
                    if (processedCollisions.current.has(collisionKey)) return;

                    // More precise collision detection using actual game dimensions
                    // Enemy is 40x40px, projectile is 4x15px
                    const dx = Math.abs(proj.left - enemy.x);
                    const dy = Math.abs((gameHeight - proj.bottom) - enemy.y);

                    // Collision if projectile is within 20px of enemy center
                    if (dx < 20 && dy < 20) {
                        hitEnemyIds.add(enemy.id);
                        hitProjectileIds.add(proj.id);
                        processedCollisions.current.add(collisionKey);
                    }
                });
            });
            // Remove hit enemies and projectiles
            if (hitEnemyIds.size > 0) {
                setEnemies(prev => prev.filter(e => !hitEnemyIds.has(e.id)));
                setProjectiles(prev => prev.filter(p => !hitProjectileIds.has(p.id)));
                setScore(s => s + (hitEnemyIds.size * 10));
            }

            if (frameCount.current % 120 === 0) {
                processedCollisions.current.clear();
            }

        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [gameStarted, gameOver, score]); // Re-run effect when score changes to update difficulty params

    // Mouse controls
    useEffect(() => {
        if (!gameAreaRef.current) return;

        const handleMouseMove = (e) => {
            const rect = gameAreaRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            if (x >= 20 && x <= rect.width - 20) {
                setPlayerX(x);
            }
        };

        const handleClick = () => {
            if (!gameStarted || gameOver) return;

            const now = Date.now();
            if (now - lastShotTime.current < 150) return; // Rate limit
            lastShotTime.current = now;

            setProjectiles(prev => [...prev, {
                id: now,
                left: playerX,
                bottom: 60
            }]);
        };

        const gameArea = gameAreaRef.current;
        gameArea.addEventListener('mousemove', handleMouseMove);
        gameArea.addEventListener('click', handleClick);

        return () => {
            gameArea.removeEventListener('mousemove', handleMouseMove);
            gameArea.removeEventListener('click', handleClick);
        };
    }, [gameStarted, gameOver, playerX]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!gameStarted && !gameOver) {
                    startGame();
                } else if (gameStarted && !gameOver) {
                    // Shoot
                    const now = Date.now();
                    if (now - lastShotTime.current >= 150) {
                        lastShotTime.current = now;
                        setProjectiles(prev => [...prev, {
                            id: now,
                            left: playerX,
                            bottom: 60
                        }]);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted, gameOver, playerX, startGame]);

    return (
        <GameContainer id="retro-game">
            <SEO title="Retro Space Invaders" description="A hidden retro space shooter game!" />
            <GameTitle>Retro Defender</GameTitle>
            <GameArea ref={gameAreaRef}>
                {gameStarted && !gameOver && (
                    <>
                        <ScoreBoard>Score: {score}</ScoreBoard>

                        <Player style={{ left: `${playerX}px` }}>
                            <FaRocket />
                        </Player>

                        {projectiles.map(p => (
                            <Projectile
                                key={p.id}
                                style={{
                                    left: `${p.left}px`,
                                    bottom: `${p.bottom}px`
                                }}
                            />
                        ))}

                        {enemies.map(e => (
                            <Enemy
                                key={e.id}
                                style={{
                                    left: `${e.x}px`,
                                    top: `${e.y}px`,
                                    backgroundColor: e.color,
                                    boxShadow: `0 0 10px ${e.color}`
                                }}
                            >
                                {e.name}
                            </Enemy>
                        ))}
                    </>
                )}

                <AnimatePresence>
                    {(!gameStarted || gameOver) && (
                        <GameOverScreen
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 style={{ fontSize: '3rem', color: gameOver ? '#ff6b6b' : '#61dbfb', marginBottom: 20 }}>
                                {gameOver ? "GAME OVER" : "Ready Player One?"}
                            </h2>
                            {gameOver && <h3 style={{ marginTop: 0, marginBottom: 10 }}>Final Score: {score}</h3>}
                            <p style={{ marginBottom: 20, opacity: 0.8 }}>
                                {gameOver ? "Click to restart" : "Move mouse to control • Click or Space to shoot"}
                            </p>
                            <RestartButton onClick={startGame}>
                                {gameOver ? <><FaRedo /> Try Again</> : <><FaRocket /> Start Mission</>}
                            </RestartButton>
                        </GameOverScreen>
                    )}
                </AnimatePresence>
            </GameArea>

            {gameOver && score > 50 && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={300}
                />
            )}
        </GameContainer>
    );
};

export default RetroGame;
