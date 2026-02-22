import React, { useState, useEffect } from 'react';
import GroupCard from './components/GroupCard';
import GroupModal from './components/GroupModal';
import TextModal from './components/TextModal';
import { Group } from './types';

const App: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [manifesto, setManifesto] = useState({ title: '', motto: '', body: '' });
  const [legal, setLegal] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  const categories: Group['category'][] = ['Gate Network', 'Creators', 'Experiences'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parser = new DOMParser();

        // Helper to get text content safely
        const safeText = (node: Element, tag: string) => {
          const el = node.getElementsByTagName(tag)[0];
          return el ? el.textContent || '' : '';
        };

        // 1. Fetch & Parse Groups
        const groupsRes = await fetch('./groups.xml');
        const groupsText = await groupsRes.text();
        const groupsDoc = parser.parseFromString(groupsText, "text/xml");
        
        // Check for parsing errors
        if (groupsDoc.getElementsByTagName('parsererror').length > 0) {
          console.error("XML Parsing Error in groups.xml. Check for unescaped characters like '&'.");
        }

        const groupNodes = Array.from(groupsDoc.getElementsByTagName('group'));
        
        const parsedGroups: Group[] = groupNodes.map(node => ({
          id: node.getAttribute('id') || Math.random().toString(),
          category: (node.getAttribute('category') || 'Gate Network') as Group['category'],
          name: safeText(node, 'name'),
          shortDescription: safeText(node, 'shortDescription'),
          longDescription: safeText(node, 'longDescription'),
          imageUrl: safeText(node, 'imageUrl'),
          logoUrl: safeText(node, 'logoUrl'),
          websiteUrl: safeText(node, 'websiteUrl'),
          tags: Array.from(node.getElementsByTagName('tag')).map(t => t.textContent || '')
        }));

        // 2. Fetch & Parse Manifesto
        const manifestoRes = await fetch('./manifesto.xml');
        const manifestoText = await manifestoRes.text();
        const manifestoDoc = parser.parseFromString(manifestoText, "text/xml");
        setManifesto({
          title: safeText(manifestoDoc.documentElement, 'title'),
          motto: safeText(manifestoDoc.documentElement, 'motto'),
          body: safeText(manifestoDoc.documentElement, 'body'),
        });

        // 3. Fetch & Parse Legal
        const legalRes = await fetch('./legal.xml');
        const legalText = await legalRes.text();
        const legalDoc = parser.parseFromString(legalText, "text/xml");
        setLegal({
          title: safeText(legalDoc.documentElement, 'title'),
          body: safeText(legalDoc.documentElement, 'body'),
        });

        setGroups(parsedGroups);
      } catch (error) {
        console.error("Error loading XML data:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        <p className="text-blue-500 font-black tracking-[0.5em] text-xs animate-pulse uppercase">INITIATING_GATE_PROTOCOL</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#09090b] selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Image Container for Header */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 md:opacity-40 scale-105 blur-[2px]" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/10 via-[#09090b]/80 to-[#09090b]" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-full px-6 md:px-16 lg:px-32 py-12 md:py-16 lg:py-24 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
        
        <header className="mb-20 lg:mb-40 flex flex-col items-start pt-6 md:pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mb-8 md:mb-12 w-full">
            <div className="inline-flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.1)] w-fit">
              <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]"></span>
              </span>
              <span className="text-[10px] md:text-[12px] font-black text-blue-400 tracking-[0.4em] md:tracking-[0.6em] uppercase">GATE_PROTOCOL_ACTIVE</span>
            </div>

            <a 
              href="https://discord.gg/d4fkbpWsGT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-2 md:px-6 md:py-2.5 bg-indigo-600/20 hover:bg-indigo-600 transition-all duration-300 rounded-full border border-indigo-500/30 hover:border-indigo-400 w-fit backdrop-blur-md shadow-lg"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .077.01 10.255 10.255 0 0 0 .372.292.077.077 0 0 1-.008.128 12.51 12.51 0 0 1-1.872.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.023.032.063.046.084.028a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="text-[10px] md:text-[12px] font-black text-indigo-100 uppercase tracking-widest">Join our Discord</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 lg:gap-16 mt-8">
            {/* Logo square zone */}
            <div className="w-28 h-28 md:w-44 md:h-44 lg:w-52 lg:h-52 flex items-center justify-center shrink-0">
              <img
                src="/gate-builders-logo.png"
                alt="Gate Builders Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              />
            </div>

            {/* Header Text */}
            <h1 className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-black text-white tracking-tighter leading-[0.8] drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] break-words">
              GATE<br />BUILDERS<span className="text-blue-600">.</span>
            </h1>
          </div>

          <p className="text-zinc-400 text-lg md:text-3xl lg:text-4xl max-w-5xl font-light leading-tight drop-shadow-lg mt-12 md:mt-16">
            The nexus for Second Life's Stargate collective. <br className="hidden md:block" />
            <span className="text-white mt-3 md:mt-4 block font-medium opacity-90">Building a universe into the virtual world since 2008. Joining forces since 2026.</span>
          </p>
        </header>

        {/* Categorized Sections */}
        <div className="space-y-32 md:space-y-48 pb-32 md:pb-48">
          {categories.map(category => {
            const filteredGroups = groups.filter(g => g.category === category);
            if (filteredGroups.length === 0) return null;

            return (
              <section key={category} className="flex flex-col gap-12">
                <div className="flex items-center gap-6">
                  <div className="w-1.5 h-12 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                    {category}
                  </h2>
                  <div className="flex-grow h-px bg-zinc-800/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                  {filteredGroups.map((group) => (
                    <GroupCard 
                      key={group.id} 
                      group={group} 
                      onClick={(g) => setSelectedGroup(g)} 
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer info */}
        <footer className="mt-auto pt-12 md:pt-16 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs md:text-sm gap-8 pb-16 md:pb-20">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <div className="text-3xl md:text-4xl font-black text-zinc-800 tracking-tighter select-none">GBH</div>
            <div className="hidden md:block w-px h-10 bg-zinc-800/50"></div>
            <div className="font-bold tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] uppercase opacity-40">EST. 2008 // ARCHIVING THE VIRTUAL FRONTIER</div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-black uppercase tracking-[0.3em] text-[9px] md:text-[11px]">
            <button onClick={() => setIsManifestoOpen(true)} className="hover:text-blue-500 transition-all hover:-translate-y-1">Manifesto</button>
            <button onClick={() => setIsLegalOpen(true)} className="hover:text-blue-500 transition-all hover:-translate-y-1">Legal Information</button>
            <a href="https://discord.gg/d4fkbpWsGT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-200 hover:text-blue-400 transition-all hover:-translate-y-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .077.01 10.255 10.255 0 0 0 .372.292.077.077 0 0 1-.008.128 12.51 12.51 0 0 1-1.872.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.023.032.063.046.084.028a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </a>
          </div>
        </footer>
      </main>

      {/* Group Detail Modal */}
      <GroupModal 
        group={selectedGroup} 
        onClose={() => setSelectedGroup(null)} 
      />

      {/* Manifesto Modal */}
      <TextModal 
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
        title={manifesto.title}
        subtitle={manifesto.motto}
        content={manifesto.body}
      />

      {/* Legal Info Modal */}
      <TextModal 
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        title={legal.title}
        content={legal.body}
      />
    </div>
  );
};

export default App;