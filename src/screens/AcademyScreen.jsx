import { useState } from 'react';
import { ArrowLeft, GraduationCap, CheckCircle, Clock, BookOpen, ChevronRight, X, Lightbulb } from 'lucide-react';
import { lessons, academyCategories, lessonContent } from '../data/mockData';

export default function AcademyScreen({ onBack }) {
  const [category, setCategory] = useState('All');
  const [activeLesson, setActiveLesson] = useState(null);

  const filteredLessons = category === 'All' ? lessons : lessons.filter(l => l.category === category);
  const completedCount = lessons.filter(l => l.completed).length;
  const progress = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="h-full bg-bg-primary flex flex-col">
      {/* Header */}
      <div className="glass-strong shrink-0 flex items-center" style={{ padding: '12px 16px', gap: 10 }}>
        <button onClick={onBack} className="text-text-secondary hover:text-text-primary transition-colors" style={{ padding: 4 }}>
          <ArrowLeft style={{ width: 18, height: 18 }} />
        </button>
        <div className="flex items-center" style={{ gap: 8 }}>
          <GraduationCap className="text-accent" style={{ width: 18, height: 18 }} />
          <h2 className="text-text-primary font-bold" style={{ fontSize: 16 }}>Academy</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '12px 16px 32px' }}>

        {/* Progress Card */}
        <div className="gradient-hero rounded-2xl border border-border relative overflow-hidden" style={{ padding: '14px 16px', marginBottom: 14 }}>
          <div className="absolute bg-accent/[0.03] rounded-full blur-2xl pointer-events-none" style={{ top: -48, right: -48, width: 96, height: 96 }} />
          <div className="flex items-center justify-between relative" style={{ marginBottom: 12 }}>
            <div>
              <p className="text-text-muted" style={{ fontSize: 11 }}>Your Progress</p>
              <h3 className="text-text-primary font-bold" style={{ fontSize: 20, marginTop: 4 }}>{progress}%</h3>
            </div>
            <div className="flex items-center" style={{ gap: 5 }}>
              <BookOpen className="text-accent" style={{ width: 14, height: 14 }} />
              <span className="text-text-secondary font-medium" style={{ fontSize: 12 }}>{completedCount}/{lessons.length} lessons</span>
            </div>
          </div>
          <div className="rounded-full bg-bg-input overflow-hidden" style={{ height: 6 }}>
            <div
              className="rounded-full gradient-gold transition-all duration-500"
              style={{ height: '100%', width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto custom-scroll" style={{ gap: 8, marginBottom: 14, paddingBottom: 4 }}>
          {academyCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-xl font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-accent/[0.12] text-accent border border-accent/20'
                  : 'bg-bg-secondary text-text-muted border border-border hover:text-text-secondary'
              }`}
              style={{ padding: '6px 12px', fontSize: 11 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lesson Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className="w-full text-left gradient-card rounded-xl border border-border hover:border-border-hover transition-all active:scale-[0.98] flex items-center"
              style={{ padding: '10px 12px', gap: 10 }}
            >
              <div className={`rounded-lg flex items-center justify-center flex-shrink-0 ${lesson.completed ? 'bg-buy-glow' : 'bg-bg-input'}`} style={{ width: 34, height: 34 }}>
                {lesson.completed
                  ? <CheckCircle className="text-buy" style={{ width: 16, height: 16 }} />
                  : <BookOpen className="text-text-muted" style={{ width: 16, height: 16 }} />
                }
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${lesson.completed ? 'text-text-secondary' : 'text-text-primary'}`} style={{ fontSize: 12 }}>{lesson.title}</p>
                <p className="text-text-muted" style={{ fontSize: 10, marginTop: 2, lineHeight: 1.4 }}>{lesson.description}</p>
                <div className="flex items-center" style={{ gap: 8, marginTop: 5 }}>
                  <span className={`rounded-lg font-medium ${
                    lesson.category === 'Beginner' ? 'text-buy bg-buy-glow' :
                    lesson.category === 'Technical' ? 'text-accent bg-accent/[0.08]' :
                    lesson.category === 'Fundamental' ? 'text-[#60A5FA] bg-[#60A5FA]/[0.08]' :
                    'text-[#A78BFA] bg-[#A78BFA]/[0.08]'
                  }`} style={{ fontSize: 10, padding: '2px 8px' }}>{lesson.category}</span>
                  <span className="flex items-center text-text-muted" style={{ gap: 3, fontSize: 10 }}>
                    <Clock style={{ width: 10, height: 10 }} /> {lesson.duration}
                  </span>
                </div>
              </div>
              <ChevronRight className="text-text-muted flex-shrink-0" style={{ width: 16, height: 16 }} />
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Detail Overlay */}
      {activeLesson && (
        <div className="absolute inset-0 bg-bg-primary z-50 flex flex-col animate-slideUp">
          {/* Overlay Header */}
          <div className="glass-strong shrink-0 flex items-center justify-between" style={{ padding: '12px 16px' }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <BookOpen className="text-accent" style={{ width: 18, height: 18 }} />
              <h3 className="text-text-primary font-bold" style={{ fontSize: 16 }}>Lesson</h3>
            </div>
            <button
              onClick={() => setActiveLesson(null)}
              className="rounded-lg bg-bg-elevated border border-border flex items-center justify-center hover:bg-bg-card transition-colors"
              style={{ width: 32, height: 32 }}
            >
              <X className="text-text-secondary" style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Overlay Content */}
          <div className="flex-1 overflow-y-auto custom-scroll" style={{ padding: '16px 16px 32px' }}>
            {/* Title card */}
            <div className="gradient-hero rounded-2xl border border-border" style={{ padding: '16px 16px', marginBottom: 16 }}>
              <div className="flex items-center" style={{ gap: 8, marginBottom: 10 }}>
                <span className={`rounded-lg font-medium ${
                  activeLesson.category === 'Beginner' ? 'text-buy bg-buy-glow' :
                  activeLesson.category === 'Technical' ? 'text-accent bg-accent/[0.08]' :
                  activeLesson.category === 'Fundamental' ? 'text-[#60A5FA] bg-[#60A5FA]/[0.08]' :
                  'text-[#A78BFA] bg-[#A78BFA]/[0.08]'
                }`} style={{ fontSize: 10, padding: '3px 10px' }}>{activeLesson.category}</span>
                <span className="flex items-center text-text-muted" style={{ gap: 3, fontSize: 10 }}>
                  <Clock style={{ width: 10, height: 10 }} /> {activeLesson.duration}
                </span>
                {activeLesson.completed && (
                  <div className="flex items-center text-buy" style={{ gap: 3, marginLeft: 'auto' }}>
                    <CheckCircle style={{ width: 12, height: 12 }} />
                    <span className="font-semibold" style={{ fontSize: 10 }}>Completed</span>
                  </div>
                )}
              </div>
              <h2 className="text-text-primary font-bold" style={{ fontSize: 18, lineHeight: 1.4 }}>
                {activeLesson.title}
              </h2>
            </div>

            {/* Content sections */}
            {lessonContent[activeLesson.id] && (
              <>
                <div style={{ marginBottom: 20 }}>
                  {lessonContent[activeLesson.id].sections.map((text, i) => (
                    <p key={i} className="text-text-secondary" style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
                      {text}
                    </p>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className="gradient-card rounded-xl border border-border" style={{ padding: '14px 16px', marginBottom: 20 }}>
                  <div className="flex items-center" style={{ gap: 6, marginBottom: 12 }}>
                    <Lightbulb className="text-accent" style={{ width: 15, height: 15 }} />
                    <span className="text-text-primary font-bold" style={{ fontSize: 13 }}>Key Takeaways</span>
                  </div>
                  {lessonContent[activeLesson.id].keyTakeaways.map((item, i) => (
                    <div key={i} className="flex items-start" style={{ gap: 8, marginBottom: i < lessonContent[activeLesson.id].keyTakeaways.length - 1 ? 8 : 0 }}>
                      <CheckCircle className="text-buy flex-shrink-0" style={{ width: 14, height: 14, marginTop: 2 }} />
                      <p className="text-text-secondary" style={{ fontSize: 12, lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Mark Complete / Continue button */}
            <button
              className="w-full btn-primary rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_24px_rgba(255,216,102,0.2)]"
              style={{ padding: '14px 0' }}
              onClick={() => setActiveLesson(null)}
            >
              {activeLesson.completed ? 'Review Again' : 'Mark as Complete'}
              <CheckCircle style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
