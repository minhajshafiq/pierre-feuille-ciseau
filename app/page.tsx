"use client"
import {useState} from 'react';
import {FaHandRock, FaHandPaper, FaHandScissors, FaRedo, FaRobot, FaUser} from 'react-icons/fa';
import {motion, AnimatePresence} from 'motion/react';

export default function PierreFeuilleCiseaux() {
    const [playerName, setPlayerName] = useState("");
    const [playerChoice, setPlayerChoice] = useState<string | null>(null);
    const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
    const [result, setResult] = useState("");
    const [isNameSet, setIsNameSet] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [winningIcon, setWinningIcon] = useState<string | null>(null);
    const [winner, setWinner] = useState<"player" | "robot" | "tie" | null>(null);
    const [showBounce, setShowBounce] = useState(false);

    const setName = () => {
        if (playerName.trim() !== "") {
            setIsNameSet(true);
        }
    };

    const resetScores = () => {
        setPlayerScore(0);
        setOpponentScore(0);
        setWinningIcon(null);
        setWinner(null);
    };

    const getIcon = (choice: string, size = 32) => {
        switch (choice) {
            case "Pierre":
                return <FaHandRock size={size}/>;
            case "Feuille":
                return <FaHandPaper size={size}/>;
            case "Ciseaux":
                return <FaHandScissors size={size}/>;
            default:
                return null;
        }
    };

    const play = (choice: string) => {
        setShowBounce(true);
        setPlayerChoice(choice);
        setWinningIcon(null);
        setWinner(null);
        setResult("");

        const options = ["Pierre", "Feuille", "Ciseaux"];
        const botChoice = options[Math.floor(Math.random() * options.length)];
        setOpponentChoice(botChoice);

        let gameResult = "";
        if (choice === botChoice) {
            gameResult = "Égalité";
            setTimeout(() => {
                setWinningIcon("egalite");
                setWinner("tie");
                setTimeout(() => setResult(gameResult), 500);
            }, 1500);
        } else if (
            (choice === "Pierre" && botChoice === "Ciseaux") ||
            (choice === "Feuille" && botChoice === "Pierre") ||
            (choice === "Ciseaux" && botChoice === "Feuille")
        ) {
            gameResult = "Vous avez gagné !!";
            setTimeout(() => {
                setWinningIcon(choice);
                setWinner("player");
                setPlayerScore(prevScore => prevScore + 1);
                setTimeout(() => setResult(gameResult), 500);
            }, 1500);
        } else {
            gameResult = "Vous avez perdu !!";
            setTimeout(() => {
                setWinningIcon(botChoice);
                setWinner("robot");
                setOpponentScore(prevScore => prevScore + 1);
                setTimeout(() => setResult(gameResult), 500);
            }, 1500);
        }

        setTimeout(() => setShowBounce(false), 2000);
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-500 to-purple-600 overflow-hidden sm:h-full">
        <AnimatePresence mode="wait">
                {!isNameSet ? (
                    <motion.div
                        key="login"
                        className="p-8 flex flex-col items-center bg-white text-black rounded-lg shadow-lg max-w-md w-full"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.5}}
                    >
                        <motion.h1
                            className="text-4xl mb-6 font-bold text-center"
                            initial={{scale: 0.8}}
                            animate={{scale: 1}}
                            transition={{duration: 0.5}}
                        >
                            Pierre, Feuille, Ciseaux
                        </motion.h1>
                        <motion.input
                            type="text"
                            placeholder="Entre ton pseudo"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="border p-2 mb-4 w-64 text-center rounded"
                            whileFocus={{scale: 1.05}}
                            transition={{duration: 0.2}}
                        />
                        <motion.button
                            onClick={setName}
                            className="bg-blue-500 text-white p-2 rounded w-64"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            Valider
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="game"
                        className="p-8 flex flex-col items-center bg-white text-black rounded-lg shadow-lg max-w-md w-full"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.5}}
                    >
                        <motion.h1
                            className="text-4xl mb-6 font-bold text-center"
                            initial={{scale: 0.8}}
                            animate={{scale: 1}}
                            transition={{duration: 0.5}}
                        >
                            Game : VS IA
                        </motion.h1>

                        <motion.div
                            className="mb-6 flex gap-6 justify-center"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.3, staggerChildren: 0.1}}
                        >
                            <motion.button
                                onClick={() => play("Pierre")}
                                className="bg-purple-500 text-white p-4 rounded-full"
                                whileHover={{scale: 1.1, rotate: 5}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaHandRock size={32}/>
                            </motion.button>
                            <motion.button
                                onClick={() => play("Feuille")}
                                className="bg-purple-500 text-white p-4 rounded-full"
                                whileHover={{scale: 1.1, rotate: -5}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaHandPaper size={32}/>
                            </motion.button>
                            <motion.button
                                onClick={() => play("Ciseaux")}
                                className="bg-purple-500 text-white p-4 rounded-full"
                                whileHover={{scale: 1.1, rotate: 5}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaHandScissors size={32}/>
                            </motion.button>
                        </motion.div>

                        <motion.div className="relative h-32 w-full mb-6">
                            {playerChoice && opponentChoice && (
                                <>
                                    {/* Animation Joueur */}
                                    <motion.div
                                        className="absolute left-1/4 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full"
                                        initial={{y: -50, scale: 0.8}}
                                        animate={showBounce ?
                                            {
                                                y: [-20, 0, -15, 0, -10, 0],
                                                scale: [0.8, 1.2, 1],
                                                transition: {duration: 1.5}
                                            } : {y: 0, scale: 1}
                                        }
                                    >
                                        <AnimatePresence mode="wait">
                                            {showBounce ? (
                                                <motion.div
                                                    key="question"
                                                    initial={{opacity: 1, rotate: 0}}
                                                    animate={{rotate: [0, 10, -10, 0]}}
                                                    exit={{opacity: 0, scale: 0}}
                                                    transition={{duration: 0.1}}
                                                    className="text-2xl font-bold"
                                                >
                                                    ?
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="choice"
                                                    initial={{opacity: 0, scale: 0.5}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    transition={{duration: 0.3}}
                                                >
                                                    {getIcon(playerChoice)}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Animation Robot */}
                                    <motion.div
                                        className="absolute left-3/4 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded-full"
                                        initial={{y: -50, scale: 0.8}}
                                        animate={showBounce ?
                                            {
                                                y: [-20, 0, -15, 0, -10, 0],
                                                scale: [0.8, 1.2, 1],
                                                rotate: [0, 5, -5, 0],
                                                transition: {duration: 1.5}
                                            } : {y: 0, scale: 1, rotate: 0}
                                        }
                                    >
                                        <AnimatePresence mode="wait">
                                            {showBounce ? (
                                                <motion.div
                                                    key="question"
                                                    initial={{opacity: 1, rotate: 0}}
                                                    animate={{rotate: [0, -10, 10, 0]}}
                                                    exit={{opacity: 0, scale: 0}}
                                                    transition={{duration: 0.1}}
                                                    className="text-2xl font-bold"
                                                >
                                                    ?
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="choice"
                                                    initial={{opacity: 0, scale: 0.5}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    transition={{duration: 0.3}}
                                                >
                                                    {getIcon(opponentChoice)}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Animation Gagnant */}
                                    <AnimatePresence>
                                        {winningIcon && winningIcon !== "egalite" && (
                                            <motion.div
                                                className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-green-500 text-white p-4 rounded-full z-10"
                                                initial={{y: -50, opacity: 0}}
                                                animate={{y: 100, opacity: 1}}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 5,
                                                    duration: 1
                                                }}
                                            >
                                                {getIcon(winningIcon, 40)}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Animation character */}
                                    <AnimatePresence>
                                        {winner && (
                                            <motion.div
                                                className={`absolute ${winner === "player" ? "left-1/4" : winner === "robot" ? "left-3/4" : "left-1/2"} transform -translate-x-1/2 -top-10`}
                                                initial={{scale: 0, opacity: 0}}
                                                animate={{scale: 1, opacity: 1}}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20,
                                                    delay: winner !== "tie" ? 0.8 : 0.6
                                                }}
                                            >
                                                <div className={`p-2 rounded-full ${
                                                    winner === "player" ? "bg-blue-600" :
                                                        winner === "robot" ? "bg-red-600" :
                                                            "bg-yellow-600"
                                                } text-white`}>
                                                    {winner === "player" ? (
                                                        <FaUser size={24}/>
                                                    ) : winner === "robot" ? (
                                                        <FaRobot size={24}/>
                                                    ) : (
                                                        <motion.div
                                                            animate={{rotateY: [0, 180, 0]}}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                ease: "easeInOut"
                                                            }}
                                                            className="flex"
                                                        >
                                                            <FaUser size={24} className="mr-1"/>
                                                            <FaRobot size={24}/>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            )}
                        </motion.div>

                        <motion.div
                            className="mt-4 text-center w-full space-y-6"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.5}}
                        >
                            <div className="relative h-[60px]">
                                <AnimatePresence mode="wait">
                                    {result ? (
                                        <motion.div
                                            key={result}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut"
                                            }}
                                            className={`
                                                absolute w-full p-4 rounded-lg shadow-lg font-bold text-lg
                                                ${result.includes("gagné") ? "bg-green-100 text-green-800" :
                                                result.includes("perdu") ? "bg-red-100 text-red-800" :
                                                    "bg-yellow-100 text-yellow-800"}
                `}
                                        >
                                            {result}
                                        </motion.div>
                                    ) : (
                                        <div className="h-[60px]"></div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.div
                                className="flex justify-center items-center gap-8 p-4 bg-gray-100 rounded-lg"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 0.3}}
                            >
                                <div className="text-center">
                                    <div className="text-blue-600 font-bold">{playerName || "Vous"}</div>
                                    <motion.div
                                        key={playerScore}
                                        initial={{scale: 1.5}}
                                        animate={{scale: 1}}
                                        className="text-3xl font-bold"
                                    >
                                        {playerScore}
                                    </motion.div>
                                </div>

                                <div className="text-xl font-bold text-gray-400">VS</div>

                                <div className="text-center">
                                    <div className="text-red-600 font-bold">Robot</div>
                                    <motion.div
                                        key={opponentScore}
                                        initial={{scale: 1.5}}
                                        animate={{scale: 1}}
                                        className="text-3xl font-bold"
                                    >
                                        {opponentScore}
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.button
                                onClick={resetScores}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 mx-auto transition-colors"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <FaRedo className="animate-spin-slow"/>
                                Réinitialiser les scores
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}