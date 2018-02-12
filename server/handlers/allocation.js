const ErrorHandler = require('../lib/error');
const AllocationLib = require('../lib/allocation');

module.exports = ({ models }) => {

  const Sensor = models.sensor;
  const Workout = models.workout;

  const createAllocations = (req, res) => {
    const { workout_id, participants } = req.body;
    
    return Sensor.findSensorForParticipants(participants)
      .then((sensors) => {
        const allocations = AllocationLib.match(participants, sensors);

        return Workout.createAllocations(allocations)
          .then(() => res.send({ allocations }));
      })
      .catch(ErrorHandler.onError(res));
  };

  return {
    createAllocations
  };
}