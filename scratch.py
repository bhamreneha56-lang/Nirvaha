import os
import shutil
import re

src_dir = "c:/Users/Dell/Desktop/sih/frontend/src/modules/extracted_university_portal"
dst_dir = "c:/Users/Dell/Desktop/sih/frontend/src/modules/university_new"

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

def transform_file(content):
    content = content.replace('"use client";', '')
    content = content.replace("'use client';", '')
    # Replace next/link with something else or standard a tag for now
    content = content.replace('import Link from "next/link";', 'import { Link } from "react-router-dom";')
    # Replace next/navigation with react-router-dom
    content = content.replace('import { usePathname } from "next/navigation";', 'import { useLocation } from "react-router-dom";\nconst usePathname = () => useLocation().pathname;')
    content = content.replace('import { useRouter } from "next/navigation";', 'import { useNavigate } from "react-router-dom";\nconst useRouter = () => { const navigate = useNavigate(); return { push: navigate }; };')
    
    # Next Image 
    content = content.replace('import Image from "next/image";', '')
    content = re.sub(r'<Image([^>]*?)>', r'<img\1>', content)
    
    # Fix aliases @/lib -> ../../lib etc. We will flatten or just use relative.
    content = content.replace('@/components/university/SuccessRing', './SuccessRing')
    content = content.replace('@/lib/mockData', './mockData')
    content = content.replace('@/lib/utils', './utils')
    content = content.replace('className={`', 'className={`')
    return content

# Copy mockData and utils
shutil.copyfile(f"{src_dir}/lib/mockData.ts", f"{dst_dir}/mockData.ts")
shutil.copyfile(f"{src_dir}/lib/utils.ts", f"{dst_dir}/utils.ts")
shutil.copyfile(f"{src_dir}/components/university/SuccessRing.tsx", f"{dst_dir}/SuccessRing.tsx")

# Transform Sidebar
with open(f"{src_dir}/components/university/Sidebar.tsx", "r", encoding="utf-8") as f:
    sidebar = f.read()
sidebar = transform_file(sidebar)
with open(f"{dst_dir}/Sidebar.tsx", "w", encoding="utf-8") as f:
    f.write(sidebar)

# Transform dashboard page
with open(f"{src_dir}/app/university/dashboard/page.tsx", "r", encoding="utf-8") as f:
    dashboard = f.read()
with open(f"{dst_dir}/DashboardPage.tsx", "w", encoding="utf-8") as f:
    f.write(transform_file(dashboard))

# Transform challenges page
with open(f"{src_dir}/app/university/challenges/page.tsx", "r", encoding="utf-8") as f:
    challenges = f.read()
# Fix the window.location.href to useNavigate
challenges = challenges.replace('window.location.href =', '/* window.location.href = */')
with open(f"{dst_dir}/ChallengesPage.tsx", "w", encoding="utf-8") as f:
    f.write(transform_file(challenges))

# Transform team-builder page
with open(f"{src_dir}/app/university/team-builder/page.tsx", "r", encoding="utf-8") as f:
    team = f.read()
with open(f"{dst_dir}/TeamBuilderPage.tsx", "w", encoding="utf-8") as f:
    f.write(transform_file(team))

# Transform new proposal page
with open(f"{src_dir}/app/university/proposals/new/page.tsx", "r", encoding="utf-8") as f:
    proposal = f.read()
with open(f"{dst_dir}/NewProposalPage.tsx", "w", encoding="utf-8") as f:
    f.write(transform_file(proposal))

# Layout container that stitches them together based on a prop
layout = """
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardPage from './DashboardPage';
import ChallengesPage from './ChallengesPage';
import TeamBuilderPage from './TeamBuilderPage';
import NewProposalPage from './NewProposalPage';

export default function UniversityPortalLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('challenges')) setActiveTab('challenges');
    else if (path.includes('team-builder')) setActiveTab('team-builder');
    else if (path.includes('proposals')) setActiveTab('new-proposal');
    else setActiveTab('dashboard');
  }, [window.location.pathname]);

  let content = <DashboardPage />;
  if (activeTab === 'challenges') content = <ChallengesPage />;
  if (activeTab === 'team-builder') content = <TeamBuilderPage />;
  if (activeTab === 'new-proposal') content = <NewProposalPage />;
  
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        {content}
      </main>
    </div>
  );
}
"""
with open(f"{dst_dir}/UniversityPortalLayout.tsx", "w", encoding="utf-8") as f:
    f.write(layout)

print("Done generating new components")
