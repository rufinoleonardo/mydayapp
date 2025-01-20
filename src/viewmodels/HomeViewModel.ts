/**
  export const useHomeViewModel = () => {
  const [workouts, setWorkouts] = useState([]);

  const loadWorkouts = async () => {
    try {
      const data = await fetchWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    workouts,
    loadWorkouts,
  };
};
 */
