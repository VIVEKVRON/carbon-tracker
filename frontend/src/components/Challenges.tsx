import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import { ChallengeCard } from './ChallengeCard';

export const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [myActive, setMyActive] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [challengesRes, activeRes] = await Promise.allSettled([
          apiFetch('/challenges'),
          apiFetch('/challenges/my-active')
        ]);
        
        if (challengesRes.status === 'fulfilled') {
          setChallenges(challengesRes.value);
        }
        if (activeRes.status === 'fulfilled') {
          setMyActive(activeRes.value);
        }
      } catch (err) {
        console.error('Failed to fetch challenges', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEnroll = async (challengeId: string) => {
    // Optimistic UI Update
    const challengeToEnroll = challenges.find(c => c.id === challengeId);
    if (!challengeToEnroll) return;
    
    const optimisticEnrollment = {
      id: 'temp-' + Date.now(),
      challenge: challengeToEnroll,
      startDate: new Date().toISOString(),
      currentStreak: 0,
      isCompleted: false
    };
    
    setMyActive(prev => [...prev, optimisticEnrollment]);

    try {
      const realEnrollment = await apiFetch(`/challenges/${challengeId}/enroll`, {
        method: 'POST'
      });
      // Replace optimistic with real
      setMyActive(prev => prev.map(e => e.id === optimisticEnrollment.id ? realEnrollment : e));
    } catch (err) {
      console.error('Failed to enroll', err);
      // Revert optimistic
      setMyActive(prev => prev.filter(e => e.id !== optimisticEnrollment.id));
      alert('Failed to enroll in challenge.');
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-500 animate-pulse">Loading challenges...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Eco-Challenges</h2>
        <p className="text-slate-500 mt-2">Push your limits and build sustainable habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(challenge => {
          const active = myActive.find(a => a.challenge.id === challenge.id);
          return (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge} 
              activeEnrollment={active} 
              onEnroll={handleEnroll} 
            />
          );
        })}
      </div>
    </div>
  );
};
