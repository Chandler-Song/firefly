import React from 'react';
import { User, Clock, MessageSquare, Image as ImageIcon, Video, Mic, Quote } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GuestInfo {
  name: string;
  title: string;
  organization: string;
  avatar: string;
  description: string;
  achievements: string[];
}

interface InterviewRecord {
  timestamp: string;
  question: string;
  answer: string;
}

interface MultimediaItem {
  type: 'image' | 'video' | 'audio';
  url: string;
  caption?: string;
}

interface InterviewProps {
  guest: GuestInfo;
  records: InterviewRecord[];
  multimedia?: MultimediaItem[];
}

const Interview: React.FC<InterviewProps> = ({ guest, records, multimedia }) => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-8">
      {/* Guest Introduction Section */}
      <section className="bg-card rounded-xl border p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-all shadow-md">
              <img 
                src={guest.avatar} 
                alt={guest.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=' + guest.name;
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
              <User size={20} />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{guest.name}</h2>
              <p className="text-lg text-primary font-medium mt-1">{guest.title} @ {guest.organization}</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {guest.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(guest.achievements) && guest.achievements.map((achievement, index) => (
                <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Multimedia Gallery */}
      {multimedia && multimedia.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b pb-2">
            <ImageIcon className="text-primary" size={24} />
            <h3 className="text-2xl font-bold">现场纪实</h3>
          </div>
          <div className={cn(
            "grid gap-6",
            multimedia.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : "grid-cols-1 md:grid-cols-2"
          )}>
            {Array.isArray(multimedia) && multimedia.map((item, index) => (
              <div key={index} className="rounded-xl overflow-hidden border bg-card group shadow-sm hover:shadow-md transition-shadow">
                {item.type === 'image' && (
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img 
                      src={item.url} 
                      alt={item.caption} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
                {item.type === 'video' && (
                  <video controls className="w-full aspect-video">
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {item.type === 'audio' && (
                  <div className="p-6 flex flex-col gap-4 items-center justify-center bg-card h-full">
                    <Mic size={40} className="text-primary animate-pulse" />
                    <audio controls className="w-full">
                      <source src={item.url} type="audio/mpeg" />
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                )}
                {item.caption && (
                  <div className="p-4 text-center bg-card">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interview Records Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 border-b pb-2">
          <MessageSquare className="text-primary" size={24} />
          <h3 className="text-2xl font-bold">访谈对话</h3>
        </div>
        
        <div className="space-y-10">
          {Array.isArray(records) && records.map((record, index) => (
            <div key={index} className="group relative pl-8 border-l-2 border-muted hover:border-primary transition-colors">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted group-hover:bg-primary transition-colors border-4 border-background" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Clock size={14} />
                  <span>{record.timestamp}</span>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex gap-3">
                      <span className="text-primary font-bold shrink-0">Q:</span>
                      <p className="font-semibold text-lg leading-snug">{record.question}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 px-2 items-start">
                    <Quote className="text-primary/20 shrink-0 mt-1 rotate-180" size={32} />
                    <div className="relative">
                      <p className="text-foreground leading-relaxed text-lg font-medium">
                        {record.answer.replace(/^["']|["']$/g, '')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Interview;
