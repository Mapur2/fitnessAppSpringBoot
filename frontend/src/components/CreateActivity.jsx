import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ACTIVITY_TYPES = [
  'RUNNING',
  'WALKING',
  'CYCLING',
  'WEIGHT_TRAINING',
  'YOGA',
  'HIIT',
  'CARDIO',
  'STRETCHING',
  'OTHER',
];

export default function CreateActivity() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [distance, setDistance] = useState('');
  const [averageSpeed, setAverageSpeed] = useState('');
  const [maxHeartRate, setMaxHeartRate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // activities state
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  // recommendation state
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [loadingRec, setLoadingRec] = useState(false);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId') || '4e06918e-37fc-4f8f-81fa-c11c27c97887';
  useEffect(() => {
    if (!token || !userId) {
      navigate('/');
    }
  }, []);

  // fetch all activities
  const fetchActivities = async () => {
    try {
      setLoadingActivities(true);
      const res = await fetch(`http://localhost:8079/api/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch activities');
      setActivities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // submit new activity
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:8079/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          type,
          duration,
          caloriesBurned,
          startTime: date,
          notes,
          additionalMetrics: {
            distance,
            averageSpeed,
            maxHeartRate,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create activity');
      setMessage('Activity created successfully!');
      setType('');
      setDuration('');
      setCaloriesBurned('');
      setDate('');
      setNotes('');
      setDistance('');
      setAverageSpeed('');
      setMaxHeartRate('');

      fetchActivities();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch recommendation for activity
  const fetchRecommendationForActivity = async (activityId) => {
    try {
      setLoadingRec(true);
      setSelectedRecommendation(null);

      const res = await fetch(`http://localhost:8079/api/recommendations/activity/${activityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch recommendation");

      setSelectedRecommendation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingRec(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-200 via-indigo-200 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-all"
        >
          ➕ Add Activity
        </button>
      ) : (
        <form
          className="relative flex flex-col gap-4 min-w-[300px] p-8 bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-md border border-white/30 dark:border-gray-700"
          onSubmit={handleSubmit}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 text-center">
            Create New Activity
          </h2>

          <select
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
          >
            <option value="">Select Activity Type</option>
            {ACTIVITY_TYPES.map((act) => (
              <option key={act} value={act}>
                {act.replace("_", " ")}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            placeholder="Duration (minutes)"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
          />

          <input
            type="number"
            min="1"
            placeholder="Calories Burned"
            required
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
          />

          <input
            type="datetime-local"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
          />

          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80 resize-none"
          />

          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="Distance (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
          />

          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="Average Speed (km/h)"
            value={averageSpeed}
            onChange={(e) => setAverageSpeed(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
          />

          <input
            type="number"
            min="0"
            placeholder="Max Heart Rate"
            value={maxHeartRate}
            onChange={(e) => setMaxHeartRate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-gray-800/80"
          />

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:scale-105 hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Activity"}
          </button>

          {message && (
            <div className="text-green-400 text-center text-sm mt-2">{message}</div>
          )}
          {error && (
            <div className="text-red-400 text-center text-sm mt-2">{error}</div>
          )}
        </form>
      )}

      {/* Activities list */}
      <div className="mt-8 w-full max-w-2xl bg-white/70 dark:bg-gray-900/60 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Your Activities
        </h3>
        {loadingActivities ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No activities found.</p>
        ) : (
          <ul className="space-y-4">
            {activities.map((act) => (
              <li
                key={act.id}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {act.type.replace('_', ' ')}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(act.startTime).toLocaleString()}
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Duration: {act.duration} min | Calories: {act.caloriesBurned}
                    </p>
                    {act.notes && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Notes: {act.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => fetchRecommendationForActivity(act.id)}
                    className="ml-4 bg-indigo-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-600 transition"
                  >
                    View Recommendation
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommendation display */}
      {loadingRec && (
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading recommendation...</p>
      )}

      {selectedRecommendation && (
        <div className="mt-6 w-full max-w-2xl bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setSelectedRecommendation(null)}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
          >
            ✕
          </button>

          <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            Recommendation for {selectedRecommendation.activityType}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">
            {selectedRecommendation.recommendation}
          </p>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Improvements:</h4>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {selectedRecommendation.improvements.map((imp, idx) => (
                <li key={idx}>{imp}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Suggestions:</h4>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {selectedRecommendation.suggestions.map((sug, idx) => (
                <li key={idx}>{sug}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Safety Tips:</h4>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {selectedRecommendation.safety.map((safe, idx) => (
                <li key={idx}>{safe}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
