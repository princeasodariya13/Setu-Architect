'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'setu_admin_projects';

// These SEED_PROJECTS should match the original ones from the landing page.
// We map them so they fit the unified schema used by the admin and frontend.
const SEED_PROJECTS = [
  { 
    id: 1, 
    name: '3rd Eye Three', 
    category: 'Commercial', // Mapping from 'high-rise'/'Commercial'
    img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=800',
    description: 'Commercial high-rise at Navrangpura, Ahmedabad. Developed by Calica Infrastructure, Architectural design by PlaceKinesis Associates (PKA).'
  },
  { 
    id: 2, 
    name: 'Satyamev Emporio', 
    category: 'Commercial',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
    description: 'Commercial high-rise at Odhav Ring Road, Ahmedabad. Developed by Satyamev Developers, Architectural design by PlaceKinesis Associates (PKA).'
  },
  { 
    id: 3, 
    name: 'Ganesh Glory', 
    category: 'Commercial',
    img: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800',
    description: 'Commercial low-medium rise tower at Gota, Ahmedabad. Developed by Shree Siddhi Group, Architectural design by PlaceKinesis Associates (PKA).'
  },
  { 
    id: 4, 
    name: 'Shalby Hospital', 
    category: 'Hospital',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    description: 'Hospital at Naroda, Ahmedabad. Developed by Shalby Group, Architectural design by KSADPS Architect.'
  },
  { 
    id: 5, 
    name: 'Sports Complex', 
    category: 'Institutional',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    description: 'Institutional building at Ganpat University, Kherva. Architectural design by KSADPS Architect.'
  },
  { 
    id: 6, 
    name: 'Red Flag Apparel Park', 
    category: 'Industrial',
    img: 'https://images.unsplash.com/photo-1593516491195-d2f7df1c3f69?auto=format&fit=crop&q=80&w=800',
    description: 'Industrial park at Narol, Ahmedabad. Developed by Agrasen Infrastructure, Architectural design by Architects Open Ideas.'
  },
  { 
    id: 7, 
    name: 'Kharawala Residence', 
    category: 'Residence', // Mapping from private-residence
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    description: 'Bungalow at Telav, Sanand (Ahmedabad). Architectural design by Prabhakar Bhagwat Architect (PBB).'
  },
  { 
    id: 8, 
    name: 'Miraj Mall', 
    category: 'Commercial', // Mapping from tall-building/Mall
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
    description: 'Tall building (Mall) at Nathdwara, Rajasthan. Developed by Miraj Group, Architectural design by PlaceKinesis Associates (PKA).'
  }
];

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from MongoDB API
  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const json = await res.json();
      
      if (json.success && json.data.length > 0) {
        // Map _id to id for frontend compatibility
        const mappedProjects = json.data.map(p => ({ ...p, id: p._id }));
        setProjects(mappedProjects);
      } else {
        setProjects(SEED_PROJECTS); // Fallback if DB is empty
      }
    } catch (error) {
      console.error("Failed to load projects", error);
      setProjects(SEED_PROJECTS);
    }
  };

  // Initial load
  useEffect(() => {
    loadProjects().then(() => setIsLoaded(true));
    
    // Listen for custom cross-tab changes using BroadcastChannel if needed, 
    // or just rely on a refresh for now since it's a DB.
    // For real-time, we can still use storage event or a polling mechanism,
    // but a manual trigger is best. Let's create a broadcast channel for cross-tab sync.
    const channel = new BroadcastChannel('projects_sync');
    channel.onmessage = () => {
      loadProjects();
    };

    return () => channel.close();
  }, []);

  const addProject = async (projectData) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      const json = await res.json();
      
      if (json.success) {
        const newProject = { ...json.data, id: json.data._id };
        setProjects(prev => [newProject, ...prev]);
        
        // Notify other tabs
        const channel = new BroadcastChannel('projects_sync');
        channel.postMessage('updated');
        channel.close();
      }
    } catch (error) {
      console.error("Failed to add project", error);
    }
  };

  const updateProject = async (id, updatedData) => {
    try {
      // optimistic update
      setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
      
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const json = await res.json();
      
      if (json.success) {
        const updated = { ...json.data, id: json.data._id };
        setProjects(prev => prev.map(p => p.id === id ? updated : p));
      }
      
      // Notify other tabs
      const channel = new BroadcastChannel('projects_sync');
      channel.postMessage('updated');
      channel.close();
    } catch (error) {
      console.error("Failed to update project", error);
    }
  };

  const removeProject = async (id) => {
    try {
      // optimistic update
      setProjects(prev => prev.filter(p => p.id !== id));
      
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      // Notify other tabs
      const channel = new BroadcastChannel('projects_sync');
      channel.postMessage('updated');
      channel.close();
    } catch (error) {
      console.error("Failed to remove project", error);
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, isLoaded, addProject, updateProject, removeProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
