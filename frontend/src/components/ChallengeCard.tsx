import React from 'react';
import { Target } from 'lucide-react';

interface ChallengeDto {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  category: string;
  durationDays: number;
}

interface UserChallengeDto {
  id: string;
  challenge: ChallengeDto;
  startDate: string;
  currentStreak: number;
  isCompleted: boolean;
}

interface Props {
  challenge: ChallengeDto;
  activeEnrollment?: UserChallengeDto;
  onEnroll: (challengeId: string) => void;
}

export const ChallengeCard: React.FC<Props> = ({ challenge, activeEnrollment, onEnroll }) => {
  return (
    <div className="glassmorphism p-6 rounded-2xl flex flex-col gap-4 border-2 border-transparent hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Target className="text-accent" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{challenge.title}</h3>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed flex-grow">
        {challenge.description}
      </p>
      
      <div className="mt-2 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="text-sm text-slate-500 font-medium">
          {challenge.durationDays} Days • {challenge.category}
        </div>
        
        {activeEnrollment ? (
          <div className="bg-accent/10 text-accent font-semibold px-4 py-2 rounded-lg text-sm border border-accent/20">
            {activeEnrollment.isCompleted ? 'Completed!' : `Day ${activeEnrollment.currentStreak + 1} of ${challenge.durationDays}`}
          </div>
        ) : (
          <button 
            onClick={() => onEnroll(challenge.id)}
            className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer active:scale-95"
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};
