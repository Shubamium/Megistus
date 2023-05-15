import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getTime } from "../Game";

function getTimer(mode, countUp, countDown) {
  let timerElement = null;
  let animation = {
    initial: { opacity: 0, translateY: '-10vh' },
    animate: { translateY: '0vh' },
    whileInView: { opacity: 1 }
  };
  if (mode === 'timed') {
    timerElement = <motion.p {...animation}>꧁𓊈𒆜{getTime && getTime(countUp.elapsed)}𒆜𓊉꧂</motion.p>;
  } else if (mode === 'attack') {
    timerElement = <motion.p {...animation}>꧁𓊈𒆜{getTime && getTime(countDown.elapsed)}𒆜𓊉꧂</motion.p>;
  }
  return timerElement;
}
export function Timer({ countUp, countDown, mode }) {
  const [sideTime, setSideTime] = useState(false);
  let timerElement = getTimer(mode, countUp, countDown);

  let sideTimer = (
    <motion.div initial={{ opacity: 0, bottom: '-5vh' }} animate={{ opacity: 1, bottom: '5vh' }} exit={{ opacity: 0, bottom: '-5vh' }} className="side-timer">
      {timerElement}
    </motion.div>
  );

  function handleScroll(e) {
    if (window.scrollY > 100) {
      setSideTime(true);
    } else {
      setSideTime(false);
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div className="timer">
    {timerElement}
    <AnimatePresence>
      {sideTime && sideTimer}
    </AnimatePresence>
  </div>;
}
